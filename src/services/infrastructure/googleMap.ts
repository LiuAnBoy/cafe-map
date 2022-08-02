import { INearbyLocation } from '../../interface/googleMap/nearbyLocation';
import { IDetailLocation } from '../../interface/googleMap/detailLocation';
import Locals from '../../provider/Locals';
import Http from './http';
import { ICafeNextPage } from '../../interface/googleMap/nextPageLocation';

const http = new Http();

export async function requestGetNearbyLocation({
  location,
  radius = 500,
  keyword,
  language = 'zh-TW',
}: INearbyLocation) {
  const { nearbyMapUrl, apiKey } = Locals.config();
  const params: INearbyLocation = {
    key: apiKey,
    location,
    radius,
    keyword,
    language,
  };

  const result = await http.getRequest<any>(nearbyMapUrl, params);
  return result;
}

export async function requestGetDetailLocation({
  place_id,
  language = 'zh-TW',
  key,
}: IDetailLocation) {
  const { detailMapUrl } = Locals.config();
  const params: IDetailLocation = { place_id, language, key };

  const result = await http.getRequest<any>(detailMapUrl, params);
  return result;
}

export async function requestGetNextPageLocation(pagetoken: string) {
  const { nearbyMapUrl, apiKey } = Locals.config();
  const params: ICafeNextPage = { pagetoken, key: apiKey };

  const result = await http.getRequest<any>(nearbyMapUrl, params);
  return result;
}
