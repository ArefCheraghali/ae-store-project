import { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  Switch,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ColorModeContext } from "@/pages/_app";

const navItems = ["صفحه اصلی", "دسته‌بندی‌ها", "تماس با ما"];

export default function Navbar() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isDark = theme.palette.mode === "dark";

  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {navItems.map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} sx={{ textAlign: "right" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Left: menu or nav items */}
          {isMobile ? (
            <IconButton color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box>
              {navItems.map((item) => (
                <Button key={item} color="inherit" sx={{ m: 1 }}>
                  {item}
                </Button>
              ))}
            </Box>
          )}

          {/* Center: title */}
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            AE Store
          </Typography>

          {/* Right: theme switch */}
          <Switch
            checked={isDark}
            onChange={colorMode.toggleColorMode}
            color="default"
            inputProps={{ "aria-label": "toggle light/dark mode" }}
          />
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{ direction: "rtl" }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
