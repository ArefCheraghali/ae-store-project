import { Grid, Card, CardContent, Skeleton } from "@mui/material";
import StoreCard from "./StoreCard";
import { Store, Category } from "@/types";

export default function StoreGrid({
  stores,
  categories,
  isLoading,
}: {
  stores: Store[];
  categories: Category[];
  isLoading: boolean;
}) {
  const getCategoryName = (id: number) => {
    const category = categories.find((c) => c.id === id);
    return category ? category.name_fa : "نامشخص";
  };

  return (
    <Grid container spacing={3}>
      {isLoading
        ? Array.from(new Array(8)).map((_, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Skeleton variant="rectangular" height={180} />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Skeleton width="60%" />
                  <Skeleton width="40%" />
                  <Skeleton width="80%" />
                </CardContent>
              </Card>
            </Grid>
          ))
        : stores.map((store) => (
            <Grid
              key={store.id}
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
              sx={{ display: "flex" }}
            >
              <StoreCard
                store={store}
                categoryName={getCategoryName(store.category_id)}
              />
            </Grid>
          ))}
    </Grid>
  );
}
