import { ComplaintStatusTypes } from "src/Enums/complaint-status.enum";
import { IOrder } from "./IOrder";

export interface IComplaint {
  id: string;
  description: string;
  createdAt: string;
  type: string;
  status: ComplaintStatusTypes;
  complainant: string;
  verdict?: string;
  order?: IOrder;
}
