import { Basemodel } from "./BaseModel";

export interface MeterModel extends Basemodel {
  meterSerialNo: string,
  measurementTime: Date,
  lastIndex: number,
  voltageValue: number,
  currentValue: number
}
