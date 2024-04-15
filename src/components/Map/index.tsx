import { View, Text } from "react-native";
import { styles } from "./styles";
import MapView from "react-native-maps";
import { LocationObject } from "expo-location";
import { useEffect, useRef } from "react";
import { CarMarker } from "../CarMarker";
import { useTranslation } from "react-i18next";

interface MapProps {
  location: LocationObject;
}

export function Map({ location }: MapProps) {
  const mapRef = useRef<MapView>(null);
  const { t } = useTranslation();

  function determinateCarDirection(heading: number | null) {
    if (heading == null) return "top";

    if (heading > 10 && heading < 80) {
      return "topRight";
    } else if (heading > 80 && heading < 100) {
      return "top";
    } else if (heading > 100 && heading < 170) {
      return "rightDown";
    } else if (heading > 170 && heading < 190) {
      return "left";
    } else if (heading > 190 && heading < 260) {
      return "downLeft";
    } else if (heading > 260 && heading < 280) {
      return "down";
    } else if (heading > 280 && heading < 350) {
      return "topLeft";
    } else if (heading > 350 && heading < 0) {
      return "right";
    }

    return "top";
  }

  const pngCarDirection = determinateCarDirection(location.coords.heading);

  useEffect(() => {
    mapRef.current?.animateCamera({
      center: location.coords,
      zoom: 17,
      pitch: 10
    });
  }, [location]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider="google"
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        camera={{
          center: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          heading: 0,
          pitch: 10,
          zoom: 17,
        }}
      >
        <CarMarker location={location} pngCarDirection={pngCarDirection} />
      </MapView>

      <View>
        <Text style={styles.title}>{t("titleInstructions")}</Text>
        <Text style={styles.instructions}>{t("bannerInstructions")}</Text>
      </View>
    </View>
  );
}
