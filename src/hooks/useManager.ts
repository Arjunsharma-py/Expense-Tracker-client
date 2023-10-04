import { Org } from "./useOrg";

export interface Manager {
  _id: string;
  name: string;
  email: string;
  type: string;
  org: Org;
  isVerified: boolean;
}
