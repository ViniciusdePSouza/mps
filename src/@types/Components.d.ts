import { LocationObject } from "expo-location";
import { DirectionsType } from "./DirectionsType";

export interface ButtonProps {
  title: string;
  onPressFunction: (language: string) => void;
  language: string;
  isActive?: boolean;
}

export interface CarMarkerProps {
  location: LocationObject;
  pngCarDirection: DirectionsType;
}

export interface MapProps {
  location: LocationObject;
}
