import { useContext } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Rating,
  Stack,
} from "@mui/material";
import { Store } from "@/types";
import { LanguageContext } from "@/pages/_app";

interface StoreCardProps {
  store: Store;
  categoryName: string;
}

export default function StoreCard({ store, categoryName }: StoreCardProps) {
  const { lang } = useContext(LanguageContext);

  return (
    <Card
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        boxShadow: 3,
        borderRadius: 2,
        transition: "transform 0.2s ease",
        "&:hover": { transform: "scale(1.02)" },
      }}
    >
      <CardMedia
        component="img"
        loading="eager"
        height="180"
        image={store.imageUrl}
        alt={lang === "fa" ? store.name : store.name_en}
        sx={{ objectFit: "cover" }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {lang === "fa" ? store.name : store.name_en}
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 1 }}
        >
          <Chip label={categoryName} color="primary" size="small" />
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            sx={{ direction: lang === "fa" ? "rtl" : "ltr" }}
          >
            <Rating
              name={`rating-${store.id}`}
              value={store.rating}
              precision={0.1}
              readOnly
              size="small"
              sx={{ direction: "ltr" }}
            />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: 500, position: "relative", top: "2px" }}
              dir="ltr"
            >
              {store.rating.toLocaleString("en-US", {
                minimumFractionDigits: 1,
              })}
            </Typography>
          </Stack>
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {lang === "fa" ? store.description : store.description_en}
        </Typography>
      </CardContent>
    </Card>
  );
}
