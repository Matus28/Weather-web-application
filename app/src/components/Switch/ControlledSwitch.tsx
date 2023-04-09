import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import Switch from "@mui/material/Switch";

const RedSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: pink[600],
    "&:hover": {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: pink[600],
  },
}));

export const ControlledSwitch = (props: {
  isChecked: boolean;
  onCheck: (value: boolean) => void;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onCheck(event.target.checked);
  };

  return (
    <RedSwitch
      checked={props.isChecked ?? false}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
};
