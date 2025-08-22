import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import { stylesheet as styles } from "./Header.styles";

interface HeaderProps {
  title: string;
  canGoBack?: boolean;
  textStyle?: StyleProp<TextStyle>;
}

const Header: React.FC<HeaderProps> = ({ title, canGoBack, textStyle }) => {
  const navigation = useNavigation();

  const canGoBackValue = canGoBack ?? navigation.canGoBack();

  return (
    <View style={styles.container}>
      {canGoBackValue && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color={styles.title.color} />
        </TouchableOpacity>
      )}
      <Text style={[styles.title, textStyle]}>{title}</Text>
      <View style={styles.backButton} />
    </View>
  );
};

export default Header;
