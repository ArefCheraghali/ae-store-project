import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Pagination,
  Box,
} from "@mui/material";
import StoreGrid from "@/components/StoreGrid";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import SortSelect from "@/components/SortSelect";
import data from "@/data/data.json";
import { Store, Category } from "@/types";

export default function HomePage() {
  const itemsPerPage = 8;

  const [stores, setStores] = useState<Store[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | "">("");
  const [sortOption, setSortOption] = useState("name-asc");
  const [page, setPage] = useState(1);
  const [displayedStores, setDisplayedStores] = useState<Store[]>([]);

  // Initial load
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setStores(data.stores);
      setCategories(data.categories);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!stores.length) return;
    setIsLoading(true);
    const timer = setTimeout(() => {
      const filtered = stores.filter((store) => {
        const matchesSearch = store.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory
          ? store.category_id === selectedCategory
          : true;
        return matchesSearch && matchesCategory;
      });

      const sorted = [...filtered].sort((a, b) => {
        switch (sortOption) {
          case "name-asc":
            return a.name.localeCompare(b.name, "fa");
          case "name-desc":
            return b.name.localeCompare(a.name, "fa");
          case "rating-desc":
            return b.rating - a.rating;
          case "rating-asc":
            return a.rating - b.rating;
          default:
            return 0;
        }
      });

      const paginated = sorted.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
      );

      setDisplayedStores(paginated);
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [stores, searchTerm, selectedCategory, sortOption, page]);

  const pageCount = Math.ceil(
    stores.filter((store) => {
      const matchesSearch = store.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory
        ? store.category_id === selectedCategory
        : true;
      return matchesSearch && matchesCategory;
    }).length / itemsPerPage
  );

  useEffect(() => {
    setPage(1);
  }, [searchTerm, selectedCategory, sortOption]);

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

      <Paper elevation={3} sx={{ p: 2, mb: 4, borderRadius: 2 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CategoryFilter
              categories={categories}
              selected={selectedCategory}
              onChange={setSelectedCategory}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <SortSelect value={sortOption} onChange={setSortOption} />
          </Grid>
        </Grid>
      </Paper>
      <StoreGrid
        stores={displayedStores}
        categories={categories}
        isLoading={isLoading}
      />
      {!isLoading && pageCount > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}
    </Container>
  );
}
