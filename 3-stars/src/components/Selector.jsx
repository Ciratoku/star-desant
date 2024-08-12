import {
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";

function Selector({ currencies, label, select, input }) {
  return (
    <Stack direction="row" spacing={1}>
      <TextField helperText={label} label="value" {...input} />
      <FormControl fullWidth>
        <InputLabel>Currency</InputLabel>
        <Select {...select} id={label} label="Currency">
          {currencies.map((cur) => (
            <MenuItem key={cur} value={cur}>
              {cur}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}

export default Selector;
