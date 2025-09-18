import {
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <Box>
      <Typography>جست و جو بر اساس نام فروشگاه:</Typography>
      <TextField
        fullWidth
        variant="outlined"
        value={value}
        // label="جست و جو بر اساس نام فروشگاه"
        onChange={(e) => onChange(e.target.value)}
        InputProps={{
          endAdornment: value && (
            <InputAdornment position="end">
              <IconButton size="small" onClick={() => onChange("")} edge="end">
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
