import React from 'react'
import { Redirect, Stack, Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '@/context/AuthContext'

function DashboardLayout() {
    const {authState} = useAuth()
    if(!authState?.authenticated) return <Redirect href="/(auth)" />
  return (
    <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false}} />
    </Stack>
  )
}

export default DashboardLayout