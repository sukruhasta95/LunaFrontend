import { ReportModel } from "./ReportModel";

export interface ReportResponseModel{
  data: ReportModel[],
  message: string,
  success: boolean
}
