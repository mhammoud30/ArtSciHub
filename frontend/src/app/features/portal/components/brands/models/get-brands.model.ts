import { Market } from "../enums/market.enum";
import { Vertical } from "../enums/vertical.enum";

export interface GetBrandsModel {
  id: number;
  name: string;
  vertical: Vertical;
  socialMediaLink: string;
  market: Market;
  createdAt: Date;
  updatedAt: Date;
  createdBy: {
    id: number;
    firstName: string;
    lastName: string;
  }
}
