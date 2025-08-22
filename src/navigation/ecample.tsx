// screens/ExampleScreen.tsx

import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { AppDropdown } from "../components/ui/appdropdown/AppDropdown"; // Adjust path
import { Checkbox } from "../components/ui/checkbox/Checkbox";
import { useUnistyles } from "react-native-unistyles";
import { Check } from "lucide-react-native";

const currencyOptions = [
  { label: "US Dollar", value: "US_DOLLAR", symbol: "USD" },
  { label: "Euro", value: "EURO", symbol: "EUR" },
];
const userOptions = [
  {
    label: "Andrew Ainsley",
    value: "user_1",
    avatar: "https://i.pravatar.cc/100?u=user_1",
  },
  {
    label: "Kristin Watson",
    value: "user_2",
    avatar: "https://i.pravatar.cc/100?u=user_2",
  },
];

const CompoundDropdownScreen = () => {
  const [currency, setCurrency] = useState("US_DOLLAR");
  const [users, setUsers] = useState(["user_1"]);
  const { theme } = useUnistyles();

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, gap: 30 }}>
      {/* --- SINGLE SELECT EXAMPLE --- */}
      <Text>Select Currency:</Text>
      <AppDropdown
        value={currency}
        onChange={setCurrency}
        options={currencyOptions}
      >
        <AppDropdown.Trigger placeholder="Choose a currency">
          {({ selectedValue, options }) => {
            const selectedOption = options.find(
              (opt) => opt.value === selectedValue
            );
            return <Text>{selectedOption?.symbol || ""}</Text>; // Your custom label logic!
          }}
        </AppDropdown.Trigger>

        <AppDropdown.Content>
          {({ item, isSelected, handleSelect }) => (
            <TouchableOpacity
              style={{
                padding: 15,
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => handleSelect(item)}
            >
              <Text style={{ flex: 1 }}>
                {item.label} ({item.symbol})
              </Text>
              {isSelected && <Check size={20} color="green" />}
            </TouchableOpacity>
          )}
        </AppDropdown.Content>
      </AppDropdown>

      {/* --- MULTI SELECT EXAMPLE --- */}
      <Text>Select Users:</Text>
      <AppDropdown
        value={users}
        onChange={setUsers}
        options={userOptions}
        multiselect
      >
        <AppDropdown.Trigger placeholder="Assign users">
          {({ selectedValue, options }) => (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: -10 }}
            >
              {(selectedValue as string[]).map((val) => {
                const user = options.find((opt) => opt.value === val);
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                    key={user?.value}
                  >
                    <Text>{user?.label}</Text>
                  </View>
                );
              })}
            </View>
          )}
        </AppDropdown.Trigger>

        <AppDropdown.Content>
          {({ item, isSelected, handleSelect }) => (
            <TouchableOpacity
              style={{
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => handleSelect(item)}
            >
              <Checkbox
                value={isSelected}
                onValueChange={() => handleSelect(item)}
              />
              <Image
                source={{ uri: item.avatar }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  marginHorizontal: 10,
                }}
              />
              <Text>{item.label}</Text>
            </TouchableOpacity>
          )}
        </AppDropdown.Content>
      </AppDropdown>
    </SafeAreaView>
  );
};

export default CompoundDropdownScreen;
