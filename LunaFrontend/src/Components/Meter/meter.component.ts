import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ServicesService } from '../../services/services.service';
import { MeterModel } from '../../models/MeterModel';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AddAndEditComponent } from '../add-and-edit/add-and-edit.component';
import { DeleteComponent } from '../delete/delete.component';
import { ReportModel } from '../../models/ReportModel';
import { EReportStatus } from '../../models/EReportStatus';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReportRequestEventModel } from '../../models/ReportRequestEventModel';
@Component({
  selector: 'app-meter',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule,
    MatInputModule,
    FormsModule,
    MatDialogModule
  ],
  templateUrl: './meter.component.html',
  styleUrl: './meter.component.scss'
})


export class MeterComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['meterSerialNo', 'lastIndex', 'voltage', 'current', 'measurementTime', 'actions'];
  dataSource!: MatTableDataSource<MeterModel>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private readonly service: ServicesService, public dialog: MatDialog,
    private router: Router, private snackBar: MatSnackBar
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
    this.dataSource = new MatTableDataSource<MeterModel>();
    this.service.GetAllMeter().subscribe(
      data => {
        this.dataSource.data = data.data;
      }
    );
  }
  addElement() {
    const newElement: MeterModel = {
      meterSerialNo: '', measurementTime: new Date(), lastIndex: 0, voltageValue: 0, currentValue: 0,
      id: this.generateSimpleGUID(),
      createdOn: new Date,
      isDeleted: false
    };
    const dialogRef = this.dialog.open(AddAndEditComponent, {
      width: '250px',
      data: newElement
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.AddMeter(result)
      }
    });
  }

  generateSimpleGUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  editElement(element: MeterModel) {
    const dialogRef = this.dialog.open(AddAndEditComponent, {
      width: '250px',
      data: { ...element }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.UpdateMeter(result);
      }
    });
  }

  deleteElement(element: MeterModel) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '250px',
      data: { ...element }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.DeleteMeter(result.id);
      }
    });

  }

  getFormattedDate(dateTimeString: string): string {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();;
  }
  getreport(element: MeterModel) {
    const report: ReportModel = {
      id: this.generateSimpleGUID(),
      status: EReportStatus.Preparing,
      requestedDate: new Date(),
      meterSerialNo: element.meterSerialNo,
      reportPath: null,
      createdOn: new Date(),
      isDeleted: false
    }
    this.service.AddReport(report).subscribe((res: any) => {
      if (res) {
        this.snackBar.open(res.message, 'Close');
        this.router.navigate(['/app-common'])
        const reportEvent: ReportRequestEventModel = {
          reportId: report.id,
          serialNo: element.meterSerialNo
        }
        this.service.TriggeredReportQueue(reportEvent);
      }
    });

  }
}
