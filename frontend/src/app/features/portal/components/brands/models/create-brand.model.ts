import { Vertical } from "../enums/vertical.enum";

export interface CreateBrandModel {
  name: string;
  vertical: Vertical;
}
//Userid is added by interceptor as active user
