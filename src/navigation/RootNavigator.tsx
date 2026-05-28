import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import SplashScreen from "../components/screens/SplashScreen";
import OnboardingScreen from "../components/screens/OnboardingScreen";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator id="RootStack" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash"      component={SplashScreen} />
      <Stack.Screen name="Onboarding"  component={OnboardingScreen} />
      <Stack.Screen name="Auth"        component={AuthNavigator} />
      <Stack.Screen name="Main"        component={MainNavigator} />
    </Stack.Navigator>
  );
}
