import React, { useState } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormInputText } from "@/components/Form/FormInputText";
import { FormInputRadio } from "@/components/Form/FormInputRadio";
import { role_options } from "@/lib/constants";
import { TSignUpSchema, signUpSchema } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignupUser } from "@/features/auth/api/signup";
import { DropzoneComponent } from "@/components/Elements/Dropzone";
import { FormInputPassword } from "@/components/Form/FormInputPassword";
import LoadingButton from "@mui/lab/LoadingButton";

const SignupPage = () => {
  const [files, setFiles] = useState<any>([]);

  const { isPending, mutate } = useSignupUser();

  const defaultValues = {
    username: "",
    email: "",
    password: "",
    full_name: "",
    mobile: "",
    role: "",
    avatar: "",
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TSignUpSchema>({
    defaultValues,
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    if (Object.keys(files?.[0])?.length > 1) {
      data.avatar = files;
    }
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
            p: 4,
            borderRadius: 6,
          }}
          component={Paper}
          elevation={5}
        >
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <Stack direction="column" gap={2}>
              <Typography variant="h4">Register User</Typography>
              <DropzoneComponent
                files={files}
                setFiles={setFiles}
                displayImageClassName={"avatar-display-image"}
              />
              <FormInputText
                type="text"
                name={"username"}
                control={control}
                label={"Username"}
              />
              <FormInputText
                type="text"
                name={"email"}
                control={control}
                label={"Email"}
              />
              <FormInputPassword
                name={"password"}
                control={control}
                label={"Password"}
              />
              <FormInputText
                type="text"
                name={"full_name"}
                control={control}
                label={"Full name"}
              />
              <FormInputText
                type="number"
                name={"mobile"}
                control={control}
                label={"Mobile"}
              />
              <FormInputRadio
                name={"role"}
                control={control}
                label={"Role"}
                options={role_options}
                error={errors.role}
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
                <span>Signup</span>
              </LoadingButton>
              <Link to="/login">Already have an account? Log in here</Link>
            </Stack>
          </form>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SignupPage;
