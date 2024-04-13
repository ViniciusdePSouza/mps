import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";

export async function requestLocationPermition() {
  const { granted } = await requestForegroundPermissionsAsync();

  return granted;
}

export async function getCurrentPosition() {
  const currentPosition = await getCurrentPositionAsync();

  return currentPosition;
}
