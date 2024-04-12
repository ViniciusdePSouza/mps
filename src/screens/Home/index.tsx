import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";

import "../../utils/languages/i18n";

import { useTranslation } from "react-i18next";

export function Home() {
  const { t, i18n } = useTranslation();

  function changeLanguage(value: string) {
    i18n.changeLanguage(value);
  }

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
      </View>
    </SafeAreaView>
  );
}
