import React, { useEffect } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { TpersonalInfoSchema, personalInfoSchema } from "@/lib/type";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { FormInputText } from "@/components/Form";
import { useUpdateUser } from "@/features/users/api/updateUser";

export const PersonalDetailsComponent = (props: any) => {
  const { username, full_name, email, mobile, _id: userId } = props;

  let defaultValues = {
    username,
    email,
    full_name,
    mobile,
  };

  useEffect(() => {
    defaultValues = {
      username: username,
      email: "",
      full_name: "",
      mobile: "",
    };
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm<TpersonalInfoSchema>({
    defaultValues,
    resolver: zodResolver(personalInfoSchema),
  });

  const { isPending, mutate } = useUpdateUser({ userId, setError });

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log(data);
    mutate(data);
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{ p: 2, border: 1, borderRadius: "10px", borderColor: "#dee0e3" }}
    >
      <Stack direction="column" sx={{ width: "270px" }}>
        <Typography variant="body1" fontWeight={600}>
          Personal Information
        </Typography>
        <Typography variant="body2" sx={{ color: "#647692" }}>
          Update your personal details here
        </Typography>
      </Stack>
      <Stack
        direction="column"
        gap={3}
        sx={{
          width: 1 / 2,
          border: 1,
          bgcolor: "#FBFCFF",
          borderColor: "#dee0e3",
          p: 2,
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" gap={3}>
            <Stack direction="row" gap={2} justifyContent="space-between">
              <FormInputText
                type="text"
                name={"username"}
                control={control}
                label={"Username"}
                size="normal"
              />
              <FormInputText
                type="text"
                name={"full_name"}
                control={control}
                label={"Full name"}
                size="normal"
              />
            </Stack>
            <FormInputText
              type="text"
              name={"email"}
              control={control}
              label={"Email"}
              size="normal"
            />
            <FormInputText
              type="number"
              name={"mobile"}
              control={control}
              label={"Mobile"}
              size="normal"
            />
            <Stack direction="row" justifyContent="flex-end">
              <Button
                color="inherit"
                sx={{ textTransform: "none" }}
                onClick={() => reset()}
              >
                Cancel
              </Button>
              <LoadingButton
                type="submit"
                loading={isPending}
                loadingPosition="center"
                sx={{ textTransform: "none" }}
              >
                <span>Save</span>
              </LoadingButton>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
};
