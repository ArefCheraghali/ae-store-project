import { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Box,
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import data from "@/data/data.json";
import { Store, Category } from "@/types";

export default function HomePage() {
  const [stores] = useState<Store[]>(data.stores);
  const [categories] = useState<Category[]>(data.categories);

  const getCategoryName = (id: number) => {
    const category = categories.find((c) => c.id === id);
    return category ? category.name_fa : "نامشخص";
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold", textAlign: "center", mb: 4 }}
      >
        فروشگاه‌ها
      </Typography>

      <Grid container spacing={3}>
        {stores.map((store) => (
          <Grid
            item
            key={store.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            sx={{ display: "flex" }}
          >
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
                <Box sx={{ mb: 1 }}>
                  <Chip
                    label={getCategoryName(store.category_id)}
                    color="primary"
                    size="small"
                  />
                </Box>
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
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
