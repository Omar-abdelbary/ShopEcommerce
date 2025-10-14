


export interface Iproduct {
  product_id: number;
  name: string;
  description: string;
  price: string;
  category_id: null;
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


