import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import shoppingIcon from "@/assets/icons/shopping-icon.svg";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Badge,
  Button,
  ListItemIcon,
  Stack,
  Tooltip,
} from "@mui/material";
import { useUserStore } from "@/store/store";
import { useLogoutUser } from "@/features/auth/api/logout";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

const settingsMenu = [
  {
    label: "Dashboard",
    slug: "dashboard",
    icon: <Settings fontSize="small" />,
  },
  { label: "Logout", slug: "login", icon: <Logout fontSize="small" /> },
];

export const NavbarComponent = (props: any) => {
  const { userCart } = props;
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(0);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const user = useUserStore((state) => state.user);
  
  const { mutate: logOutUser } = useLogoutUser();

  useEffect(() => {
    let total_quantity = 0;
    userCart &&
      userCart.products.forEach(
        (product: any) => (total_quantity += product.quantity)
      );
    setQuantity(total_quantity);
  }, [userCart]);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuNavigation = (menuItem: any) => {
    handleCloseUserMenu();
    if (menuItem.label === "Logout") logOutUser();
    navigate(`/${menuItem.slug}`);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleHomeNavigation = () => {
    navigate("/");
  };
  const handleCartNavigation = () => {
    navigate("/cart");
  };
  const handleProductsNavigation = () => {
    navigate("/products");
  };
  const handleLoginNavigation = () => {
    navigate("/login");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: "#000000" }}>
          <Toolbar>
            <img
              src={shoppingIcon}
              alt=""
              style={{ height: "40px", width: "40px", objectFit: "cover" }}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                "&:hover": { cursor: "pointer" },
              }}
              onClick={handleHomeNavigation}
            >
              Ecommerce
            </Typography>
            <Stack direction="row" gap={2}>
              <Tooltip title="Products">
                <Button
                  sx={{ color: "white" }}
                  onClick={() => handleProductsNavigation()}
                >
                  View products
                </Button>
              </Tooltip>
              {!isLoggedIn && (
                <Button variant="contained" onClick={handleLoginNavigation}>
                  Log in
                </Button>
              )}
              {isLoggedIn && (
                <>
                  <Tooltip title="Cart">
                    <IconButton onClick={handleCartNavigation}>
                      <Badge color="secondary" badgeContent={quantity} max={10}>
                        <ShoppingCartIcon sx={{ color: "white" }} />
                      </Badge>
                    </IconButton>
                  </Tooltip>
                  <Box>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          alt={user?.full_name}
                          src={user?.avatar}
                          sx={{ "&:hover": { cursor: "pointer" } }}
                        />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {settingsMenu.map((setting) => (
                        <MenuItem
                          key={setting.label}
                          onClick={() => handleMenuNavigation(setting)}
                        >
                          <ListItemIcon>{setting.icon}</ListItemIcon>
                          <Typography textAlign="center">
                            {setting.label}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                </>
              )}
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
