import { Vertical } from "../enums/vertical.enum";

export interface GetBrandsModel {
  id: number;
  name: string;
  vertical: Vertical;
  createdAt: Date;
  updatedAt: Date;
  createdBy: {
    id: number;
    firstName: string;
    lastName: string;
  }
}
