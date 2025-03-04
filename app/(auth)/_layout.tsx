import { useAuth } from "@/context/AuthContext";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const {authState} = useAuth()
  if(authState?.authenticated) return <Redirect href="/(dashboard)/(tabs)" />
  return (
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false}} />
        <Stack.Screen name="sign-up" options={{ headerShown: false}} />
        <Stack.Screen name="forgot-pass" options={{ headerShown: false}} />
    </Stack>
  )
}
