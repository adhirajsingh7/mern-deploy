import React, { useState } from "react";
import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { FormInputText } from "../../components/Form/FormInputText";
import { TLoginSchema, loginSchema } from "../../lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginUser } from "@/features/auth/api/login";
import { useUserStore } from "@/store/store";
import googleIcon from "@/assets/icons/google_icon.svg";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const setIsLoggedIn = useUserStore((state) => state.setIsLoggedIn);

  const { isPending, mutate } = useLoginUser();

  const googleAuth = () => {
    window.open("http://localhost:8080/login/federated/google", "_self");
    setLoading(true);
    setIsLoggedIn(true);
  };

  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TLoginSchema>({
    defaultValues,
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    mutate(data);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: 1,
      }}
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{
          height: 1,
        }}
      >
        <Stack
          direction="column"
          gap={2}
          sx={{
            p: 8,
            borderRadius: 6,
          }}
          component={Paper}
          elevation={5}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column" gap={2} sx={{ width: "350px" }}>
              <Typography variant="h4">Login User</Typography>
              <FormInputText
                type="text"
                name={"email"}
                control={control}
                label={"Email"}
                size="medium"
              />
              <FormInputText
                type="password"
                name={"password"}
                control={control}
                label={"Password"}
                size="medium"
              />
              <LoadingButton
                type="submit"
                loading={isPending}
                loadingPosition="center"
                variant="contained"
                sx={{
                  height: "52px",
                  background:
                    "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                  border: 0,
                  borderRadius: 10,
                  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                }}
              >
                <span>Login</span>
              </LoadingButton>
            </Stack>
          </form>
          <Divider>OR</Divider>
          <LoadingButton
            startIcon={
              <img src={googleIcon} alt="" width="40px" height="40px" />
            }
            type="submit"
            loading={loading}
            loadingPosition="center"
            variant="outlined"
            color="inherit"
            sx={{ borderColor: "#dee0e3", borderRadius: 10 }}
            onClick={googleAuth}
          >
            <span>Login with google</span>
          </LoadingButton>
          <Typography variant="body1" textAlign="center">
            Don't have any account?{" "}
            <Link to="/signup">
              <span>Signup</span>
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default LoginPage;
