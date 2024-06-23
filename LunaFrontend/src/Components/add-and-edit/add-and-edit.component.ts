import { Component, Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MeterModel } from '../../models/MeterModel';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-add-and-edit',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatDialogModule,
    MatNativeDateModule, MatInputModule, MatDatepickerModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-and-edit.component.html',
  styleUrl: './add-and-edit.component.scss'
})

export class AddAndEditComponent {
  constructor(
    public dialogRef: MatDialogRef<AddAndEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MeterModel) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
