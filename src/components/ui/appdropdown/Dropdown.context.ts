// src/components/AppDropdown/DropdownContext.ts

import React, { createContext, useContext } from "react";
import { DropdownOption } from "./AppDropdown"; // Assuming types are in the main file

// Define the shape of the context state
interface DropdownContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  options: DropdownOption[];
  selectedValue: string | string[] | null;
  handleSelect: (option: DropdownOption) => void;
  multiselect: boolean;
}

// Create the context with a default value
export const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined
);

// Create a custom hook for easy access to the context
export const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("useDropdown must be used within a Dropdown provider");
  }
  return context;
};
