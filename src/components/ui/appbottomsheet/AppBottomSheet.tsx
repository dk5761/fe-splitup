// src/components/AppBottomSheet/AppBottomSheet.tsx

import React, { useMemo, forwardRef } from "react";
import { View, Text } from "react-native";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { styles } from "./AppBottomSheet.styles";

export type AppBottomSheetRef = BottomSheetModal;

// FIX 1: The type for the prop should match what the styles expect.
// 'default' is not a real variant name, it's just the absence of other variants.
type HeaderVariant = "destructive" | undefined;

interface AppBottomSheetProps {
  children: React.ReactNode;
  headerTitleVariant?: HeaderVariant; // Use the corrected type
  onDismiss?: () => void;
  snapPoints?: string[];
  enableDynamicSizing?: boolean;
}

export const AppBottomSheet = forwardRef<
  AppBottomSheetRef,
  AppBottomSheetProps
>(
  (
    {
      children,
      headerTitleVariant,
      onDismiss,
      snapPoints,
      enableDynamicSizing = true,
    },
    ref
  ) => {
    // Removed the "default" default value
    const snapPointsInternal = useMemo(
      () => snapPoints || ["90%"],
      [snapPoints]
    );

    // FIX 2: Pass the prop directly. If it's undefined, Unistyles will
    // correctly apply the default styles.
    styles.useVariants({
      variant: headerTitleVariant,
    });

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPointsInternal}
        enableDynamicSizing={enableDynamicSizing}
        handleComponent={() => <View style={styles.handle} />}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
        backgroundStyle={styles.background}
        style={{ flex: 1 }}
        onDismiss={onDismiss}
      >
        {children}
      </BottomSheetModal>
    );
  }
);

export const AppBottomSheetHeader = ({
  title,
  variant,
}: {
  title: string;
  variant: HeaderVariant;
}) => {
  styles.useVariants({
    variant,
  });

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};
