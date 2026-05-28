import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainTabParamList, HomeStackParamList } from "./types";
import HomeScreen from "../components/screens/HomeScreen";
import JobDetailScreen from "../components/screens/JobDetailScreen";
import FavoritesScreen from "../components/screens/FavoritesScreen";
import ProfileScreen from "../components/screens/ProfileScreen";
import { colors } from "../styles/theme";

const Tab   = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<HomeStackParamList>();

function HomeStack() {
  return (
    <Stack.Navigator id="HomeStack" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="JobDetail"  component={JobDetailScreen} />
    </Stack.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <Tab.Navigator
      id="MainTabs"
      screenOptions={{
        headerShown:     false,
        tabBarActiveTintColor:   colors.primary[600],
        tabBarInactiveTintColor: colors.text.muted,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor:  colors.border,
        },
      }}
    >
      <Tab.Screen name="Home"      component={HomeStack} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Profile"   component={ProfileScreen} />
    </Tab.Navigator>
  );
}
