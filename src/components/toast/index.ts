import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { toast } from "sonner-native";

interface ToastOptions {
  description?: string;
  duration?: number;
}

function lighten(hex: string, amount: number): string {
  // amount: 0..1 -> closer to white
  const normalized = hex.replace("#", "");
  const num = parseInt(
    normalized.length === 3
      ? normalized
          .split("")
          .map((c) => c + c)
          .join("")
      : normalized,
    16
  );
  const r = (num >> 16) & 0xff;
  const g = (num >> 8) & 0xff;
  const b = num & 0xff;
  const mix = (channel: number) =>
    Math.round(channel + (255 - channel) * amount);
  const rr = mix(r).toString(16).padStart(2, "0");
  const gg = mix(g).toString(16).padStart(2, "0");
  const bb = mix(b).toString(16).padStart(2, "0");
  return `#${rr}${gg}${bb}`;
}

const styles = StyleSheet.create((theme) => ({
  base: {
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  success: {
    backgroundColor: lighten(theme.colors.success, 0.88),
    borderColor: lighten(theme.colors.success, 0.6),
  },
  error: {
    backgroundColor: lighten(theme.colors.error, 0.88),
    borderColor: lighten(theme.colors.error, 0.6),
  },
  warning: {
    backgroundColor: lighten(theme.colors.warning, 0.9),
    borderColor: lighten(theme.colors.warning, 0.6),
  },
}));

type Variant = "success" | "error" | "warning";

const ThemedIcon: React.FC<{ variant: Variant; name: any }> = ({
  variant,
  name,
}) => {
  const { theme } = useUnistyles();
  const color =
    variant === "success"
      ? theme.colors.success
      : variant === "error"
      ? theme.colors.error
      : theme.colors.warning;
  return React.createElement(MaterialIcons as any, { name, size: 20, color });
};

export function showSuccess(
  title: string,
  options?: ToastOptions
): string | number {
  return toast.success(title, {
    description: options?.description,
    duration: options?.duration ?? 3000,
    style: { ...styles.base, ...styles.success },
    icon: React.createElement(ThemedIcon, {
      variant: "success",
      name: "check-circle",
    }),
  });
}

export function showError(
  title: string,
  options?: ToastOptions
): string | number {
  return toast.error(title, {
    description: options?.description,
    duration: options?.duration ?? 4000,
    style: { ...styles.base, ...styles.error },
    icon: React.createElement(ThemedIcon, {
      variant: "error",
      name: "error-outline",
    }),
  });
}

export function showWarning(
  title: string,
  options?: ToastOptions
): string | number {
  return toast.warning(title, {
    description: options?.description,
    duration: options?.duration ?? 3500,
    style: { ...styles.base, ...styles.warning },
    icon: React.createElement(ThemedIcon, {
      variant: "warning",
      name: "warning",
    }),
  });
}

export const appToast = {
  success: showSuccess,
  error: showError,
  warning: showWarning,
};
