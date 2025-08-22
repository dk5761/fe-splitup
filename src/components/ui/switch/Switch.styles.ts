// src/components/Switch/Switch.styles.ts

import { StyleSheet } from "react-native-unistyles";

const trackWidth = 52;
const trackHeight = 32;
const thumbSize = 24;
const thumbPadding = (trackHeight - thumbSize) / 2; // = 2px on each side

export const styles = StyleSheet.create((theme) => ({
  // The track is the background of the switch
  track: {
    width: trackWidth,
    height: trackHeight,
    borderRadius: trackHeight / 2,
    justifyContent: "center", // This centers the thumb vertically
    paddingHorizontal: thumbPadding,

    // V3 Variants: Controls the background color based on the 'on' prop
    variants: {
      on: {
        true: {
          backgroundColor: theme.colors.primary, // Active (yellow) color
        },
        default: {
          backgroundColor: theme.colors.border, // Inactive (gray) color
        },
      },
    },
  },

  // The thumb is the sliding circle
  thumb: {
    width: thumbSize,
    height: thumbSize,
    borderRadius: thumbSize / 2,
    backgroundColor: theme.colors.surface,
    ...theme.shadows.s,
    elevation: 2, // Required for Android shadow

    // V3 Variants: Controls the thumb's position
    variants: {
      on: {
        true: {
          // When 'on', the thumb aligns to the end of the track
          alignSelf: "flex-end",
        },
        default: {
          // By default, the thumb aligns to the start
          alignSelf: "flex-start",
        },
      },
    },
  },
}));
