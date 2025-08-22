// import React, { useCallback, useState } from "react";
// import { ScrollView, View, Text, SafeAreaView } from "react-native";
// import { Button, Checkbox, Switch, Input } from "@/components";
// import { MaterialIcons } from "@expo/vector-icons";
// import { SwitchRow } from "@/components/ui/switch/Switch";
// import { SearchInput } from "@/components/ui/searchInput";
// import { StyleSheet, useUnistyles } from "react-native-unistyles";
// import { Chip } from "@/components/ui/chip/Chip";
// import { StatsCard } from "@/components/statsCard/StatsCard";

// const MOCK_DATA = [
//   "Hanlin",
//   "Andrew",
//   "Charlotte",
//   "Joseph",
//   "Kristin",
//   "Damon",
// ];

// const mainTabs = ["Expenses", "Balances", "Totals", "Group"];
// const dateFilters = ["1D", "1W", "4W", "3M", "1Y", "All"];
// const categoryFilters = [
//   { label: "Trip", icon: "✈️" },
//   { label: "Family", icon: "👨‍👩‍👧‍👦" },
//   { label: "Couple", icon: "💑" },
//   { label: "Event", icon: "🗓️" },
//   { label: "Project", icon: "💼" },
//   { label: "Other", icon: "🧩" },
// ];
// export const ExampleScreen: React.FC = () => {
//   const [switchOn, setSwitchOn] = React.useState(false);
//   const [frontendFilteredData, setFrontendFilteredData] = useState(MOCK_DATA);
//   const [backendLoading, setBackendLoading] = useState(false);
//   const [backendResults, setBackendResults] = useState<string[]>([]);
//   const [checked, setChecked] = useState(false);
//   const [activeTab, setActiveTab] = useState("Totals");
//   const [activeDate, setActiveDate] = useState("All");
//   const [activeCategory, setActiveCategory] = useState("Trip");

//   const handleBackendSearch = useCallback((query: string) => {
//     console.log("Backend search for:", query);
//     if (!query) {
//       setBackendResults([]);
//       return;
//     }
//     setBackendLoading(true);
//     setTimeout(() => {
//       const results = MOCK_DATA.filter((item) =>
//         item.toLowerCase().includes(query.toLowerCase())
//       );
//       setBackendResults(results);
//       setBackendLoading(false);
//     }, 1000);
//   }, []);

//   const handleFrontendSearch = useCallback((query: string) => {
//     console.log("Frontend search for:", query);
//     if (!query) {
//       setFrontendFilteredData(MOCK_DATA);
//       return;
//     }
//     const filtered = MOCK_DATA.filter((item) =>
//       item.toLowerCase().includes(query.toLowerCase())
//     );
//     setFrontendFilteredData(filtered);
//   }, []);

//   const options = React.useMemo(
//     () => [
//       { label: "Apple", value: "apple" },
//       { label: "Banana", value: "banana" },
//       { label: "Cherry", value: "cherry" },
//     ],
//     []
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollView}>
//         <View style={{ padding: 20, gap: 15 }}>
//           <Input
//             label="Username"
//             leftIcon={<MaterialIcons name="person" size={24} color="black" />}
//           />

//           <Input
//             leftIcon={<MaterialIcons name="lock" size={24} color="black" />}
//             isPassword
//             placeholder="Password"
//           />

//           <SwitchRow
//             label="Notifications"
//             {...{ value: switchOn, onValueChange: setSwitchOn }}
//           />
//           <Switch {...{ value: switchOn, onValueChange: setSwitchOn }} />

//           <Checkbox
//             value={checked}
//             onValueChange={setChecked}
//             children={<Text>I agree to the terms and conditions</Text>}
//           />

//           <View>
//             <Text style={{ color: "white", fontSize: 18, marginBottom: 10 }}>
//               Frontend Search
//             </Text>
//             <SearchInput
//               placeholder="Search locally..."
//               onSearch={handleFrontendSearch}
//             />
//             <Text style={{ color: "gray", marginTop: 8 }}>
//               Results: {frontendFilteredData.join(", ")}
//             </Text>
//           </View>

//           {/* --- Backend Example --- */}
//           <View>
//             <Text style={{ color: "white", fontSize: 18, marginBottom: 10 }}>
//               Backend Search
//             </Text>
//             <SearchInput
//               placeholder="Search on server..."
//               onSearch={handleBackendSearch}
//               loading={backendLoading}
//             />
//             <Text style={{ color: "gray", marginTop: 8 }}>
//               Results: {backendResults.join(", ")}
//             </Text>
//           </View>

//           <View style={styles.tabContainer}>
//             {mainTabs.map((tab) => (
//               <Chip
//                 key={tab}
//                 label={tab}
//                 selected={activeTab === tab}
//                 onPress={() => setActiveTab(tab)}
//               />
//             ))}
//           </View>

//           {/* Category Filters (from the second image) */}
//           <View style={styles.filterContainer}>
//             {categoryFilters.map((cat) => (
//               <Chip
//                 key={cat.label}
//                 label={cat.label}
//                 icon={<Text>{cat.icon}</Text>}
//                 selected={activeCategory === cat.label}
//                 onPress={() => setActiveCategory(cat.label)}
//               />
//             ))}
//           </View>

//           {/* Date Filters */}
//           <View style={styles.filterContainer}>
//             {dateFilters.map((date) => (
//               <Chip
//                 key={date}
//                 label={date}
//                 size="small"
//                 selected={activeDate === date}
//                 onPress={() => setActiveDate(date)}
//               />
//             ))}
//           </View>

//           {/* Stats Cards */}
//           <View style={styles.statsContainer}>
//             <StatsCard title="Total Group Spending" value="$3,648.50" />
//             <StatsCard title="Total You Paid for" value="$1,759.25" />
//             <StatsCard title="Your Total Share" value="$608.08" />
//           </View>

//           <Button title="Sign Up" variant="primary" onPress={() => {}} />
//           <Button title="Log In" variant="outline" onPress={() => {}} />
//           <Button
//             title="Continue with Google"
//             variant="social"
//             icon={<MaterialIcons name="gpp-good" size={24} color="black" />}
//             onPress={() => {}}
//           />
//           <Button
//             title="Forgot Password?"
//             variant="ghost"
//             onPress={() => {}}
//             style={{ alignSelf: "center" }}
//           />
//           <Button
//             title="Processing..."
//             variant="primary"
//             loading
//             onPress={() => {}}
//           />
//           <Button
//             title="Disabled"
//             variant="outline"
//             disabled
//             onPress={() => {}}
//           />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create((theme) => ({
//   container: { flex: 1, backgroundColor: theme.colors.background },
//   scrollView: { padding: theme.spacing.lg, gap: theme.spacing.lg },
//   tabContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: theme.spacing.xl,
//   },
//   filterContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: theme.spacing.sm,
//     marginBottom: theme.spacing.xl,
//   },
//   statsContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: theme.spacing.md,
//     justifyContent: "space-between",
//   },
// }));

// screens/ExampleBottomSheetScreen.tsx
// NO CHANGES NEEDED HERE

import React, { useRef } from "react";
import { SafeAreaView, View, Text } from "react-native";
import {
  AppBottomSheet,
  AppBottomSheetHeader,
  AppBottomSheetRef,
} from "@/components/ui/appbottomsheet/AppBottomSheet";
import { Button } from "@/components/ui/button/Button";
import { Input } from "@/components/ui/input/Input";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";

export const ExampleScreen = () => {
  const deleteSheetRef = useRef<AppBottomSheetRef>(null);
  const requestSheetRef = useRef<AppBottomSheetRef>(null);
  const { theme } = useUnistyles();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      gap: 20,
      backgroundColor: theme.colors.background,
    },
    dialogText: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      textAlign: "center",
      marginBottom: 20,
    },
    dialogActions: { flexDirection: "row", gap: 10 },
    formContainer: { gap: 15 },
    contentContainer: {
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: theme.spacing.lg,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="Show Delete Dialog"
        variant="outline"
        onPress={() => deleteSheetRef.current?.present()}
      />
      <Button
        title="Show Request Form"
        variant="primary"
        onPress={() => requestSheetRef.current?.present()}
      />

      {/* This now uses the modern dynamic sizing API internally */}
      <AppBottomSheet
        ref={deleteSheetRef}
        title="Delete Group"
        headerTitleVariant="destructive"
      >
        <BottomSheetView style={styles.contentContainer}>
          <AppBottomSheetHeader title="Delete Group" variant="destructive" />
          <View style={styles.contentContainer}>
            <Text style={styles.dialogText}>
              Are you sure you want to delete the group "Trip to Japan"? All
              members and expenses will also be deleted.
            </Text>
            <View style={styles.dialogActions}>
              <Button
                title="Cancel"
                variant="outline"
                onPress={() => deleteSheetRef.current?.dismiss()}
                style={{ flex: 1 }}
              />
              <Button
                title="Yes, Delete"
                variant="primary"
                onPress={() => deleteSheetRef.current?.dismiss()}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </BottomSheetView>
      </AppBottomSheet>

      {/* This also uses the modern dynamic sizing API internally */}
      <AppBottomSheet ref={requestSheetRef} title="Request">
        <BottomSheetScrollView>
          <AppBottomSheetHeader title="Request" variant="destructive" />
          <View style={styles.contentContainer}>
            <Input
              label="Amount"
              defaultValue="$642.50"
              keyboardType="numeric"
            />
            <Input label="Request to" defaultValue="Maryland Winkles" />
            <Input
              label="Notes (optional)"
              defaultValue="Request Expense Explorers Group Payment."
              multiline
            />
            <View style={styles.dialogActions}>
              <Button
                title="Cancel"
                variant="outline"
                onPress={() => requestSheetRef.current?.dismiss()}
                style={{ flex: 1 }}
              />
              <Button
                title="Request Now"
                variant="primary"
                onPress={() => requestSheetRef.current?.dismiss()}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </BottomSheetScrollView>
      </AppBottomSheet>
    </SafeAreaView>
  );
};
