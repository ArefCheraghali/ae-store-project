import { useContext } from "react";
import { Box, MenuItem, TextField, Typography } from "@mui/material";
import { Category } from "@/types";
import { LanguageContext } from "@/pages/_app";

interface CategoryFilterProps {
  categories: Category[];
  selected: number | "";
  onChange: (value: number | "") => void;
}

export default function CategoryFilter({
  categories,
  selected,
  onChange,
}: CategoryFilterProps) {
  const { lang } = useContext(LanguageContext);

  return (
    <Box>
      <Typography sx={{ mb: 0.5 }}>
        {lang === "fa" ? "فیلتر بر اساس دسته‌بندی:" : "Filter by category:"}
      </Typography>
      <TextField
        select
        fullWidth
        value={selected}
        onChange={(e) => {
          const val = e.target.value;
          onChange(val === "" ? "" : Number(val));
        }}
        SelectProps={{
          MenuProps: { disableScrollLock: true },
          sx: {
            pr: 2,
          },
        }}
      >
        <MenuItem value="">
          {lang === "fa" ? "همه دسته‌بندی‌ها" : "All categories"}
        </MenuItem>
        {categories.map((cat) => (
          <MenuItem key={cat.id} value={cat.id}>
            {lang === "fa" ? cat.name_fa : cat.name_en}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
