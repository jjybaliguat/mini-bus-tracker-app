import { View, Text, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps'
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import images from '@/constants/images';
import { useRouter } from 'expo-router';


const BusesLiveLocation = () => {
  const [location, setLocation] = useState<Region>({
    latitude: 14.7612122,
    longitude: 121.1535874,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const mapRef = useRef<MapView>(null);
    const router = useRouter()
  
    useEffect(() => {
      (async () => {
        setLoading(true);
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setLoading(false);
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

    const focusMap = () => {
      mapRef.current?.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.005, // Zoomed-in
        longitudeDelta: 0.005,
      }, 1000);
    }

  return (
    <SafeAreaView>
      <View className='h-full w-full'>
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          provider={PROVIDER_GOOGLE}
          initialRegion={location}
          showsUserLocation
          showsMyLocationButton={false}
          // showsCompass={true}
          // mapPadding={{ top: 50, right: 20, bottom: 0, left: 0 }}
          showsTraffic
        >
          {/* {location && <Marker coordinate={location} title="You are here" />} */}
          {/* {loading && <ActivityIndicator size="large" className="mt-4" />} */}
        </MapView>
        <View className='w-full flex-row justify-between items-center absolute top-[40px] px-4'>
          <TouchableOpacity 
          onPress={()=>router.back()}
          style={{
              shadowColor: "#000", // Shadow color
              shadowOffset: { width: 0, height: 4 }, // Shadow direction
              shadowOpacity: 0.2, // Shadow transparency
              shadowRadius: 20, // Blur effect
              elevation: 6, // Shadow for Android
          }}
          className='p-2 flex-row justify-center items-center rounded-lg bg-white w-[50px] h-[50px]'>
            <Ionicons name="chevron-back-outline" size={25} />
          </TouchableOpacity>
          <View 
          style={{
              shadowColor: "#000", // Shadow color
              shadowOffset: { width: 0, height: 4 }, // Shadow direction
              shadowOpacity: 0.2, // Shadow transparency
              shadowRadius: 20, // Blur effect
              elevation: 6, // Shadow for Android
          }}
          className='p-4 flex-row gap-2 justify-center items-center rounded-lg bg-white'>
            <Ionicons name="navigate" size={20} />
            <Text className='font-semibold text-[16px]'>Bus Name</Text>
            <Ionicons name="caret-down" size={14} color="#777777" />
          </View>
        </View>
        <View className='flex-col w-full gap-2 absolute bottom-6'>
          <View className='flex-row justify-end'>
            <TouchableOpacity className='p-2 rounded-lg bg-white mx-4' onPress={focusMap}>
              <Ionicons name='locate-outline' className='text-gray-200' size={30} />
            </TouchableOpacity>
          </View>
          <View className='p-6 bg-white rounded-[15px] w-[90%] mx-auto'>
            <View className='flex-row gap-4 items-center'>
              <View className='h-[90px] w-[90px] bg-black rounded-[15px]'>
                <Image
                  source={images.Bus2Image}
                  className="w-full h-full"
                  resizeMode="contain"
                />
              </View>
              <View className='flex-col gap-1'>
                <Text className='font-semibold text-[16px]'>Mini Bus Name</Text>
                <View className='flex-row gap-1 items-center'><Ionicons name="location" size={15} /><Text className='text-[13px] text-gray-400'>current location</Text></View>
                <Text className='text-[13px] text-gray-400'>Speed: 50km/hr</Text>
                <View className='mt-2 flex-row gap-2 items-center py-1 px-2 bg-[#2CB864] rounded-lg' style={{ alignSelf: "flex-start" }}>
                  <Ionicons name="navigate" size={15} color="white" /><Text className='text-white font-medium'>10 km</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default BusesLiveLocation