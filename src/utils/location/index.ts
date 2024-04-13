import {
  LocationAccuracy,
  LocationObject,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
  watchPositionAsync,
} from "expo-location";

export async function requestLocationPermition() {
  const { granted } = await requestForegroundPermissionsAsync();

  return granted;
}

export async function getCurrentPosition() {
  const currentPosition = await getCurrentPositionAsync();

  return currentPosition;
}

export async function watchPosition() {
  watchPositionAsync(
    {
      accuracy: LocationAccuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 1,
    },
    (response) => response
  );
}
