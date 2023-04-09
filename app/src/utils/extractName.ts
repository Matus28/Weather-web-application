import { City } from "./types";

export const extractName = (data?: City[]): string[] => {
  const result = data && data.map((city: City) => city.cityName);

  return result ?? [];
};
