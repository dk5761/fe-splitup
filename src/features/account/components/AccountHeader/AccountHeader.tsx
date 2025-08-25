import React from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { AuthUser } from "@/features/auth/types";
import { styles } from "./AccountHeader.styles";

interface AccountHeaderProps {
  user: AuthUser | null;
}

export const AccountHeader: React.FC<AccountHeaderProps> = ({ user }) => {
  const { theme } = useUnistyles();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user?.profile_image_url ?? "" }}
        style={styles.avatar}
      />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{user?.name || ""}</Text>
        <Text style={styles.userEmail}>{user?.email || ""}</Text>
      </View>
    </View>
  );
};

//   container: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: theme.spacing.lg,
//     paddingHorizontal: theme.spacing.md,
//     backgroundColor: theme.colors.background,
//   },
//   avatar: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     marginRight: theme.spacing.md,
//   },
//   userInfo: {
//     flex: 1,
//   },
//   userName: {
//     fontSize: theme.typography.sizes.h3,
//     fontWeight: "bold",
//     color: theme.colors.text,
//   },
//   userEmail: {
//     fontSize: theme.typography.sizes.body,
//     color: theme.colors.textSecondary,
//   },
// }));
