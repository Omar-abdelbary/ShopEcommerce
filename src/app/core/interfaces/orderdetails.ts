




export interface Orderdetails {
  order_id: number;
  user_id: number;
  status: string;
  total_amount: string;
  created_at: string;
  payment_status: null;
  stripe_session_id: string;
  items: Item[];
}

interface Item {
  order_item_id: number;
  product_id: number;
  quantity: number;
  price: string;
  product_name: string;
  product_description: string;
  main_image: string;
}
