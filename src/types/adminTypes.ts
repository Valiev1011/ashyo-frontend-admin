export interface IProduct {
  id: number;
  name: string;
  category_id: number;
  brand_id: number;
  model_id: number;
  price: string;
  sale_price: string | null;
  average_rating: string;

  category: {
    id: number;
    category_name: string;
    parent_category_id: number;
    position: number;
  };
  brand: {
    id: number;
    brand_name: string;
    brand_description: string;
    position: number;
    image: string;
  };
  productmodel: {
    id: number;
    model_name: string;
    category_brand_id: number;
  };
  sessionItem: any[]; // Adjust the type as needed
  productInfo: {
    id: number;
    product_id: number;
    attribute_id: number;
    attribute_value: string;
    show_in_main: boolean;
  }[];
  productMedia: {
    id: number;
    product_id: number;
    url: string;
  }[];
  comments: {
    id: number;
    user_id: number;
    product_id: number;
    comment: string;
    parent_comment_id: number | null;
  }[];
  stock: {
    id: number;
    product_id: number;
    quantity: number;
  };
  rating: any[]; // Adjust the type as needed
}

export interface ICategory {
  id?: number;
  category_name: string;
  parent_category_id?: number | null;
  position: number;
}

export interface IBrand {
  id: number;
  brand_name: string;
  brand_description: string;
  position: number;
  image: string;
}

export interface IModel {
  id: number;
  model_name: string;
  category_brand_id: number;
}

export interface IAttribute {
  id: number;
  name: string;
  attribute_group_id: number;
  is_changable: boolean;
}
