import { OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { getLocation } from "../../utils/getPosition";
import { useSnackBar } from "../../context/SnackbarContext";
import { getCityName } from "../../utils/getCityName";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: "50px",
          paddingRight: "12px",
          backgroundColor: "#eee",
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              border: "3px solid #045db6",
            },
          },
        },
      },
    },
  },
});

interface SearchCityInputProps {
  value: string;
  onChangeValue: (cityName: string) => void;
}

export const SearchCityInput = (props: SearchCityInputProps): JSX.Element => {
  const { showSnackBar } = useSnackBar();

  const handleClickGPS = async (): Promise<void> => {
    const position = await getLocation(showSnackBar);

    if (position) {
      const cityName = await getCityName(position?.coords, showSnackBar);
      props.onChangeValue(cityName ?? "");
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    props.onChangeValue(e.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="city-name__textfield">
        <OutlinedInput
          id="city-name"
          type={"text"}
          sx={{ width: "100%" }}
          value={props.value}
          onChange={changeHandler}
          placeholder="Search for city"
          required
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="find position"
                onClick={handleClickGPS}
                edge="end"
              >
                <GpsFixedIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </div>
    </ThemeProvider>
  );
};
