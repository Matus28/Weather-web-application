import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

interface Page {
  text: string;
  path: string;
  isPrivate: boolean;
}

const pages: Page[] = [
  {
    text: "Home",
    path: "/",
    isPrivate: false,
  },
  {
    text: "Cities",
    path: "/cities",
    isPrivate: true,
  },
];

export default function DrawerMenu(props: { isAuthenticated: boolean }) {
  const [state, setState] = React.useState(false);

  const pagesToRender = pages.filter(
    (page: Page) => !page.isPrivate || (page.isPrivate && props.isAuthenticated)
  );

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState(open);
    };
  const list = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {pagesToRender.map((page: Page, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => setState(false)}>
              <ListItemIcon>
                <FiberManualRecordIcon style={{ color: "#FFFFFF" }} />
              </ListItemIcon>
              <Link to={page.path}>{page.text}</Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="drawer-menu">
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon style={{ color: "#FFFFFF" }} />
      </Button>
      <Drawer
        anchor={"left"}
        open={state}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            background: "#0d252e",
            width: "220px",
            color: "#FFFFFF",
            height: "200px",
            top: "60px",
          },
        }}
      >
        {list()}
      </Drawer>
    </div>
  );
}
