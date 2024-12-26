import { Market } from "../enums/market.enum";
import { Vertical } from "../enums/vertical.enum";

export interface CreateBrandModel {
  name: string;
  vertical: Vertical;
  socialMediaLink: string;
  market: Market;
}
//Userid is added by interceptor as active user
