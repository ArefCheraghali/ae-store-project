import { useContext } from "react";
import {
  Box,
  Container,
  Grid,
  Link,
  Typography,
  IconButton,
} from "@mui/material";
import { LanguageContext } from "@/pages/_app";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
  const { lang } = useContext(LanguageContext);

  const links = [
    { key: "about", fa: "درباره ما", en: "About Us" },
    { key: "privacy", fa: "حریم خصوصی", en: "Privacy Policy" },
    { key: "terms", fa: "شرایط استفاده", en: "Terms of Service" },
  ];

  const copyText =
    lang === "fa"
      ? "© ۲۰۲۵ آکالا. همه حقوق محفوظ است."
      : "© 2025 AKALA. All rights reserved.";

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        borderTop: 1,
        borderColor: "divider",
        py: 2,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
          justifyContent="space-between"
          alignItems="center"
          sx={{
            flexDirection: { xs: "column", sm: "row" },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Grid>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "center", sm: "flex-start" },
              }}
            >
              {links.map((link) => (
                <Link
                  key={link.key}
                  href="#"
                  underline="hover"
                  color="text.secondary"
                  sx={{
                    fontWeight: 500,
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {lang === "fa" ? link.fa : link.en}
                </Link>
              ))}
            </Box>
          </Grid>
          <Grid>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton color="inherit" size="small">
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton color="inherit" size="small">
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton color="inherit" size="small">
                <InstagramIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 3,
            textAlign: "center",
            fontSize: "0.85rem",
          }}
        >
          {copyText}
        </Typography>
      </Container>
    </Box>
  );
}
