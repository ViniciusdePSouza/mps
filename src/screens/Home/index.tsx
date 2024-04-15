import {
  Keyboard,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { styles } from "../styles";

import "../../utils/languages/i18n";

import { useTranslation } from "react-i18next";
import { Map } from "../../components/Map";
import { useEffect, useState } from "react";
import {
  getCurrentPosition,
  requestLocationPermition,
} from "../../utils/location";
import {
  LocationAccuracy,
  LocationObject,
  watchPositionAsync,
} from "expo-location";

import { Button } from "../../components/Button";

export function Home() {
  const [granted, setGranted] = useState(false);
  const [location, setLocation] = useState<LocationObject | null>(null);
  const { t, i18n } = useTranslation();

  function changeLanguage(value: string) {
    i18n.changeLanguage(value);
  }

  async function defineLocation() {
    const currentPosition = await getCurrentPosition();
    setLocation(currentPosition);
  }

  async function getPermissions() {
    const permission = await requestLocationPermition();
    setGranted(permission);
  }

  useEffect(() => {
    getPermissions();

    if (granted) {
      defineLocation();
    }
  }, [granted]);

  useEffect(() => {
    watchPositionAsync(
      {
        accuracy: LocationAccuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (response) => {
        setLocation(response);
      }
    );
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View
            style={{
              width: "100%",
              alignContent: "center",
              gap: 10,
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Button
              title={"English"}
              onPressFunction={changeLanguage}
              language={"en"}
            />
            <Button
              title={"Português"}
              onPressFunction={changeLanguage}
              language={"pt"}
            />
          </View>
          <Text style={styles.title}>{t("titleText")}</Text>

          {location && <Map location={location} />}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
