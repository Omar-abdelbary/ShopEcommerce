



export interface Iproducts {
  product_id: number;
  name: string;
  description: string;
  price: string;
  category_id: number;
  brand: string;
  created_at: string;
  stand_up: string;
  folded_no_wheels: string;
  folded_wheels: string;
  frame: string;
  weight_no_wheels: string;
  weight_capacity: string;
  width: string;
  handle_height: string;
  wheels: string;
  seat_back_height: string;
  head_room: string;
  available_colors: string;
  available_sizes: string;
  main_image: null;

   parsedColors?: string[];
  parsedSizes?: string[];
}
