import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import DrawerMenu from "../DrawerMenu/DrawerMenu";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./MenuAppBar.css";
import { getUsername } from "../../utils/getUsername";
import { TitleContext } from "../../context/TitleContext";

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { logout } = useLogout();
  const { state } = useAuthContext();

  const contextTitle = React.useContext(TitleContext);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      style={{ background: "#090b0c91", width: "104vw" }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <DrawerMenu />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {contextTitle?.title}
        </Typography>
        <div className="user-button">
          {state.user && <div>{getUsername(state.user.email)}</div>}
          <IconButton
            size={state.user ? "small" : "large"}
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            {!state.user && <AccountCircle />}
            {state.user && <ArrowDropDownIcon />}
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              sx: {
                background: "#0d252e",
                color: "#FFFFFF",
                marginTop: "25px",
              },
            }}
          >
            {!state.user && (
              <MenuItem onClick={handleClose}>
                <Link to="/login">Login</Link>
              </MenuItem>
            )}
            {!state.user && (
              <MenuItem onClick={handleClose}>
                <Link to="/signup">Signup</Link>
              </MenuItem>
            )}
            {state.user && (
              <MenuItem onClick={handleClose}>
                <Link to="/" onClick={handleLogout}>
                  Logout
                </Link>
              </MenuItem>
            )}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}
