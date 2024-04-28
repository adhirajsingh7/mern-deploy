import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { TPasswordChangeSchema, passwordChangeSchema } from "@/lib/type";
import { FormInputText } from "@/components/Form";
import { useUpdateUser } from "@/features/users/api/updateUser";

export const ChangePasswordComponent = (props: any) => {
  const { userId } = props;

  const defaultValues = {
    password: "",
    new_password: "",
    confirm_password: "",
  };
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm<TPasswordChangeSchema>({
    defaultValues,
    resolver: zodResolver(passwordChangeSchema),
  });

  const { isPending, mutate } = useUpdateUser({ userId, setError, reset });

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log(data);
    mutate({
      previous_password: data.password,
      new_password: data.new_password,
    });
  };
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{ p: 2, border: 1, borderRadius: "10px", borderColor: "#dee0e3" }}
    >
      <Stack direction="column" sx={{ width: "270px" }}>
        <Typography variant="body1" fontWeight={600}>
          Account Password
        </Typography>
        <Typography variant="body2" sx={{ color: "#647692" }}>
          Update your profile password here
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
          <Stack direction="column" gap={2}>
            <FormInputText
              type="text"
              name={"password"}
              control={control}
              label={"Current Password"}
              size="normal"
            />
            <FormInputText
              type="text"
              name={"new_password"}
              control={control}
              label={"New Password"}
              size="normal"
            />
            <FormInputText
              type="text"
              name={"confirm_password"}
              control={control}
              label={"Confirm New Password"}
              size="normal"
            />
          </Stack>
          <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
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
        </form>
      </Stack>
    </Stack>
  );
};
