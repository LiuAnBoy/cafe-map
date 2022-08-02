import mongoose from 'mongoose';

import { ICafeShop } from '../interface/model/cafeShop';

export interface ICafeShopModel extends ICafeShop, mongoose.Document {}

export const CafeShopSchema = new mongoose.Schema<ICafeShopModel>({
  shopId: { type: String },
  name: { type: String },
  phone: { type: String },
  address: { type: String },
  rate: { type: String },
  review: { type: String },
  location: { type: String },
  photo: { type: String },
  url: { type: String },
  website: { type: String },
  opening_hours: { type: Object },
  geometry: { type: Object },
  price_level: { type: Number },
  shop_type: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

const CafeShop = mongoose.model<ICafeShopModel>('cafeshop', CafeShopSchema);

export default CafeShop;
