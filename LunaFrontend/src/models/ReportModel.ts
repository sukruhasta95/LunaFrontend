import { Basemodel } from "./BaseModel";
import { EReportStatus } from "./EReportStatus";

export interface ReportModel extends Basemodel {
  requestedDate: Date
  status: EReportStatus,
  meterSerialNo: string,
  reportPath: string | null
}
