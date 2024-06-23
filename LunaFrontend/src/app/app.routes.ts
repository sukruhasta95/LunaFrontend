import { Routes } from '@angular/router';
import { CommonComponent } from '../Components/Common/common.component';
import { MeterComponent } from '../Components/Meter/meter.component';
import { ReportComponent } from '../Components/Report/report.component';

export const routes: Routes = [
  { path: '', redirectTo: 'app-common', pathMatch: 'full' },
  { path: 'app-common', component: CommonComponent },
  { path: 'app-meter', component: MeterComponent },
  { path: 'app-report', component: ReportComponent }
];
