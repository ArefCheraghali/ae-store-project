export interface Category {
  id: number;
  name_en: string;
  name_fa: string;
}

export interface Store {
  id: string;
  name: string;
  name_en: string;
  imageUrl: string;
  category_id: number;
  description: string;
  description_en: string;
  address: string;
  address_en: string;
  phone: string;
  rating: number;
}

export interface Product {
  id: string;
  store_id: string;
  name: string;
  name_en: string;
  price: number;
  rating: number;
  sales_count: number;
  category_id: number;
  imageUrl: string;
}
