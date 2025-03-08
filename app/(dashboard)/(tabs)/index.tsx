import { View, Text, Button, Image, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '@/context/AuthContext'
import images from '@/constants/images'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps'
import * as Location from 'expo-location';

const Dashboard = () => {
  const {authState, onLogout} = useAuth()
  const user = authState?.user

  const [location, setLocation] = useState<Region | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
      mapRef.current?.animateToRegion({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.005, // Zoomed-in
        longitudeDelta: 0.005,
      }, 1000);
    })();
  }, []);

  return (
    <SafeAreaView className='px-4'>
      <View className='absolute top-3 left-0'>
        <Image
          source={images.DashboardVector}
          className="w-[200px] h-[200px]"
          resizeMode="contain"
        />
      </View>
      <View className='flex-row justify-between items-center py-10'>
        <View className='flex-row gap-4 items-center'>
          <View className='h-[60px] w-[60px] rounded-[50px] bg-black' />
          <View>
            <Text className='font-medium'>Welcome!</Text>
            <Text className='font-semibold text-[20px]'>Justine Jerald Baliguat</Text>
          </View>
        </View>
        {/* <Image
          source={images.NotifButton}
          className="w-[43px] h-[43px]"
          resizeMode="contain"
        /> */}
      </View>
      <View className='flex-row justify-between items-center'>
        <Text className='font-semibold text-[18px]'>Bus Live Location</Text>
        <Link className='flex-row items-center gap-2 p-1' href="/(dashboard)/(tabs)/buses">See All <Ionicons name='arrow-forward-outline' /></Link>
      </View>
      <View className="items-center justify-center mt-2 h-[300px] w-full">
        {location && (
          <View
            style={{
              width: "100%",
              height: 284,
              borderRadius: 20,
              overflow: "hidden", // Ensures map is clipped to border radius
              backgroundColor: "white", // Needed for shadow visibility on iOS
              shadowColor: "#000", // Shadow color
              shadowOffset: { width: 0, height: 4 }, // Shadow direction
              shadowOpacity: 0.2, // Shadow transparency
              shadowRadius: 20, // Blur effect
              elevation: 6, // Shadow for Android
            }}
          >
            <MapView
              ref={mapRef}
              style={{ flex: 1 }}
              provider={PROVIDER_GOOGLE}
              initialRegion={location}
              showsUserLocation
              showsCompass={true}
            >
              {/* <Marker coordinate={location} title="You are here" /> */}
            </MapView>
          </View>
        )}
    </View>
    <View className='flex-col gap-4 mt-4'>
      <View className='flex-row justify-between items-center'>
        <Text className='font-semibold text-[18px]'>Nearby Buses</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 0 }}>
        {[...Array(20)].map((_, index) => (
          <View key={index} className="mb-2 p-6 bg-white rounded-lg shadow-md flex-row justify-between items-center">
            <View className='flex-row gap-6 items-center'>
              <View className='h-[50px] w-[50px]'>
                <Image
                  source={images.Bus2Image}
                  className="w-full h-full"
                  resizeMode="contain"
                />  
              </View>
              <View className='flex-col gap-1'>
                <Text className='text-[16px] font-medium'>Bus Name</Text>
                <Text className='text-[13px]'>Estimated Time: 1min</Text>
              </View>
            </View>
            <Link href="/(dashboard)/(tabs)/buses" className='p-2'>
              <Ionicons name='arrow-forward-outline' size={20} />
            </Link>
          </View>
        ))}
      </ScrollView>
    </View>
    </SafeAreaView>
  )
}

export default Dashboard