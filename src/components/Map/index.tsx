import { View } from "react-native";
import { styles } from "./styles";
import MapView, { Marker } from "react-native-maps";
import { LocationObject } from "expo-location";

interface MapProps {
  location: LocationObject;
}

export function Map({ location }: MapProps) {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <Marker coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude
              }}/>
      </MapView>
    </View>
  );
}
