import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MeterModel } from '../models/MeterModel';
import { MeterResponseModel } from '../models/MeterResponseModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReportResponseModel } from '../models/ReportResponseModel';
import { ReportModel } from '../models/ReportModel';
import { ReportRequestEventModel } from '../models/ReportRequestEventModel';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) { }
  //meterURLs
  getAllMetersUrl = 'https://localhost:7179/api/Meter/getAllMeter';
  addMeterUrl = 'https://localhost:7179/api/Meter/AddMeter';
  updateMeterUrl = 'https://localhost:7179/api/Meter/UpdateMeter';
  deleteMeterUrl = 'https://localhost:7179/api/Meter/DeleteMeter';
  meterGetById = 'https://localhost:7179/api/Meter/GetById';

  //reportURLs
  getAllReportUrl ='https://localhost:7298/api/Report/getAllReports';
  addReportUrl = 'https://localhost:7298/api/Report/AddReport';
  updateReportUrl = 'https://localhost:7298/api/Report/UpdateReport';
  deleteReportUrl ='https://localhost:7298/api/Report/DeleteReport';
  reportGetById = 'https://localhost:7298/api/Report/GetById';
  triggerReportQueue ='https://localhost:7298/api/Report/TriggerReportQueue';

  GetAllReports(){
    const result = this.http.get<ReportResponseModel>(this.getAllReportUrl);
    return result;
  }

  TriggeredReportQueue(eventModel:ReportRequestEventModel){
    this.http.post(this.triggerReportQueue, eventModel)
    .subscribe((res: any) => {
      if (res) {
        this.router.navigate(['/app-common'])
      }
    });
  }

  AddReport(reportModel:ReportModel){
   return this.http.post(this.addReportUrl, reportModel);
  }

  GetAllMeter() {
    const result = this.http.get<MeterResponseModel>(this.getAllMetersUrl);
    return result;
  }

  AddMeter(meterModel: MeterModel) {
    this.http.post(this.addMeterUrl, meterModel)
      .subscribe((res: any) => {
        if (res) {
          this.snackBar.open(res.message, 'Close');
          this.router.navigate(['/app-common'])
        }
      });
  }

  DeleteMeter(meterId: string) {
    this.http.patch(`${this.deleteMeterUrl}?id=${meterId}`, {}).subscribe({
      next: res => {
        this.snackBar.open('Meter deleted successfully', 'Close', {
          duration: 2000
        });
        this.router.navigate(['/app-common']);
      },
      error: err => {
        this.snackBar.open('Error deleting meter', 'Close', {
          duration: 2000
        });
        console.error('Error:', err);
      }
    });
  }

  UpdateMeter(meter:MeterModel){
    this.http.patch(`${this.updateMeterUrl}`, meter).subscribe({
      next: res => {
        this.snackBar.open('Meter updated successfully', 'Close', {
          duration: 2000
        });
        this.router.navigate(['/app-common']);
      },
      error: err => {
        this.snackBar.open('Error updating meter', 'Close', {
          duration: 2000
        });
        console.error('Error:', err);
      }
    });
  }
}

