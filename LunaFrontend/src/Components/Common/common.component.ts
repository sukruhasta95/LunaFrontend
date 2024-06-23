import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MeterComponent } from '../Meter/meter.component';
import { ReportComponent } from '../Report/report.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';
import { MeterModel } from '../../models/MeterModel';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-common',
  standalone: true,
  imports: [MatTabsModule, MeterComponent, ReportComponent,
    MatTabsModule,
    MatIconModule ,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,],
  templateUrl: './common.component.html',
  styleUrl: './common.component.scss'
})
export class CommonComponent implements OnInit {
  constructor(){}
  ngOnInit(): void {
  }
}
