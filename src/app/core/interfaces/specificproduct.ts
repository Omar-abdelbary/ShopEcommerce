


// export interface Specificproduct {
//   product_id: number;
//   name: string;
//   description: string;
//   price: string;
//   category_id: number;
//   brand: string;
//   created_at: string;
//   stand_up: string;
//   folded_no_wheels: string;
//   folded_wheels: string;
//   frame: string;
//   weight_no_wheels: string;
//   weight_capacity: string;
//   width: string;
//   handle_height: string;
//   wheels: string;
//   seat_back_height: string;
//   head_room: string;
//   available_colors: string;
//   available_sizes: string;
//   images: Image[];
// }





export interface Specificproduct {
  product_id: number;
  name: string;
  description: string;
  price: string;
  // category_id: null;
  brand: string;
  created_at: string;
  main_image: string;
  images: Image[];
  variants: any[];
  average_rating: number;
  final_price: number;
  discount_percent: null;
}

interface Image {
  image_url: string;
  is_main: boolean;
}
