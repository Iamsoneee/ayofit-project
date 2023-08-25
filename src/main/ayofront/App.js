import { StyleSheet, Dimensions, StatusBar } from "react-native";
import "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import OnboardingScreen from "./screens/Onboarding";
import NutriDetailScreen from "./screens/nutriDetail/nutriDetail_test";
import RecordScreen from "./screens/record/RecordNavigator";
import FastMainPage from "./screens/fast/FastMainPage";
import PedometerScreen from "./screens/pedometer/PedometerScreen";
import AccountInfo from "./screens/account/AccountInfo";
import AccountNutri from "./screens/account/AccountNutri";
import { GlobalStyles } from "./components/UI/styles";
import FontProvider from "./components/FontProvider";
import AccountsContextProvider from "./store/accounts_context";
import AccountMain from "./navigations/AccountStack";
import { PedometerProvider } from "./store/PedometerContext";
import { PhotoProvider } from "./store/image_context";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabsScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
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
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: GlobalStyles.colors.primary500,
        tabBarInactiveTintColor: GlobalStyles.colors.blackOpacity50,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary50,
          borderRadius: 16,
          height: 65,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="HOME" component={NutriDetailScreen} />
      <Tab.Screen name="DIET RECORD" component={RecordScreen} />
      <Tab.Screen name="CHALLENGE" component={FastMainPage} />
      <Tab.Screen name="STEP COUNTER" component={PedometerScreen} />
      <Tab.Screen name="MY PAGE" component={AccountMain} />
    </Tab.Navigator>
  );
}

export default function App() {
  const { debuggerHost } = Constants.manifest2.extra.expoGo;
  const uri = `http://${debuggerHost.split(":").shift()}:8080`;
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [completedOnboarding, setCompletedOnboarding] = useState(false);

  const { width, height } = Dimensions.get("window");
  const desiredImageAspectRatio = 9 / 16;

  const imageWidth = width;
  const imageHeight = imageWidth / desiredImageAspectRatio;

  const handleOnboardingComplete = () => {
    setCompletedOnboarding(true);
  };

  if (showOnboarding && !completedOnboarding) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  return (
    <AccountsContextProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <FontProvider>
          <PhotoProvider>
            <StatusBar
              backgroundColor={GlobalStyles.colors.primary500}
              barStyle="default"
            />
            <NavigationContainer style={styles.navigationContainer}>
              <PedometerProvider>
                <Stack.Navigator>
                  {/* /* 인증해야되서 주석 처리 해둠
              <Stack.Screen
                name="AccountInfo"
                component={AccountInfo}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AccountNutri"
                component={AccountNutri}
                options={{ headerShown: false }}
              /> */}
                  <Stack.Screen
                    name="MainTabs"
                    component={MainTabsScreen}
                    options={{ headerShown: false }}
                  />
                </Stack.Navigator>
              </PedometerProvider>
            </NavigationContainer>
          </PhotoProvider>
        </FontProvider>
      </SafeAreaView>
    </AccountsContextProvider>
  );
}

const styles = StyleSheet.create({});
