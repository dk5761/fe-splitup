import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Group } from "../../types";

interface GroupListItemProps {
  item: Group;
}

export const GroupListItem = ({ item }: GroupListItemProps) => {
  return (
    <Pressable style={styles.container}>
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {item.name} {item.tag}
        </Text>
        <View style={styles.membersContainer}>
          {item.members.slice(0, 5).map((member) => (
            <Image
              key={member.id}
              source={{ uri: member.avatar_url }}
              style={styles.avatar}
            />
          ))}
        </View>
      </View>
      <Text>{">"}</Text>
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
