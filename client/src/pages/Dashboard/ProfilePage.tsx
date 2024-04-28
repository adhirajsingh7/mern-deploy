import React from "react";
import { Stack } from "@mui/material";
import {
  AvatarUploadComponent,
  ChangePasswordComponent,
  PersonalDetailsComponent,
} from "@/components/Profile";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { useGetUser } from "@/features/auth/api/getUser";

const ProfilePage = () => {
  const { isPending, data } = useGetUser();
  const {
    data: { user },
  } = data;

  if (isPending) {
    return (
      <Stack justifyContent="center" alignItems="center" sx={{ height: 1 }}>
        <ClimbingBoxLoader color="#FE6D87" size={25} />
      </Stack>
    );
  }

  return (
    <Stack direction="column" gap={2} sx={{ p: 2, overflow: "auto" }}>
      <AvatarUploadComponent {...user} />
      <PersonalDetailsComponent {...user} />
      {user.password && <ChangePasswordComponent userId={user._id} />}
    </Stack>
  );
};

export default ProfilePage;
