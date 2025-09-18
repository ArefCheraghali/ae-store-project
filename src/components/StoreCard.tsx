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

interface StoreCardProps {
  store: Store;
  categoryName: string;
}

export default function StoreCard({ store, categoryName }: StoreCardProps) {
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
        alt={store.name}
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
          {store.name}
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 1 }}
        >
          <Chip label={categoryName} color="primary" size="small" />
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Rating
              name={`rating-${store.id}`}
              value={store.rating}
              precision={0.1}
              readOnly
              size="small"
            />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: 500 }}
            >
              {store.rating.toFixed(1)}
            </Typography>
          </Stack>
        </Stack>

        {/* Description */}
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
          {store.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
