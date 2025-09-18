export interface Category {
  id: number;
  name_en: string;
  name_fa: string;
}

export interface Store {
  id: string;
  name: string;
  imageUrl: string;
  category_id: number;
  description: string;
  address: string;
  phone: string;
  rating: number;
}

export interface Product {
  id: string;
  store_id: string;
  name: string;
  price: number;
  rating: number;
  sales_count: number;
  category_id: number;
  imageUrl: string;
}
