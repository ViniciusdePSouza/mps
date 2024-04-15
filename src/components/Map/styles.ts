import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 600,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },

  map: {
    flex: 1,
    width: "100%",
    borderRadius: 8,
    marginBottom: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold"
  },

  instructions: {
    fontSize: 16,
    fontWeight: "normal",
    color: '#b7bbc0'
  }
});
