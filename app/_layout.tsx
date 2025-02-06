import { Stack } from "expo-router"
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import "../global.css"

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#1F9DFF' }, // Header color
          headerTintColor: '#000000', // Text and icon color
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false}}/>
        <Stack.Screen name="sign-up" options={{ headerShown: false}}/>
      </Stack>
      <StatusBar translucent backgroundColor="#1F9DFF" />
    </>
  )
}
