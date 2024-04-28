import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { DashboardSidebar } from "@/components/Dashboard";

export const DashboardLayout = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   navigate("/dashboard/account");
  // }, []);

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "calc(100vh - 64px)",
        width: 1,
        p: 4,
        bgcolor: "#f7f8fa",
        boxSizing: "border-box",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ height: 1, width: 1, bgcolor: "white", p: 2 }}
      >
        <DashboardSidebar />
        <Stack sx={{ width: 4 / 5 }}>
          <Outlet />
        </Stack>
      </Stack>
    </Stack>
  );
};
