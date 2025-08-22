import { Assets as NavigationAssets } from "@react-navigation/elements";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { useColorScheme } from "react-native";
import { Navigation } from "./navigation";
import { QueryProvider } from "./shared/query/client";
import { Toaster } from "sonner-native";
import { UnistylesRuntime } from "react-native-unistyles";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { AuthProvider } from "@/features/auth";

Asset.loadAsync([
  ...NavigationAssets,
  require("./assets/newspaper.png"),
  require("./assets/bell.png"),
]);

SplashScreen.preventAutoHideAsync();

export function App() {
  const scheme = useColorScheme();

  // Configure Unistyles themes early
  if (scheme) {
    UnistylesRuntime.setTheme(scheme);
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryProvider>
          <AuthProvider>
            <BottomSheetModalProvider>
              <Navigation
                linking={{
                  enabled: "auto",
                  prefixes: [
                    // Change the scheme to match your app's scheme defined in app.json
                    "spltup://",
                  ],
                }}
                onReady={() => {
                  SplashScreen.hideAsync();
                }}
              />
              <Toaster
                position="bottom-center"
                toastOptions={{
                  style: {
                    borderRadius: 12,
                    paddingVertical: 12,
                    paddingHorizontal: 12,
                  },
                }}
              />
            </BottomSheetModalProvider>
          </AuthProvider>
        </QueryProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
