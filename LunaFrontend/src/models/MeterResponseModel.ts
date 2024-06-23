import { MeterModel } from "./MeterModel";
export interface MeterResponseModel {
  data: MeterModel[],
  message: string,
  success: boolean
}
