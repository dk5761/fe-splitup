import React, { useCallback, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { Button, Checkbox, Switch, Input } from "@/components";
import { MaterialIcons } from "@expo/vector-icons";
import { SwitchRow } from "@/components/ui/switch/Switch";
import { SearchInput } from "@/components/ui/searchInput";

const MOCK_DATA = [
  "Hanlin",
  "Andrew",
  "Charlotte",
  "Joseph",
  "Kristin",
  "Damon",
];
export const ExampleScreen: React.FC = () => {
  const [switchOn, setSwitchOn] = React.useState(false);
  const [frontendFilteredData, setFrontendFilteredData] = useState(MOCK_DATA);
  const [backendLoading, setBackendLoading] = useState(false);
  const [backendResults, setBackendResults] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);

  const handleBackendSearch = useCallback((query: string) => {
    console.log("Backend search for:", query);
    if (!query) {
      setBackendResults([]);
      return;
    }
    setBackendLoading(true);
    setTimeout(() => {
      const results = MOCK_DATA.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setBackendResults(results);
      setBackendLoading(false);
    }, 1000);
  }, []);

  const handleFrontendSearch = useCallback((query: string) => {
    console.log("Frontend search for:", query);
    if (!query) {
      setFrontendFilteredData(MOCK_DATA);
      return;
    }
    const filtered = MOCK_DATA.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setFrontendFilteredData(filtered);
  }, []);

  const options = React.useMemo(
    () => [
      { label: "Apple", value: "apple" },
      { label: "Banana", value: "banana" },
      { label: "Cherry", value: "cherry" },
    ],
    []
  );

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
      <View style={{ padding: 20, gap: 15 }}>
        <Input
          label="Username"
          leftIcon={<MaterialIcons name="person" size={24} color="black" />}
        />

        <Input
          leftIcon={<MaterialIcons name="lock" size={24} color="black" />}
          isPassword
          placeholder="Password"
        />

        <SwitchRow
          label="Notifications"
          {...{ value: switchOn, onValueChange: setSwitchOn }}
        />
        <Switch {...{ value: switchOn, onValueChange: setSwitchOn }} />

        <Checkbox
          value={checked}
          onValueChange={setChecked}
          children={<Text>I agree to the terms and conditions</Text>}
        />

        <View>
          <Text style={{ color: "white", fontSize: 18, marginBottom: 10 }}>
            Frontend Search
          </Text>
          <SearchInput
            placeholder="Search locally..."
            onSearch={handleFrontendSearch}
          />
          <Text style={{ color: "gray", marginTop: 8 }}>
            Results: {frontendFilteredData.join(", ")}
          </Text>
        </View>

        {/* --- Backend Example --- */}
        <View>
          <Text style={{ color: "white", fontSize: 18, marginBottom: 10 }}>
            Backend Search
          </Text>
          <SearchInput
            placeholder="Search on server..."
            onSearch={handleBackendSearch}
            loading={backendLoading}
          />
          <Text style={{ color: "gray", marginTop: 8 }}>
            Results: {backendResults.join(", ")}
          </Text>
        </View>

        <Button title="Sign Up" variant="primary" onPress={() => {}} />
        <Button title="Log In" variant="outline" onPress={() => {}} />
        <Button
          title="Continue with Google"
          variant="social"
          icon={<MaterialIcons name="gpp-good" size={24} color="black" />}
          onPress={() => {}}
        />
        <Button
          title="Forgot Password?"
          variant="ghost"
          onPress={() => {}}
          style={{ alignSelf: "center" }}
        />
        <Button
          title="Processing..."
          variant="primary"
          loading
          onPress={() => {}}
        />
        <Button
          title="Disabled"
          variant="outline"
          disabled
          onPress={() => {}}
        />
      </View>
    </ScrollView>
  );
};
