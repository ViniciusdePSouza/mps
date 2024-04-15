import { TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";

interface ButtonProps {
  title: string;
  onPressFunction: (language: string) => void;
  language: string;
  isActive?: boolean;
}

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
