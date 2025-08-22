import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { useUnistyles } from "react-native-unistyles";
import { stylesheet as styles } from "./Header.styles";
import { MainStackParamList } from "@/navigation/types";
import { ArrowLeft } from "lucide-react-native";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<MainStackParamList>>();

  const canGoBack = navigation.canGoBack();

  return (
    <View style={styles.container}>
      {canGoBack ? (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color={styles.title.color} />
        </TouchableOpacity>
      ) : (
        <View style={styles.backButton} />
      )}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.backButton} />
    </View>
  );
};

export default Header;
