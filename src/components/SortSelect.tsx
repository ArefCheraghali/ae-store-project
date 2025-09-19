import { useContext } from "react";
import { TextField, MenuItem, Box, Typography } from "@mui/material";
import { LanguageContext } from "@/pages/_app";

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SortSelect({ value, onChange }: SortSelectProps) {
  const { lang } = useContext(LanguageContext);

  return (
    <Box>
      <Typography sx={{ mb: 0.5 }}>
        {lang === "fa" ? "مرتب‌سازی:" : "Sort by:"}
      </Typography>
      {lang === "fa" ? (
        <TextField
          select
          fullWidth
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <MenuItem value="name-asc">نام (الف تا ی)</MenuItem>
          <MenuItem value="name-desc">نام (ی تا الف)</MenuItem>
          <MenuItem value="rating-desc">بالاترین امتیاز</MenuItem>
          <MenuItem value="rating-asc">پایین‌ترین امتیاز</MenuItem>
        </TextField>
      ) : (
        <TextField
          select
          fullWidth
          value={value}
          onChange={(e) => onChange(e.target.value)}
          SelectProps={{
            MenuProps: { disableScrollLock: true },
            sx: {
              pr: 2,
            },
          }}
        >
          <MenuItem value="name-asc">Name (A to Z)</MenuItem>
          <MenuItem value="name-desc">Name (Z to A)</MenuItem>
          <MenuItem value="rating-desc">Highest rating</MenuItem>
          <MenuItem value="rating-asc">Lowest rating</MenuItem>
        </TextField>
      )}
    </Box>
  );
}
