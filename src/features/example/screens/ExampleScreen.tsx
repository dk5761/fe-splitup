import React from "react";
import { ScrollView, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import {
  Button,
  Checkbox,
  DatePicker,
  Link,
  Switch,
  TextField,
  AppDropdown,
} from "@/components";
import { appToast } from "@/components/toast";

export const ExampleScreen: React.FC = () => {
  const [switchOn, setSwitchOn] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [text, setText] = React.useState("");
  const [date, setDate] = React.useState<Date | null | undefined>(null);
  const [selected, setSelected] = React.useState<string | number | undefined>();

  const options = React.useMemo(
    () => [
      { label: "Apple", value: "apple" },
      { label: "Banana", value: "banana" },
      { label: "Cherry", value: "cherry" },
    ],
    []
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Button title="Primary Button" onPress={() => {}} />
      </View>

      <View style={styles.section}>
        <Button title="Link Button" variant="link" onPress={() => {}} />
      </View>

      <View style={styles.section}>
        <TextField
          label="Text Field"
          value={text}
          onChangeText={setText}
          placeholder="Type here"
        />
      </View>

      <View style={styles.section}>
        <Link onPress={() => {}}>Link component</Link>
      </View>

      <View style={styles.row}>
        <Switch value={switchOn} onValueChange={setSwitchOn} />
        <Checkbox value={checked} onValueChange={setChecked} label="Accept" />
      </View>

      <View style={styles.section}>
        <AppDropdown
          label="Dropdown"
          options={options}
          onSelect={(o) => setSelected(o.value)}
          selectedValue={selected}
        />
      </View>

      <View style={styles.section}>
        <DatePicker
          label="Date Picker"
          value={date ?? undefined}
          onChange={setDate}
          allowClear
        />
      </View>

      <View style={styles.row}>
        <Button
          title="Show Success"
          onPress={() => appToast.success("Success", { description: "Saved" })}
        />
        <Button
          title="Show Error"
          onPress={() => appToast.error("Error", { description: "Failed" })}
        />
        <Button
          title="Show Warning"
          onPress={() =>
            appToast.warning("Warning", { description: "Check input" })
          }
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    padding: theme.spacing.xl,
    gap: theme.spacing.lg,
  },
  section: {
    borderRadius: theme.radii.md,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.lg,
  },
}));
