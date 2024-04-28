import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import SellIcon from "@mui/icons-material/Sell";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useUserStore } from "@/store/store";
import "./DashboardSidebar.styles.scss";

export const DashboardSidebar = () => {
  const user = useUserStore((state) => state.user);
  const dashboard_sidebar_options = [
    {
      label: "Account",
      slug: "account",
      icon: PersonIcon,
      roles: ["admin", "user", "merchant"],
    },
    {
      label: "Addresses",
      slug: "addresses",
      icon: HomeIcon,
      roles: ["admin", "user", "merchant"],
    },
    {
      label: "View Orders",
      slug: "view-orders",
      icon: ShoppingBagIcon,
      roles: ["admin", "user", "merchant"],
    },
    {
      label: "Sell Products",
      slug: "sell-products",
      icon: SellIcon,
      roles: ["admin", "merchant"],
    },
    {
      label: "View Merchants",
      slug: "merchants",
      icon: StorefrontIcon,
      roles: ["admin"],
    },
  ];
  return (
    <>
      <Stack direction="column" sx={{ minWidth: 1 / 5 }}>
        <Typography variant="h5">Settings</Typography>
        <List>
          {dashboard_sidebar_options.map((item, index) => {
            return (
              item.roles.includes(user?.role) && (
                <React.Fragment key={index}>
                  <NavLink
                    style={{ textDecoration: "none" }}
                    to={`${item.slug}`}
                    className={({ isActive }) =>
                      isActive ? "active" : "inactive"
                    }
                    replace
                    children={({ isActive }) => {
                      return (
                        <>
                          <ListItem
                            disablePadding
                            className={isActive ? "active" : "inactive"}
                            sx={{ color: "black" }}
                          >
                            <ListItemButton>
                              <ListItemIcon>{<item.icon />}</ListItemIcon>
                              <ListItemText primary={item.label} />
                            </ListItemButton>
                          </ListItem>
                        </>
                      );
                    }}
                  ></NavLink>
                </React.Fragment>
              )
            );
          })}
        </List>
      </Stack>
      <Divider orientation="vertical" />
    </>
  );
};
