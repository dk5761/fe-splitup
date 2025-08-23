import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Group } from "../types";
import { ChevronRight, Icon } from "lucide-react-native";

interface GroupListItemProps {
  item: Group;
  onPress: () => void;
}

export const GroupListItem = ({ item, onPress }: GroupListItemProps) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image
        source={{ uri: item.image_url || "https://via.placeholder.com/60" }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <ChevronRight size={24} color="#000" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 10,
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
});
