import { fashionProducts } from "./fashionProduct";
import { groceriesProduct } from "./groceriesProduct";
import { electronicsProducts } from "./electronicsProduct";

export const allProducts = [
  ...fashionProducts,
  ...groceriesProduct,
  ...electronicsProducts,
];
