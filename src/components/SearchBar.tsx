import { useContext } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { LanguageContext } from "@/pages/_app";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const { lang } = useContext(LanguageContext);

  return (
    <Box>
      <Typography sx={{ mb: 0.5 }}>
        {lang === "fa"
          ? "جست‌وجو بر اساس نام فروشگاه:"
          : "Search by store name:"}
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        value={value}
        placeholder={lang === "fa" ? "نام فروشگاه..." : "Store name..."}
        onChange={(e) => onChange(e.target.value)}
        InputProps={{
          endAdornment: value && (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() => onChange("")}
                edge="end"
                aria-label={lang === "fa" ? "پاک کردن جستجو" : "Clear search"}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
