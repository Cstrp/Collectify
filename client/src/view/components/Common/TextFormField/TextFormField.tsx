import { FieldProps, getIn } from "formik";
import { TextField } from "@mui/material";

export const TextFormField = ({ form, field, ...props }: FieldProps) => {
  const getErrorMessage =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  return (
    <TextField
      fullWidth
      margin={"normal"}
      variant={"standard"}
      color="primary"
      helperText={getErrorMessage}
      error={!!getErrorMessage}
      {...field}
      {...props}
    />
  );
};
