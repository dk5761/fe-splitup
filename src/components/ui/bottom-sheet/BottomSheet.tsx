import type { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import type { ReactNode } from "react";
import React, { forwardRef, useCallback, useMemo } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet as RNStyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

export type BottomSheetVariant = "persistent" | "modal";
export type BottomSheetSize = "small" | "medium" | "large" | "full" | "auto";

interface AppBottomSheetProps {
  children: ReactNode;
  variant?: BottomSheetVariant;
  size?: BottomSheetSize;
  snapPoints?: (string | number)[];

  // State management
  isVisible?: boolean;
  onClose?: () => void;
  onChange?: (index: number) => void;

  // Customization
  title?: string;
  enableBackdrop?: boolean;
  enablePanDownToClose?: boolean;
  scrollable?: boolean;

  // Style customization
  backgroundStyle?: StyleProp<ViewStyle>;
  handleStyle?: StyleProp<ViewStyle>;

  // Advanced
  keyboardBehavior?: "interactive" | "fillParent" | "extend";
  enableDynamicSizing?: boolean;
}

// Local method interface to keep ref typed without relying on lib internals
export interface AppBottomSheetMethods {
  present?: () => void;
  dismiss?: () => void;
  snapToIndex?: (index: number) => void;
  close?: () => void;
}

const PRESET_SNAP_POINTS: Record<BottomSheetSize, (string | number)[]> = {
  small: ["25%"],
  medium: ["50%"],
  large: ["75%"],
  full: ["90%"],
  auto: ["auto"], // Requires enableDynamicSizing
};

export const AppBottomSheet = forwardRef<
  AppBottomSheetMethods,
  AppBottomSheetProps
>(
  (
    {
      children,
      variant = "persistent",
      size = "medium",
      snapPoints: customSnapPoints,
      isVisible,
      onClose,
      onChange,
      title,
      enableBackdrop = true,
      enablePanDownToClose = true,
      scrollable = false,
      backgroundStyle,
      handleStyle,
      keyboardBehavior = "interactive",
      enableDynamicSizing = false,
    },
    ref
  ) => {
    const insets = useSafeAreaInsets();
    const { theme } = useUnistyles();

    const snapPoints = useMemo(() => {
      if (customSnapPoints) return customSnapPoints;
      if (size === "auto") return PRESET_SNAP_POINTS.auto;
      return PRESET_SNAP_POINTS[size];
    }, [customSnapPoints, size]);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={theme.components.bottomSheet.backdropOpacity}
          pressBehavior="close"
        />
      ),
      [theme.components.bottomSheet.backdropOpacity]
    );

    const handleSheetChanges = useCallback(
      (index: number) => {
        onChange?.(index);
        if (index === -1 && onClose) {
          onClose();
        }
      },
      [onChange, onClose]
    );

    const renderHeader = useCallback(() => {
      if (!title) return null;
      return (
        <View style={styles.header}>
          <View style={styles.headerIndicator} />
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
      );
    }, [title]);

    const ContentWrapper = scrollable ? BottomSheetScrollView : BottomSheetView;

    const contentStyle = useMemo(
      () => [
        styles.content,
        { paddingBottom: insets.bottom + theme.spacing.lg },
      ],
      [insets.bottom, theme.spacing.lg]
    );

    const commonProps = {
      snapPoints,
      onChange: handleSheetChanges,
      enablePanDownToClose,
      keyboardBehavior,
      enableDynamicSizing,
      backgroundStyle: [styles.background, backgroundStyle],
      // handleStyle: [styles.handle, handleStyle],
      handleComponent: title ? renderHeader : undefined,
      backdropComponent: enableBackdrop ? renderBackdrop : undefined,
    } as const;

    if (variant === "modal") {
      return (
        <BottomSheetModal ref={ref as unknown as any} {...(commonProps as any)}>
          <ContentWrapper
            style={contentStyle}
            contentContainerStyle={
              scrollable ? { paddingBottom: insets.bottom } : undefined
            }
          >
            {children}
          </ContentWrapper>
        </BottomSheetModal>
      );
    }

    return (
      <BottomSheet
        ref={ref as unknown as any}
        {...(commonProps as any)}
        index={isVisible ? 0 : -1}
      >
        <ContentWrapper
          style={contentStyle}
          contentContainerStyle={
            scrollable ? { paddingBottom: insets.bottom } : undefined
          }
        >
          {children}
        </ContentWrapper>
      </BottomSheet>
    );
  }
);

export const AppBottomSheetProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => <BottomSheetModalProvider>{children}</BottomSheetModalProvider>;

// Use theme tokens via Unistyles
const styles = StyleSheet.create((theme) => ({
  background: {
    backgroundColor: theme.components.bottomSheet.backgroundColor,
    borderTopLeftRadius: theme.components.bottomSheet.radius,
    borderTopRightRadius: theme.components.bottomSheet.radius,
    ...theme.shadows.l,
  },
  handle: {
    backgroundColor: theme.components.bottomSheet.handleColor,
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  header: {
    padding: theme.components.bottomSheet.headerPadding,
    alignItems: "center",
    borderBottomWidth: RNStyleSheet.hairlineWidth,
    borderBottomColor: theme.components.bottomSheet.headerBorderColor,
  },
  headerIndicator: {
    backgroundColor: theme.components.bottomSheet.handleColor,
    width: 40,
    height: 4,
    borderRadius: 2,
    marginBottom: theme.spacing.md,
  },
  headerTitle: {
    fontSize: theme.typography.sizes.h3,
    lineHeight: theme.typography.lineHeights.h3,
    fontFamily: theme.typography.families.medium,
    color: theme.colors.text,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.components.bottomSheet.contentPaddingHorizontal,
  },
}));

export const useAppBottomSheet = () => {
  const ref = React.useRef<AppBottomSheetMethods | null>(null);

  const present = useCallback(() => {
    ref.current?.present?.();
  }, []);

  const dismiss = useCallback(() => {
    ref.current?.dismiss?.();
  }, []);

  const snapToIndex = useCallback((index: number) => {
    ref.current?.snapToIndex?.(index);
  }, []);

  const close = useCallback(() => {
    ref.current?.close?.();
  }, []);

  return { ref, present, dismiss, snapToIndex, close };
};
