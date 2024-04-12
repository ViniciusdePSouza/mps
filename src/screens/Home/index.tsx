import { SafeAreaView, Text, View } from "react-native";
import { styles } from "../styles";

export function Home() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>Home component works</Text>
      </View>
    </SafeAreaView>
  );
}
