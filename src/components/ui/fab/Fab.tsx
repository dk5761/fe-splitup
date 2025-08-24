import React from "react";
import {
  StyleProp,
  TouchableOpacity,
  TextStyle,
  Text,
  ViewStyle,
} from "react-native";
import { Plus } from "lucide-react-native";
import { useUnistyles } from "react-native-unistyles";
import { stylesheet } from "./Fab.styles";

interface FabProps {
  onPress: () => void;
  icon?: React.ReactNode;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
}

export const Fab: React.FC<FabProps> = ({ onPress, icon, text, textStyle }) => {
  const { theme } = useUnistyles();
  const styles = stylesheet;

  styles.useVariants({
    text: text ? true : false,
  });

  return (
    <TouchableOpacity
      style={styles.fab as StyleProp<ViewStyle>}
      onPress={onPress}
    >
      {icon ? icon : <Plus size={24} color={theme.colors.primaryOn} />}
      {text && <Text style={textStyle}>{text}</Text>}
    </TouchableOpacity>
  );
};
