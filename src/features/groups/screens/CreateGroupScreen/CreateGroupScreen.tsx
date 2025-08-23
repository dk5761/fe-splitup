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
import { CreateGroupPayload } from "../../types";
import { UploadCloud } from "lucide-react-native";
import { useTabBar } from "@/shared/context/TabBarContext";

const createGroupSchema = z.object({
  name: z.string().min(1, "Group name is required"),
  members: z.array(z.string()).min(1, "At least one member is required"),
  image: z.string().optional(),
});

type CreateGroupForm = z.infer<typeof createGroupSchema>;

const CreateGroupScreen = () => {
  const styles = stylesheet;
  const navigation = useNavigation();
  const { mutate: createGroup, isPending } = useCreateGroup();
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

  const imageUri = watch("image");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setValue("image", result.assets[0].uri);
    }
  };

  const onSubmit = (data: CreateGroupForm) => {
    const membersPayload = data.members.map((id) => ({
      user_id: id,
      role: "member",
    }));

    const payload: CreateGroupPayload = {
      name: data.name,
      members: JSON.stringify(membersPayload),
    };

    if (data.image) {
      const uriParts = data.image.split(".");
      const fileType = uriParts[uriParts.length - 1];
      payload.image = {
        uri: data.image,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      };
    }

    createGroup(payload, {
      onSuccess: () => {
        navigation.goBack();
      },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.form}>
          <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.imagePreview} />
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
          loading={isPending}
        />
      </View>
    </View>
  );
};

export default CreateGroupScreen;
