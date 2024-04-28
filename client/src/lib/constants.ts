import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

export const category_options = [
  {
    label: "Food and Beverage",
    value: "food",
  },
  {
    label: "Apparel and Accessories",
    value: "clothing",
  },
  {
    label: "Furniture and Decor",
    value: "furniture",
  },
  {
    label: "Consumer Electronics",
    value: "electronics",
  },
];

export const role_options = [
  {
    label: "User",
    value: "user",
  },
  {
    label: "Merchant",
    value: "merchant",
  },
  {
    label: "Admin",
    value: "admin",
  },
];

export const address_type_options = [
  {
    label: "Home",
    value: "home",
  },
  {
    label: "Office",
    value: "office",
  },
  {
    label: "Other",
    value: "other",
  },
];

export const productTableColumns = [
  "",
  "Product",
  "Category",
  "Price",
  "Stock",
  "Action",
];

export const userTableColumns = ["", "Name", "Status", "Created at", "Action"];

export const orderTableColumns = [
  "Order id",
  "Status",
  "Total amount",
  "Action",
];

export const MAX_UPLOAD_SIZE = 1024 * 1024 * 5; // 5mb
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
