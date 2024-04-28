interface IUserProfile {
  _id: string;
  username: string;
  email: string;
  password?: string;
  full_name: string;
  avatar: string;
  mobile: string | number;
  role: "admin" | "user" | "merchant";
  status: "active" | "inactive";
  created_at: Date;
  updated_at: Date;
  __v: number;
}

interface IProduct {
  _id?: string;
  image: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

interface IReview {
  _id?: string;
  title: string;
  content: string;
  rating: number;
}

interface IAddress {
  _id: string;
  user_id: string;
  name: string;
  phone: number;
  pincode: number;
  city: string;
  state: string;
  country: string;
  locality: string;
  flat_no: string;
  landmark?: string;
  address_type: home | work | other;
}
