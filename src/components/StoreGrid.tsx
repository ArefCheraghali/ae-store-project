import { useContext } from "react";
import { Grid, Card, CardContent, Skeleton } from "@mui/material";
import StoreCard from "./StoreCard";
import { Store, Category } from "@/types";
import { LanguageContext } from "@/pages/_app";

export default function StoreGrid({
  stores,
  categories,
  isLoading,
}: {
  stores: Store[];
  categories: Category[];
  isLoading: boolean;
}) {
  const { lang } = useContext(LanguageContext);

  const getCategoryName = (id: number) => {
    const category = categories.find((c) => c.id === id);
    if (!category) return lang === "fa" ? "نامشخص" : "Unknown";
    return lang === "fa" ? category.name_fa : category.name_en;
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
