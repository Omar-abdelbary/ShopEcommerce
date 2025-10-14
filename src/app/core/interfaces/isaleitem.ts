


export interface Isaleitem {
  sale_id: number;
  product_id: number;
  discount_percent: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  product: Product;
}

interface Product {
  product_id: number;
  name: string;
  description: string;
  main_image: string;
  images: Image[];
}

interface Image {
  image_url: string;
}
