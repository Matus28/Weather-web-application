import { AlertColor } from "@mui/material";

export const getPosition = (
  options?: PositionOptions
): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  );
};

export const getLocation = async (
  showSnackBar: (text: string, typeColor: AlertColor) => void
): Promise<GeolocationPosition | undefined> => {
  try {
    const position = await getPosition();
    return position;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      showSnackBar("Position could not be found!", "error");
    }
  }
};
