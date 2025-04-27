import { TextField as MuiTextField } from '@mui/material';
import { InputAdornment } from '@mui/material';
import { TextFieldProps } from '@zenra/models';

export const TextField = ({
  label,
  error,
  helperText,
  startIcon,
  endIcon,
  multiline,
  rows,
  ...props
}: TextFieldProps) => {
  return (
    <MuiTextField
      label={label}
      error={!!error}
      helperText={error || helperText}
      fullWidth
      multiline={multiline}
      rows={rows}
      InputProps={{
        startAdornment: startIcon && (
          <InputAdornment position="start">{startIcon}</InputAdornment>
        ),
        endAdornment: endIcon && (
          <InputAdornment position="end">{endIcon}</InputAdornment>
        ),
      }}
      {...props}
    />
  );
};