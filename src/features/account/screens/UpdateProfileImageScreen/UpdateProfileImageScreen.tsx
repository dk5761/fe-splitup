import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { useQuery } from "@tanstack/react-query";
import { meQuery } from "@/features/account/api";
import { appToast } from "@/components/toast";
import { styles } from "./UpdateProfileImageScreen.styles";
import * as ImagePicker from "expo-image-picker";
import { UploadCloud } from "lucide-react-native";
import { Button } from "@/components/ui/button";
import { useImageUpload } from "@/shared/hooks/useImageUpload";
import { useUpdateProfileMutation } from "@/features/account/api/mutationFn";
import { accountEndpoints } from "@/features/account/api";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AccountStackParamList } from "@/navigation/types";

type UpdateProfileImageScreenNavigationProp = NativeStackNavigationProp<
  AccountStackParamList,
  "UpdateProfileImage"
>;

export const UpdateProfileImageScreen = () => {
  const { theme } = useUnistyles();
  const { data: user, isLoading, isError } = useQuery(meQuery());
  const [selectedImage, setSelectedImage] = useState<{
    uri: string;
    type: string;
    name: string;
  } | null>(null);
  const { mutateAsync: uploadImage, isPending: isUploadingImage } =
    useImageUpload();
  const { mutate: updateProfile, isPending: isUpdatingProfile } =
    useUpdateProfileMutation();
  const navigation = useNavigation<UpdateProfileImageScreenNavigationProp>();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      const uriParts = asset.uri.split(".");
      const fileType = uriParts.pop();
      const fileName = uriParts.join(".").split("/").pop();

      setSelectedImage({
        uri: asset.uri,
        type: `image/${fileType}`,
        name: `${fileName}.${fileType}`,
      });
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (isError || !user) {
    appToast.error("Failed to load user data");
    return (
      <View style={styles.errorContainer}>
        <Text style={{ color: theme.colors.error }}>
          Error: Could not load user data.
        </Text>
      </View>
    );
  }

  const imageSource =
    selectedImage?.uri ||
    user?.profile_image_url ||
    "https://via.placeholder.com/150";

  const handleSaveChanges = async () => {
    if (!selectedImage) {
      appToast.warning("Please select an image first.");
      return;
    }

    let image_key: string | undefined;

    try {
      image_key = await uploadImage({
        file: selectedImage,
        uploadUrlEndpoint: accountEndpoints.generateProfileImageUploadUrl,
      });
    } catch (e: any) {
      appToast.error("Image upload failed", {
        description: e?.message ?? "Unknown error during upload",
      });
      return;
    }

    if (image_key) {
      updateProfile(
        { profile_image_key: image_key },
        {
          onSuccess: () => {
            navigation.goBack();
          },
          onError: (e: any) => {
            appToast.error("Profile update failed", {
              description: e?.message ?? "Unknown error during profile update",
            });
          },
        }
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageSource }} style={styles.profileImage} />

      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {selectedImage?.uri || user?.profile_image_url ? (
          <Text style={styles.imagePickerText}>Change Profile Image</Text>
        ) : (
          <>
            <UploadCloud size={40} color={theme.colors.textSecondary} />
            <Text style={styles.imagePickerText}>Upload Profile Image</Text>
          </>
        )}
      </TouchableOpacity>

      {(selectedImage || user?.profile_image_url) && (
        <View style={styles.saveButtonWrapper}>
          <Button
            title="Save Changes"
            onPress={handleSaveChanges}
            loading={isUploadingImage || isUpdatingProfile}
            disabled={isUploadingImage || isUpdatingProfile}
          />
        </View>
      )}
    </View>
  );
};
