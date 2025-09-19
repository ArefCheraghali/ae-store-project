import { useState, useEffect, useMemo } from "react";
import { useDebounce } from "use-debounce";
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
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const [selectedCategory, setSelectedCategory] = useState<number | "">("");
  const [sortOption, setSortOption] = useState("name-asc");
  const [page, setPage] = useState(1);

  // What we actually render (lets us show skeletons for every change)
  const [displayedStores, setDisplayedStores] = useState<Store[]>([]);

  // Initial load (simulated)
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setStores(data.stores);
      setCategories(data.categories);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // 1) Filter
  const filteredStores = useMemo(() => {
    if (!stores.length) return [];
    const term = debouncedSearchTerm.trim().toLowerCase();
    return stores.filter((store) => {
      const matchesSearch = term
        ? store.name.toLowerCase().includes(term)
        : true;
      const matchesCategory = selectedCategory
        ? store.category_id === selectedCategory
        : true;
      return matchesSearch && matchesCategory;
    });
  }, [stores, debouncedSearchTerm, selectedCategory]);

  // 2) Sort
  const sortedStores = useMemo(() => {
    const arr = [...filteredStores];
    arr.sort((a, b) => {
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
    return arr;
  }, [filteredStores, sortOption]);

  // 3) Pagination meta
  const pageCount = useMemo(() => {
    const count = Math.ceil(sortedStores.length / itemsPerPage);
    return Math.max(1, count);
  }, [sortedStores.length, itemsPerPage]);

  // 4) Page slice (pure)
  const paginatedStores = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    return sortedStores.slice(start, end);
  }, [sortedStores, page, itemsPerPage]);

  // Simulate API latency for every interaction (search/filter/sort/page)
  useEffect(() => {
    if (!stores.length) return; // wait for initial load
    setIsLoading(true);
    const timer = setTimeout(() => {
      setDisplayedStores(paginatedStores);
      setIsLoading(false);
    }, 300); // tweak 300–700ms for best feel
    return () => clearTimeout(timer);
  }, [stores.length, paginatedStores]);

  // Reset to page 1 on filter/sort changes (use debounced term for consistency)
  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm, selectedCategory, sortOption]);

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
