import { Stack } from "expo-router"
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import "../global.css"
import AuthProvider from "@/context/AuthContext";

export default function RootLayout() {
  return (
    <>
    <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#1F9DFF' }, // Header color
          headerTintColor: '#000000', // Text and icon color
        }}
      >
        <Stack.Screen name="(auth)" options={{ headerShown: false}}/>
        <Stack.Screen name="(dashboard)" options={{ headerShown: false}}/>
        {/* <Stack.Screen name="/(auth)/sign-up" options={{ headerShown: false}}/> */}
      </Stack>
      <StatusBar translucent backgroundColor="#1F9DFF" />
    </AuthProvider>
    </>
  )
}
