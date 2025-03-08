import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Radar, { presetResponsive } from "react-native-radar";
import * as Location from "expo-location";

// Define TypeScript types
interface VehicleLocation {
  latitude: number;
  longitude: number;
  id: string;
  name: string;
}

const RadarSampleMap: React.FC = () => {
  const [userLocation, setUserLocation] = useState<VehicleLocation | null>(null);
  const [fleetVehicles, setFleetVehicles] = useState<VehicleLocation[]>([]);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        // Request permission for location
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission Denied", "Location access is required.");
          return;
        }

        // Get user's current location
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          id: "user",
          name: "You",
        });

        // Start tracking with Radar
        Radar.setUserId("user_123"); // Change this based on user ID
        Radar.startTrackingResponsive();

        // fetchFleetVehicles();
      } catch (error) {
        console.error("Error getting location:", error);
        Alert.alert("Error", "Failed to fetch location.");
      }
    };

    const fetchFleetVehicles = async () => {
      try {
        const response = await fetch("https://your-backend.com/api/fleet");
        const data: VehicleLocation[] = await response.json();
        setFleetVehicles(data);
      } catch (error) {
        console.error("Error fetching fleet data:", error);
      }
    };

    fetchLocation();
    const interval = setInterval(fetchFleetVehicles, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: userLocation?.latitude || 14.5995, // Default location
          longitude: userLocation?.longitude || 120.9842,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* User Location Marker */}
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="You"
            pinColor="blue"
          />
        )}

        {/* Fleet Vehicles Markers */}
        {fleetVehicles.map((vehicle) => (
          <Marker
            key={vehicle.id}
            coordinate={{
              latitude: vehicle.latitude,
              longitude: vehicle.longitude,
            }}
            title={vehicle.name}
            pinColor="red"
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});

export default RadarSampleMap;
