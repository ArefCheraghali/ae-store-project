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

  const filteredStores = useMemo(() => {
    if (!stores.length) return [];
    const term = debouncedSearchTerm.trim().toLowerCase();
    return stores.filter((store) => {
      const nameToSearch = lang === "fa" ? store.name : store.name_en;
      const matchesSearch = term
        ? nameToSearch.toLowerCase().includes(term)
        : true;
      const matchesCategory = selectedCategory
        ? store.category_id === selectedCategory
        : true;
      return matchesSearch && matchesCategory;
    });
  }, [stores, debouncedSearchTerm, selectedCategory, lang]);

  const sortedStores = useMemo(() => {
    const arr = [...filteredStores];
    arr.sort((a, b) => {
      const nameA = lang === "fa" ? a.name : a.name_en;
      const nameB = lang === "fa" ? b.name : b.name_en;

      switch (sortOption) {
        case "name-asc":
          return nameA.localeCompare(nameB, lang === "fa" ? "fa" : "en");
        case "name-desc":
          return nameB.localeCompare(nameA, lang === "fa" ? "fa" : "en");
        case "rating-desc":
          return b.rating - a.rating;
        case "rating-asc":
          return a.rating - b.rating;
        default:
          return 0;
      }
    });
    return arr;
  }, [filteredStores, sortOption, lang]);

  const pageCount = useMemo(() => {
    const count = Math.ceil(sortedStores.length / itemsPerPage);
    return Math.max(1, count);
  }, [sortedStores.length, itemsPerPage]);

  const paginatedStores = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    return sortedStores.slice(start, end);
  }, [sortedStores, page, itemsPerPage]);

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
