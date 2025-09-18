import { TextField, MenuItem, Box, Typography } from "@mui/material";

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <Box>
      <Typography>مرتب سازی:</Typography>
      <TextField
        select
        fullWidth
        //   label="مرتب‌سازی"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <MenuItem value="name-asc">نام (الف تا ی)</MenuItem>
        <MenuItem value="name-desc">نام (ی تا الف)</MenuItem>
        <MenuItem value="rating-desc">بالاترین امتیاز</MenuItem>
        <MenuItem value="rating-asc">پایین‌ترین امتیاز</MenuItem>
      </TextField>
    </Box>
  );
}
