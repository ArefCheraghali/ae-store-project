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
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ColorModeContext, LanguageContext } from "@/pages/_app";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function Navbar() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const { lang, toggleLanguage, t } = useContext(LanguageContext);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isDark = theme.palette.mode === "dark";

  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

  // Keep nav items static in structure
  const navItems = [
    { key: "home", fa: "صفحه اصلی", en: "Home" },
    { key: "categories", fa: "دسته‌بندی‌ها", en: "Categories" },
    { key: "contact", fa: "تماس با ما", en: "Contact Us" },
  ];

  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.key} disablePadding>
            <ListItemButton>
              <ListItemText
                primary={lang === "fa" ? item.fa : item.en}
                sx={{ textAlign: lang === "fa" ? "right" : "left" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ direction: "ltr" }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Left controls: language + theme */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Modern language toggle */}
            <ToggleButtonGroup
              value={lang}
              exclusive
              onChange={() => toggleLanguage()}
              size="small"
              sx={{
                bgcolor: "background.paper",
                borderRadius: 5,
                overflow: "hidden",
                "& .MuiToggleButton-root": {
                  px: 1.5,
                  py: 0.5,
                  fontWeight: "bold",
                  fontSize: "0.75rem",
                  "&.Mui-selected": {
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                  },
                },
              }}
            >
              <ToggleButton value="fa">FA</ToggleButton>
              <ToggleButton value="en">EN</ToggleButton>
            </ToggleButtonGroup>

            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              {isDark ? (
                <Brightness4Icon fontSize="small" />
              ) : (
                <Brightness7Icon fontSize="small" />
              )}
              <Switch
                checked={isDark}
                onChange={colorMode.toggleColorMode}
                color="default"
                inputProps={{ "aria-label": "toggle light/dark mode" }}
              />
            </Box>
          </Box>

          {/* Center: title */}
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            AE Store
          </Typography>

          {/* Right: nav or menu */}
          {isMobile ? (
            <IconButton color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box>
              {navItems.map((item) => (
                <Button key={item.key} color="inherit" sx={{ m: 1 }}>
                  {lang === "fa" ? item.fa : item.en}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor={lang === "fa" ? "left" : "right"}
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{ direction: lang === "fa" ? "ltr" : "rtl" }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
