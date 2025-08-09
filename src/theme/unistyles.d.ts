import "react-native-unistyles";
import type { AppBreakpoints, AppTheme } from "./index";

declare module "react-native-unistyles" {
  // Augment Unistyles DefaultTheme with our theme shape
  export interface UnistylesThemes {
    light: AppTheme;
    dark: AppTheme;
  }
  export interface UnistylesBreakpoints extends AppBreakpoints {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  }
}
