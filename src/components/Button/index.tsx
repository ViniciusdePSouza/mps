import { TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";
import { ButtonProps } from "../../@types";

export function Button({ title, onPressFunction, language }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={() => onPressFunction(language)}
      style={styles.buttonInactive}
    >
      <Text style={styles.titleInactive}>{title}</Text>
    </TouchableOpacity>
  );
}
