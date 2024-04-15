import { Marker } from "react-native-maps";

import { Image } from "react-native";
import { LocationObject } from "expo-location";

type DirectionsType =
  | "top"
  | "topRight"
  | "right"
  | "rightDown"
  | "down"
  | "downLeft"
  | "left"
  | "topLeft";

interface CarMarkerProps {
  location: LocationObject;
  pngCarDirection: DirectionsType;
}

const carIcons = {
    top: require('../../assets/top.png'),
    topRight: require('../../assets/top-right.png'),
    right: require('../../assets/right.png'),
    rightDown: require('../../assets/right-down.png'),
    down: require('../../assets/down.png'),
    downLeft: require('../../assets/left-down.png'),
    topLeft: require('../../assets/top-left.png'),
    left: require('../../assets/left.png'),
}

export function CarMarker({ location, pngCarDirection }: CarMarkerProps) {
  return (
    <Marker
      coordinate={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }}
    >
      <Image
         source={carIcons[pngCarDirection]}
        style={{ width: 35, height: 35, marginTop: 4, marginLeft: 4 }}
      />
    </Marker>
  );
}
