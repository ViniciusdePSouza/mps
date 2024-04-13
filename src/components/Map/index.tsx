import { View } from "react-native";
import { styles } from "./styles";
import MapView, { Marker } from "react-native-maps";
import { LocationObject } from "expo-location";
import { useEffect, useRef } from "react";

interface MapProps {
  location: LocationObject;
}

export function Map({ location }: MapProps) {
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    mapRef.current?.animateCamera({
        center: location.coords,
        zoom: 18
    })
  }, [location])

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider="google"
        style={styles.map}
        showsUserLocation
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
        />
      </MapView>
    </View>
  );
}
