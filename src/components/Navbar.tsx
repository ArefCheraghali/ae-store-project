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
  const { lang, toggleLanguage } = useContext(LanguageContext);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isDark = theme.palette.mode === "dark";

  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

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
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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

          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {lang === "fa" ? "آکالا" : "AKALA"}
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
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { direction: "ltr" },
        }}
        SlideProps={{
          direction: "right",
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
