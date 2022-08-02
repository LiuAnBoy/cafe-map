export interface ICafeShop {
  shopId: string;
  name: string;
  phone: string;
  address: string;
  rate: string;
  review: string;
  location: string;
  photo: string;
  url: string;
  website: string;
  opening_hours: ShopOpeningHours;
  geometry: ShopGeometry;
  price_level: number;
  shop_type: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ShopOpeningHours {
  period: ShopPeriod[];
  weekday_text: string[];
}

export interface ShopPeriod {
  close: {
    day: number;
    time: string;
  };
  open: {
    day: number;
    time: string;
  };
}

export interface ShopGeometry {
  lat: string;
  lng: string;
}