import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const TabsLayout = () => {
  return (
    <Tabs
    screenOptions={{
        tabBarActiveTintColor: "#1F9DFF",
        tabBarInactiveTintColor: "#6B6B6B",
        tabBarShowLabel: true,
        tabBarItemStyle: {
          marginTop: 15
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarStyle: {
          height: 74,
          backgroundColor: '#FFFF',
          borderTopLeftRadius: 30, // Rounded edges
          borderTopRightRadius: 30, // Rounded edges
          paddingVertical: 16,
          paddingHorizontal: 16,
        //   display: "flex",
        //   flexDirection: "row",
        //   justifyContent: "center",
          // position: 'absolute', // Ensures it floats
          // left: 10, // Adjust left margin
          // right: 10, // Adjust right margin
          shadowColor: '#000', // Shadow for iOS
          shadowOpacity: 0.1,
          shadowRadius: 10,
        },
        tabBarIconStyle: {
          marginBottom: -5,
          marginTop: -5,
          height: 30,
          width: 30
        },
      }}
    >
        <Tabs.Screen
            name="index"
            options={{
                title: "Home",
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" size={size} color={color} />
                ),
            }}
        />
        <Tabs.Screen
            name="buses"
            options={{
                title: "Buses",
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                <Ionicons name="bus" size={size} color={color} />
                ),
            }}
        />
        <Tabs.Screen
            name="routes"
            options={{
                title: "Routes",
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                <Ionicons name="map" size={size} color={color} />
                ),
            }}
        />
        <Tabs.Screen
            name="alerts"
            options={{
                title: "Alerts",
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                <Ionicons name="alert-circle" size={size} color={color} />
                ),
            }}
        />
        <Tabs.Screen
            name="profile"
            options={{
                title: "Profile",
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" size={size} color={color} />
                ),
            }}
        />
    </Tabs>
  )
}

export default TabsLayout