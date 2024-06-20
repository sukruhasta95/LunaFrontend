import { Routes } from '@angular/router';
import { CommonComponent } from '../Components/Common/common.component';
import { MeterComponent } from '../Components/Meter/meter.component';
import { ReportComponent } from '../Components/Report/report.component';

export const routes: Routes = [
  { path: '', component: CommonComponent },
  { path: 'meter', component: MeterComponent },
  { path: 'report', component: ReportComponent }
];
