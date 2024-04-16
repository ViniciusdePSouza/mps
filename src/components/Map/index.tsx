import { DestinationProps, MapProps } from "../../@types";

import { View, Text } from "react-native";

import { styles } from "./styles";

import MapViewDirections from "react-native-maps-directions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView from "react-native-maps";

import { useEffect, useRef, useState } from "react";

import { CarMarker } from "../CarMarker";

import { useTranslation } from "react-i18next";

import config from "../../config/index.json";
import { Button } from "../Button";

export function Map({ location }: MapProps) {
  const mapRef = useRef<MapView>(null);
  const { t } = useTranslation();

  const [destination, setDestination] = useState<DestinationProps | null>(null);

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

  const clearDestination = () => {
    setDestination(null);
  };

  const pngCarDirection = determinateCarDirection(location.coords.heading);

  useEffect(() => {
    mapRef.current?.animateCamera({
      center: location.coords,
      zoom: 17,
      pitch: 10,
    });
  }, [location]);

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 100,
          width: "100%",
        }}
      >
        <GooglePlacesAutocomplete
          placeholder={t("inputPlaceholder")}
          onPress={(data, details) => {
            const chosenDestination = {
              latitude: details?.geometry.location.lat,
              longitude: details?.geometry.location.lng,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            };
            setDestination(chosenDestination);
          }}
          query={{
            key: config.googleApi,
            language: "en",
          }}
          fetchDetails={true}
          styles={{
            listView: { height: 100 },
          }}
        />
      </View>
      <MapView
        ref={mapRef}
        showsMyLocationButton={true}
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
        {destination && (
          <MapViewDirections
            origin={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            destination={{
              latitude: destination.latitude!,
              longitude: destination.longitude!,
            }}
            apikey={config.googleApi}
            strokeWidth={3}
            onReady={(result) => {
              mapRef.current?.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  top: 50,
                  bottom: 50,
                  left: 50,
                  right: 50,
                },
              });
            }}
          />
        )}
        <CarMarker location={location} pngCarDirection={pngCarDirection} />
      </MapView>
      {destination && (
        <Button
          title={t("clearDestination")}
          onPressFunction={clearDestination}
        />
      )}

      <View style={{ marginTop: 12 , width: '100%'}}>
        <Text style={styles.title}>{t("titleInstructions")}</Text>
        <Text style={styles.instructions}>{t("bannerInstructions")}</Text>
      </View>
    </View>
  );
}
