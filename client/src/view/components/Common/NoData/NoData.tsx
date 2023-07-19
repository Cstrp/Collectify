import { ErrorOutline } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export const NoData = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
        textAlign: "center",
      }}
    >
      <ErrorOutline sx={{ fontSize: 48, mb: 2 }} />
      <Typography variant="h6" component="p" sx={{ mb: 2 }}>
        Oops! No data available.
      </Typography>
    </Box>
  );
};
