import React, { useContext } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Stack,
} from "@mui/material";
import { LanguageContext } from "@/pages/_app";

type Product = {
  id: string;
  name: string;
  name_en: string;
  price: number;
  rating: number;
  sales_count: number;
  imageUrl: string;
};

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { lang } = useContext(LanguageContext);
  const isFA = lang === "fa";

  const formatNumber = (num: number) =>
    new Intl.NumberFormat(isFA ? "fa-IR" : "en-US").format(num);

  return (
    <Card
      sx={{
        maxWidth: 280,
        borderRadius: 2,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s ease",
        "&:hover": { transform: "scale(1.04)" },
        height: "100%",
      }}
    >
      <CardMedia
        component="img"
        loading="lazy"
        height="200"
        image={product.imageUrl}
        alt={isFA ? product.name : product.name_en}
        sx={{ objectFit: "contain", p: 1 }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            fontWeight: 600,
            minHeight: "3em",
          }}
          align={isFA ? "right" : "left"}
        >
          {isFA ? product.name : product.name_en}
        </Typography>

        <Stack
          direction={isFA ? "row-reverse" : "row"}
          alignItems="center"
          spacing={1}
          sx={{ mb: 1 }}
        >
          <Rating
            value={product.rating}
            precision={0.1}
            readOnly
            size="small"
            sx={{ direction: "ltr" }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            dir="ltr"
            sx={{ fontWeight: 500, position: "relative", top: "2px" }}
          >
            {formatNumber(product.rating)}
          </Typography>
        </Stack>

        <Typography
          variant="h6"
          color="primary"
          sx={{ fontWeight: 700 }}
          align={isFA ? "right" : "left"}
        >
          {formatNumber(product.price)} {isFA ? "تومان" : "Toman"}
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          align={isFA ? "right" : "left"}
        >
          {isFA
            ? `${formatNumber(product.sales_count)} فروش`
            : `${formatNumber(product.sales_count)} sold`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
