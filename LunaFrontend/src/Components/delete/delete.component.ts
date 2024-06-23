import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MeterModel } from '../../models/MeterModel';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [ MatDialogModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss'
})
export class DeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MeterModel
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
