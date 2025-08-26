import { View, Text, Image, Pressable } from "react-native";
import { Group } from "../types";
import { ChevronRight, Icon } from "lucide-react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

interface GroupListItemProps {
  item: Group;
  onPress: () => void;
}

export const GroupListItem = ({ item, onPress }: GroupListItemProps) => {
  const { theme } = useUnistyles();
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image
        source={{ uri: item.image_url || "https://via.placeholder.com/60" }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <ChevronRight size={24} color={theme.colors.text} />
    </Pressable>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 10,
    backgroundColor: theme.colors.surface,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: theme.colors.text,
  },
  membersContainer: {
    flexDirection: "row",
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginLeft: -8,
    borderWidth: 1,
    borderColor: "white",
  },
}));
