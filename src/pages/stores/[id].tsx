// pages/store/[id].tsx

import { useRouter } from "next/router";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Rating,
  Chip,
  Button,
  Stack,
  Skeleton,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import data from "@/data/data.json";
import { LanguageContext } from "@/pages/_app";
import ProductCard from "@/components/ProductCard";
import { Store, Product } from "@/types";

export default function StorePage() {
  const router = useRouter();
  const { id } = router.query;
  const { lang } = useContext(LanguageContext);
  const isFA = lang === "fa";

  const [isLoading, setIsLoading] = useState(true);
  const [storeData, setStoreData] = useState<Store | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    const timer = setTimeout(() => {
      const store = data.stores.find((s) => s.id === id) || null;
      const storeProducts = data.products.filter((p) => p.store_id === id);
      setStoreData(store);
      setProducts(storeProducts);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [id]);

  const formatNumber = (num: number) =>
    new Intl.NumberFormat(isFA ? "fa-IR" : "en-US", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(num);

  if (!storeData && !isLoading) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h6">
          {isFA ? "فروشگاه یافت نشد" : "Store not found"}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
          onClick={() => router.push("/")}
        >
          {isFA ? "بازگشت" : "Back"}
        </Button>
      </Container>
    );
  }

  const category = data.categories.find((c) => c.id === storeData?.category_id);

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4} alignItems="flex-start">
        <Grid size={{ xs: 12, md: 6 }}>
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              height={300}
              sx={{ borderRadius: 2 }}
            />
          ) : (
            <Box
              component="img"
              src={storeData!.imageUrl}
              alt={isFA ? storeData!.name : storeData!.name_en}
              sx={{
                width: "100%",
                borderRadius: 2,
                objectFit: "cover",
                boxShadow: 3,
              }}
            />
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={2}>
            {isLoading ? (
              <>
                <Skeleton variant="text" width="60%" height={40} />
                <Skeleton variant="rounded" width={100} height={32} />
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="90%" />
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="50%" />
              </>
            ) : (
              <>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  align={isFA ? "right" : "left"}
                >
                  {isFA ? storeData!.name : storeData!.name_en}
                </Typography>

                <Chip
                  label={isFA ? category?.name_fa : category?.name_en}
                  color="primary"
                  sx={{ fontWeight: "bold", alignSelf: "flex-start" }}
                />

                <Stack direction="row" alignItems="center" spacing={1}>
                  <Rating
                    value={storeData!.rating}
                    precision={0.1}
                    readOnly
                    sx={{ direction: "ltr" }}
                  />
                  <Typography variant="body2" color="text.secondary" dir="ltr">
                    {formatNumber(storeData!.rating)}
                  </Typography>
                </Stack>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  align={isFA ? "right" : "left"}
                >
                  {isFA ? storeData!.description : storeData!.description_en}
                </Typography>

                <Typography variant="body2" align={isFA ? "right" : "left"}>
                  <strong>{isFA ? "آدرس:" : "Address:"}</strong>{" "}
                  {isFA ? storeData!.address : storeData!.address_en}
                </Typography>

                <Typography variant="body2" align={isFA ? "right" : "left"}>
                  <strong>{isFA ? "تلفن:" : "Phone:"}</strong>{" "}
                  {storeData!.phone}
                </Typography>

                <Button
                  variant="outlined"
                  startIcon={<ArrowBackIcon />}
                  component={Link}
                  href="/"
                  sx={{ mt: 2, alignSelf: "flex-start" }}
                >
                  {isFA ? "بازگشت به فروشگاه‌ها" : "Back to Stores"}
                </Button>
              </>
            )}
          </Stack>
        </Grid>
      </Grid>

      {/* Products Section */}
      <Box sx={{ mt: 6 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ mb: 3 }}
          align={isFA ? "right" : "left"}
        >
          {isFA ? "محصولات" : "Products"}
        </Typography>

        <Grid container spacing={3}>
          {isLoading
            ? Array.from({ length: 8 }).map((_, idx) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={idx}>
                  <Skeleton
                    variant="rectangular"
                    height={200}
                    sx={{ borderRadius: 2 }}
                  />
                  <Skeleton variant="text" width="80%" sx={{ mt: 1 }} />
                  <Skeleton variant="text" width="60%" />
                </Grid>
              ))
            : products.map((product) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
        </Grid>
      </Box>
    </Container>
  );
}
