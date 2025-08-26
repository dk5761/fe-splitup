import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Toaster, toast } from "sonner-native";

import { httpClient } from "@/shared/api/client";
import { friendsEndpoints } from "./endpoints";
import { friendsQueryKeys } from "./queryKeyFactory";
import { PaginatedFriends } from "../types/friends.types";
import { appToast } from "@/components";

export const useRemoveFriend = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (friendId: string) => {
      return httpClient.delete(friendsEndpoints.removeFriend(friendId));
    },
    // onMutate: async (friendId) => {
    //   await queryClient.cancelQueries({ queryKey: friendsQueryKeys.lists() });

    //   const previousFriends = queryClient.getQueryData<PaginatedFriends>(
    //     friendsQueryKeys.lists()
    //   );

    //   queryClient.setQueryData(
    //     friendsQueryKeys.lists(),
    //     (old: PaginatedFriends | undefined) => {
    //       if (!old) {
    //         return undefined;
    //       }

    //       const newData = old.data.filter((friend) => friend.id !== friendId);

    //       return {
    //         ...old,
    //         data: newData,
    //       };
    //     }
    //   );

    //   return { previousFriends };
    // },
    onError: (err, friendId, context) => {
      // if (context?.previousFriends) {
      //   queryClient.setQueryData(
      //     friendsQueryKeys.lists(),
      //     context.previousFriends
      //   );
      // }
      appToast.error("Failed to remove friend.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: friendsQueryKeys.lists() });
    },
    onSuccess: () => {
      appToast.success("Friend removed successfully.");
    },
  });
};

export const useSendFriendRequest = () => {
  return useMutation({
    mutationFn: (addresseeId: string) =>
      httpClient.post(friendsEndpoints.sendFriendRequest, { addresseeId }),
    onSuccess: () => {
      appToast.success("Friend request sent.");
    },
    onError: () => {
      appToast.error("Failed to send friend request.");
    },
  });
};
