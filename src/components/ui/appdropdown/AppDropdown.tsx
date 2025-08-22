// // src/components/AppDropdown/AppDropdown.tsx

// import React, { useRef, useState, useMemo } from "react";
// import {
//   View,
//   Text,
//   Pressable,
//   FlatList,
//   TouchableOpacity,
// } from "react-native";
// import {
//   AppBottomSheet,
//   AppBottomSheetRef,
// } from "@/components/ui/appbottomsheet/AppBottomSheet";
// import { styles } from "./AppDropdown.styles";
// import { Check, ChevronDown, X } from "lucide-react-native";
// import { useUnistyles } from "react-native-unistyles";
// import { Checkbox } from "../checkbox/Checkbox"; // Assuming you have a simple checkbox component
// import { BottomSheetView } from "@gorhom/bottom-sheet";

// // Define the shape of each option
// export interface DropdownOption {
//   label: string;
//   value: string;
// }

// // Props for single-select mode
// interface SingleSelectProps {
//   multiselect?: false;
//   value: string | null;
//   onChange: (value: string | null) => void;
// }

// // Props for multi-select mode
// interface MultiSelectProps {
//   multiselect: true;
//   value: string[];
//   onChange: (value: string[]) => void;
// }

// type AppDropdownProps = {
//   options: DropdownOption[];
//   placeholder?: string;
// } & (SingleSelectProps | MultiSelectProps);

// export const AppDropdown = (props: AppDropdownProps) => {
//   const { options, placeholder = "Select an option" } = props;
//   const bottomSheetRef = useRef<AppBottomSheetRef>(null);
//   const { theme } = useUnistyles();

//   // --- Selection Logic ---
//   const handleSelect = (option: DropdownOption) => {
//     if (props.multiselect) {
//       const currentSelection = props.value || [];
//       const isSelected = currentSelection.includes(option.value);
//       const newSelection = isSelected
//         ? currentSelection.filter((item) => item !== option.value)
//         : [...currentSelection, option.value];
//       props.onChange(newSelection);
//     } else {
//       props.onChange(option.value);
//       bottomSheetRef.current?.dismiss();
//     }
//   };

//   // --- Render Logic for the Trigger ---
//   const renderTriggerContent = () => {
//     if (props.multiselect) {
//       if (props.value.length === 0) {
//         return <Text style={styles.placeholderText}>{placeholder}</Text>;
//       }
//       // This is a simplified logic for chip rendering. A more complex
//       // implementation would measure the container to be more accurate.
//       const visibleChips = props.value.slice(0, 2); // Show max 2 chips
//       const overflowCount = props.value.length - visibleChips.length;

//       const getLabel = (val: string) =>
//         options.find((opt) => opt.value === val)?.label || val;

//       return (
//         <View style={styles.chipsContainer}>
//           {visibleChips.map((val) => (
//             <View key={val} style={styles.chip}>
//               <Text style={styles.chipText}>{getLabel(val)}</Text>
//             </View>
//           ))}
//           {overflowCount > 0 && (
//             <View style={styles.overflowChip}>
//               <Text style={styles.overflowChipText}>+{overflowCount}</Text>
//             </View>
//           )}
//         </View>
//       );
//     } else {
//       const selectedOption = options.find((opt) => opt.value === props.value);
//       if (selectedOption) {
//         return <Text style={styles.triggerText}>{selectedOption.label}</Text>;
//       }
//       return <Text style={styles.placeholderText}>{placeholder}</Text>;
//     }
//   };

//   const openBottomSheet = () => {
//     bottomSheetRef.current?.present();
//   };

//   return (
//     <>
//       <TouchableOpacity
//         style={styles.triggerContainer}
//         onPress={openBottomSheet}
//         activeOpacity={0.8} // A nice touch for visual feedback
//       >
//         {renderTriggerContent()}
//         <ChevronDown size={20} color={theme.colors.textSecondary} />
//       </TouchableOpacity>

//       <AppBottomSheet ref={bottomSheetRef} title={placeholder}>
//         <BottomSheetView style={styles.listContainer}>
//           <FlatList
//             data={options}
//             keyExtractor={(item) => item.value}
//             ItemSeparatorComponent={() => <View style={styles.separator} />}
//             renderItem={({ item }) => {
//               const isSelected = props.multiselect
//                 ? props.value.includes(item.value)
//                 : props.value === item.value;

//               return (
//                 <TouchableOpacity
//                   style={styles.listItem}
//                   onPress={() => handleSelect(item)}
//                 >
//                   {props.multiselect ? (
//                     // For multi-select, use our custom Checkbox component
//                     <Checkbox
//                       value={isSelected}
//                       onValueChange={() => handleSelect(item)}
//                     />
//                   ) : null}
//                   <Text style={styles.listItemText}>{item.label}</Text>
//                   {!props.multiselect && isSelected && (
//                     // For single-select, use the styled Check icon
//                     <Check size={20} color={theme.colors.primary} />
//                   )}
//                 </TouchableOpacity>
//               );
//             }}
//           />
//         </BottomSheetView>
//       </AppBottomSheet>
//     </>
//   );
// };

// src/components/AppDropdown/AppDropdown.tsx

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import {
  AppBottomSheet,
  AppBottomSheetRef,
} from "../appbottomsheet/AppBottomSheet";
import { styles } from "./AppDropdown.styles";
import { ChevronDown, Check } from "lucide-react-native";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { useUnistyles } from "react-native-unistyles";

// --- TYPE DEFINITIONS ---

export interface DropdownOption {
  label: string;
  value: string;
  [key: string]: any; // Allow for extra data like avatars, etc.
}

// --- CONTEXT ---

interface DropdownContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  options: DropdownOption[];
  selectedValue: string | string[] | null;
  handleSelect: (option: DropdownOption) => void;
  multiselect: boolean;
}

const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined
);

const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("useDropdown must be used within a AppDropdown provider");
  }
  return context;
};

// --- COMPOUND COMPONENTS ---

// 1. Root Provider Component
interface AppDropdownProps {
  children: React.ReactNode;
  value: string | string[] | null;
  onChange: (value: any) => void;
  options: DropdownOption[];
  multiselect?: boolean;
}

const AppDropdown = ({
  children,
  value,
  onChange,
  options,
  multiselect = false,
}: AppDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: DropdownOption) => {
    if (multiselect) {
      const current = (value as string[]) || [];
      const isSelected = current.includes(option.value);
      const newSelection = isSelected
        ? current.filter((item) => item !== option.value)
        : [...current, option.value];
      onChange(newSelection);
    } else {
      onChange(option.value);
      setIsOpen(false); // Close on single select
    }
  };

  const contextValue = {
    isOpen,
    setIsOpen,
    options,
    selectedValue: value,
    handleSelect,
    multiselect,
  };

  return (
    <DropdownContext.Provider value={contextValue}>
      {children}
    </DropdownContext.Provider>
  );
};

// 2. Trigger Component
interface TriggerProps {
  children: (info: {
    selectedValue: string | string[] | null;
    options: DropdownOption[];
  }) => React.ReactElement;
  placeholder?: string;
}

const Trigger = ({
  children,
  placeholder = "Select an option",
}: TriggerProps) => {
  const { setIsOpen, selectedValue, options } = useDropdown();
  const { theme } = useUnistyles();

  const hasValue =
    selectedValue &&
    (Array.isArray(selectedValue) ? selectedValue.length > 0 : true);

  return (
    <TouchableOpacity
      style={styles.triggerContainer}
      onPress={() => setIsOpen(true)}
      activeOpacity={0.8}
    >
      <View style={{ flex: 1, justifyContent: "center" }}>
        {hasValue ? (
          children({ selectedValue, options })
        ) : (
          <Text style={styles.placeholderText}>{placeholder}</Text>
        )}
      </View>
      <ChevronDown size={20} color={theme.colors.textSecondary} />
    </TouchableOpacity>
  );
};

// 3. Content Component (The Bottom Sheet)
interface ContentProps {
  children: (info: {
    item: DropdownOption;
    isSelected: boolean;
    handleSelect: (item: DropdownOption) => void;
  }) => React.ReactElement;
  title?: string;
}

const Content = ({ children, title = "Select an option" }: ContentProps) => {
  const {
    isOpen,
    setIsOpen,
    options,
    selectedValue,
    handleSelect,
    multiselect,
  } = useDropdown();
  const bottomSheetRef = useRef<AppBottomSheetRef>(null);

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.present();
    } else {
      // It's important to check if the ref is mounted before dismissing
      if (bottomSheetRef.current) {
        bottomSheetRef.current?.dismiss();
      }
    }
  }, [isOpen]);

  return (
    <AppBottomSheet ref={bottomSheetRef} onDismiss={() => setIsOpen(false)}>
      <BottomSheetView style={{ flex: 1 }}>
        <FlatList
          data={options}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => {
            const isSelected = multiselect
              ? (selectedValue as string[]).includes(item.value)
              : selectedValue === item.value;
            return children({ item, isSelected, handleSelect });
          }}
          // Add a little padding to the list content
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      </BottomSheetView>
    </AppBottomSheet>
  );
};

// Assign child components as properties of the main component
AppDropdown.Trigger = Trigger;
AppDropdown.Content = Content;

export { AppDropdown };
