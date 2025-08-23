import { View, StyleSheet } from "react-native";
import { Button } from "@/components/ui/button";
import { Ionicons } from "@expo/vector-icons";
import { useUnistyles } from "react-native-unistyles";

export const CreateGroupButton = ({ onPress }: { onPress: () => void }) => {
  const { theme } = useUnistyles();
  return (
    <View style={styles.container}>
      <Button variant="primary" style={styles.button} onPress={onPress}>
        <Ionicons name="add" size={30} color={theme.colors.primaryOn} />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 20,
    borderRadius: 9999,
    overflow: "hidden",
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  },
});
