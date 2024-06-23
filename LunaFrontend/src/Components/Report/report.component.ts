import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ReportModel } from '../../models/ReportModel';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ServicesService } from '../../services/services.service';
import * as XLSX from 'xlsx';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { EReportStatus } from '../../models/EReportStatus';
@Component({
  selector: 'app-report',
  standalone: true,
  imports: [MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    CommonModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent implements OnInit, AfterViewInit {

  dataSource!: MatTableDataSource<ReportModel>;
  displayedColumns: string[] = ['meterSerialNo', 'status', 'requestedTime', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private readonly service: ServicesService, public dialog: MatDialog,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<ReportModel>();
    this.service.GetAllReports().subscribe(
      data => {
        this.dataSource.data = data.data;
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getFormattedDate(dateTimeString: string): string {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString()+' '+date.toLocaleTimeString();
  }

  exportAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ReportData.xlsx');
  }

  download(element: ReportModel) {
    const path = element.reportPath;
    if (path) {
      const dateInSeconds = Math.floor(Date.now() / 1000);
      const parts = path.split('\\');
      const fileName = parts[parts.length - 1];
      const fileUrl = `https://localhost:7298/${fileName}`
      this.http.get(fileUrl, { responseType: 'blob' }).subscribe(blob => {
        const link = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        link.href = url;
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(url);
      }, error => {
        console.error('Download error:', error);
      });

    }
  }

  displayStatus(status:EReportStatus){
    return Object.values(EReportStatus).filter(value => typeof value !== 'number' && value === EReportStatus[status])
  }

}
