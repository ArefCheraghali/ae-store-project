import { Box, MenuItem, TextField, Typography } from "@mui/material";
import { Category } from "@/types";

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
  return (
    <Box>
      <Typography>فیلتر بر اساس دسته‌بندی:</Typography>
      <TextField
        select
        fullWidth
        // label="فیلتر بر اساس دسته‌بندی"
        value={selected}
        onChange={(e) => {
          const val = e.target.value;
          onChange(val === "" ? "" : Number(val));
        }}
        sx={{ mb: 2 }}
      >
        <MenuItem value="">همه دسته‌بندی‌ها</MenuItem>
        {categories.map((cat) => (
          <MenuItem key={cat.id} value={cat.id}>
            {cat.name_fa}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
