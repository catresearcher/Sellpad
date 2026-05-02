export type Product = {
  id: number;
  title: string;
  description: string;
  quantity: number;
  price: number;
};

export interface ProductProps {
  Products: Product[];
}
