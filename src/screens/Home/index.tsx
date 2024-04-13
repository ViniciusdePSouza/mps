import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";

import "../../utils/languages/i18n";

import { useTranslation } from "react-i18next";
import { Map } from "../../components/Map";
import { useEffect, useState } from "react";
import {
  getCurrentPosition,
  requestLocationPermition,
} from "../../utils/location";
import { LocationObject } from "expo-location";

export function Home() {
  const [granted, setGranted] = useState(false);
  const [location, setLocation] = useState<LocationObject | null>(null);
  const { t, i18n } = useTranslation();

  function changeLanguage(value: string) {
    i18n.changeLanguage(value);
  }

  async function defineLocation() {
    const currentPosition = await getCurrentPosition();
    console.log("LOCATION ==>", currentPosition);
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

  return (
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
          <TouchableOpacity onPress={() => changeLanguage("en")}>
            <Text>English</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text onPress={() => changeLanguage("pt")}>Português</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ marginTop: 20 }}>{t("traslationText")}</Text>
        <Map />
      </View>
    </SafeAreaView>
  );
}
