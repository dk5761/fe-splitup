import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import * as ImagePicker from "expo-image-picker";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { stylesheet } from "./CreateGroupScreen.styles";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AppDropdown,
  DropdownOption,
} from "@/components/ui/appdropdown/AppDropdown";
import { getFriendsQuery } from "@/features/friends/api/query";
import { useCreateGroup } from "../../api";
import { useImageUpload } from "@/shared/hooks/useImageUpload";
import { groupsEndpoints } from "../../api/endpoints";
import { UploadCloud } from "lucide-react-native";
import { useTabBar } from "@/shared/context/TabBarContext";
import { GroupMember } from "../../types";

const createGroupSchema = z.object({
  name: z.string().min(1, "Group name is required"),
  members: z.array(z.string()).min(1, "At least one member is required"),
  image: z
    .object({
      uri: z.string(),
      type: z.string(),
      name: z.string(),
    })
    .optional(),
});

type CreateGroupForm = z.infer<typeof createGroupSchema>;

const CreateGroupScreen = () => {
  const styles = stylesheet;
  const navigation = useNavigation();
  const { mutate: createGroup, isPending: isCreatingGroup } = useCreateGroup();
  const { mutateAsync: uploadImage, isPending: isUploadingImage } =
    useImageUpload();
  const { showTabBar, hideTabBar } = useTabBar();

  useFocusEffect(
    React.useCallback(() => {
      hideTabBar();
      return () => showTabBar();
    }, [hideTabBar, showTabBar])
  );

  const { data: friendsData } = useInfiniteQuery(getFriendsQuery());
  const friends = friendsData?.pages.flatMap((page) => page.data) ?? [];

  const friendOptions: DropdownOption[] = friends.map((friend) => ({
    label: friend.name,
    value: friend.id,
  }));

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateGroupForm>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const image = watch("image");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      const uriParts = asset.uri.split(".");
      const fileType = uriParts.pop();
      const fileName = uriParts.join(".").split("/").pop();

      setValue("image", {
        uri: asset.uri,
        type: `image/${fileType}`,
        name: `${fileName}.${fileType}`,
      });
    }
  };

  const onSubmit = async (data: CreateGroupForm) => {
    const membersPayload: GroupMember[] = data.members.map((id) => ({
      user_id: id,
      role: "member",
    }));

    let image_key: string | undefined;

    if (data.image) {
      image_key = await uploadImage({
        file: data.image,
        uploadUrlEndpoint: groupsEndpoints.generateImageUploadUrl,
      });
    }

    createGroup(
      {
        name: data.name,
        members: membersPayload,
        image_key,
      },
      {
        onSuccess: () => {
          navigation.goBack();
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.form}>
          <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
            {image?.uri ? (
              <Image source={{ uri: image.uri }} style={styles.imagePreview} />
            ) : (
              <>
                <UploadCloud size={40} color="gray" />
                <Text style={styles.imagePickerText}>Upload Cover Image</Text>
              </>
            )}
          </TouchableOpacity>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Group Name"
                placeholder="Enter group name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={!!errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="members"
            render={({ field: { onChange, value } }) => (
              <AppDropdown
                options={friendOptions}
                value={value}
                onChange={onChange}
                multiselect
              >
                <AppDropdown.Trigger placeholder="Select members">
                  {() => <Text>{value.length} members selected</Text>}
                </AppDropdown.Trigger>
                <AppDropdown.Content>
                  {({ item, isSelected, handleSelect }) => (
                    <TouchableOpacity
                      onPress={() => handleSelect(item)}
                      style={{
                        padding: 10,
                        backgroundColor: isSelected ? "lightblue" : "white",
                      }}
                    >
                      <Text>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                </AppDropdown.Content>
              </AppDropdown>
            )}
          />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button
          title="Create Group"
          onPress={handleSubmit(onSubmit)}
          loading={isCreatingGroup || isUploadingImage}
        />
      </View>
    </View>
  );
};

export default CreateGroupScreen;