import { useState, useEffect, useMemo, useContext } from "react";
import { useDebounce } from "use-debounce";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Pagination,
  Box,
  Button,
} from "@mui/material";
import StoreGrid from "@/components/StoreGrid";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import SortSelect from "@/components/SortSelect";
import data from "@/data/data.json";
import { getProcessedStores } from "@/utils/storeUtils";
import { Store, Category } from "@/types";
import { LanguageContext } from "@/pages/_app";

export default function HomePage() {
  const { lang, t } = useContext(LanguageContext);
  const itemsPerPage = 8;

  const [stores, setStores] = useState<Store[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [selectedCategory, setSelectedCategory] = useState<number | "">("");
  const [sortOption, setSortOption] = useState("name-asc");
  const [page, setPage] = useState(1);
  const [displayedStores, setDisplayedStores] = useState<Store[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setStores(data.stores);
      setCategories(data.categories);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const processedStores = useMemo(() => {
    if (!stores.length) return [];
    return getProcessedStores({
      stores,
      searchTerm: debouncedSearchTerm,
      category: selectedCategory,
      sortOption,
      lang,
    });
  }, [stores, debouncedSearchTerm, selectedCategory, sortOption, lang]);

  const pageCount = useMemo(() => {
    const count = Math.ceil(processedStores.length / itemsPerPage);
    return Math.max(1, count);
  }, [processedStores.length, itemsPerPage]);

  const paginatedStores = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    return processedStores.slice(start, end);
  }, [processedStores, page, itemsPerPage]);

  useEffect(() => {
    if (!stores.length) return;
    setIsLoading(true);
    const timer = setTimeout(() => {
      setDisplayedStores(paginatedStores);
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [stores.length, paginatedStores]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm, selectedCategory, sortOption, lang]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSortOption("name-asc");
    setPage(1);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold", textAlign: "center", mb: 4 }}
      >
        {t("stores")}
      </Typography>

      <Paper elevation={3} sx={{ p: 2, mb: 4, borderRadius: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 3 }}>
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <CategoryFilter
              categories={categories}
              selected={selectedCategory}
              onChange={setSelectedCategory}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <SortSelect value={sortOption} onChange={setSortOption} />
          </Grid>
          <Grid
            size={{ xs: 12, md: 3 }}
            sx={{
              mt: 5.5,
              display: "flex",
              justifyContent: { xs: "flex-start", md: "flex-end" },
              alignItems: "flex-end",
            }}
          >
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleResetFilters}
              fullWidth={lang === "fa" || true} // full width on mobile
            >
              {lang === "fa" ? "بازنشانی" : "Reset"}
            </Button>
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
