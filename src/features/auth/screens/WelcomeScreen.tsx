import { Button } from "@/components";
import React from "react";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native-unistyles";

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's Get Started!</Text>
      <Text style={styles.subtitle}>
        With Splitify, expenses split bills is easier than ever before.
      </Text>

      <View style={styles.buttonContainer}>
        <Button title="Sign up" onPress={() => console.log("Sign Up")} />
        <Button title="Log In" onPress={() => console.log("Log In")} />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Privacy Policy</Text>
        <Text style={styles.footerText}>Terms of Service</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: "center",
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    gap: 10,
    width: "100%",
  },
  signUpButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  signUpButtonText: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: "bold",
  },
  logInButton: {
    backgroundColor: "transparent",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  logInButtonText: {
    color: theme.colors.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 40,
    flexDirection: "row",
  },
  footerText: {
    fontSize: 14,
    color: theme.colors.text,
    marginHorizontal: 10,
  },
}));

export default WelcomeScreen;
