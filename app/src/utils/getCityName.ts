import { AlertColor } from "@mui/material";

export const getCityName = async (
  coords: GeolocationCoordinates,
  showSnackBar: (text: string, typeColor: AlertColor) => void
): Promise<string | undefined> => {
  const URL = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=en`;

  try {
    const result = await fetch(URL);
    const cityName = await result.json();
    return cityName.city;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      showSnackBar("City could not be found!", "error");
    }
  }
};
