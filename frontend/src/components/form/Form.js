import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import axios from "axios";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Form() {
  const [result, setResult] = React.useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (payload) => {
    console.log({ payload });
    try {
      const { data } = await axios.post(
        "https://localhost:49157/Add",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(result);
      setResult(data);
    } catch (error) {
      setResult(error?.response?.data);
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sample App
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              label="First Number"
              margin="normal"
              required
              fullWidth
              type="number"
              {...register("FirstInteger", {
                required: "Field is required",
                min: 0,
              })}
              error={!!errors?.FirstInteger}
              helperText={errors?.FirstInteger?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="number"
              label="Second Number"
              {...register("SecondInteger", {
                required: "Field is required",
                min: 0,
              })}
              error={!!errors?.SecondInteger}
              helperText={errors?.SecondInteger?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            {result && <Box>API Response: {result}</Box>}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
