import React, { useState } from "react";
import { Box, MenuItem, Typography } from "@mui/material";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useUpdateUser } from "@/features/users/api/updateUser";

const merchantStatus = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

export const ChangeMerchantStatus = (props: any) => {
  const { userId, userStatus } = props;
  const [anchorElStatus, setAnchorElStatus] = useState<null | HTMLElement>(
    null
  );

  const { mutate } = useUpdateUser({ userId });

  const handleCloseStatusMenu = () => {
    setAnchorElStatus(null);
  };

  const handleMenuNavigation = (status: string) => {
    mutate({ status: status });
    handleCloseStatusMenu();
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElStatus(event.currentTarget);
  };

  return (
    <>
      <Box>
        <Tooltip title="Change status">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElStatus}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElStatus)}
          onClose={handleCloseStatusMenu}
        >
          {merchantStatus.map((status) => (
            <MenuItem
              key={status.label}
              disabled={status.value === userStatus}
              onClick={() => handleMenuNavigation(status.value)}
            >
              <Typography textAlign="center">{status.label}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </>
  );
};
