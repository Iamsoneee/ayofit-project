import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import NutriDetailScreen from "./screens/nutriDetail/nutriDetail_test";
import RecordNavigator from "./screens/record/RecordNavigator";
import FastScreen from "./screens/fast/fast_test";
import PedometerScreen from "./screens/pedometer/pedometer_test";
import AccountScreen from "./screens/account/account_test";
import { GlobalStyles } from "./components/UI/styles";

import TimePickerExample from "./screens/record/TimePickerExample";



const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.navigationContainer}>
      <Tab.Navigator
         screenOptions={({ route }) => ({
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: true,
          headerShown: false,

          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "HOME") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "DIET RECORD") {
              iconName = focused ? "fast-food" : "fast-food-outline";
            } else if (route.name === "CHALLENGE") {
              iconName = focused ? "trophy" : "trophy-outline";
            } else if (route.name === "STEP COUNTER") {
              iconName = focused ? "walk" : "walk-outline";
            } else if (route.name === "MY PAGE") {
              iconName = focused ? "person" : "person-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: GlobalStyles.colors.primary500,
          tabBarInactiveTintColor: GlobalStyles.colors.blackOpacity50,
          tabBarStyle: {
            backgroundColor: GlobalStyles.colors.primary50,
            borderRadius: 16,
            height: 65,
          },
        })}
      >
        <Tab.Screen name="HOME" component={TimePickerExample} />
        <Tab.Screen name="DIET RECORD" component={RecordNavigator} />
        <Tab.Screen name="CHALLENGE" component={FastScreen} />
        <Tab.Screen name="STEP COUNTER" component={PedometerScreen} />
        <Tab.Screen name="MY PAGE" component={AccountScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
