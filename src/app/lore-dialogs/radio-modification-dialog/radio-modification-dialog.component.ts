import { Component } from '@angular/core';
import {MatButton, MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatInput, MatInputModule} from "@angular/material/input";
import {CommonModule, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Radio} from "../../../classes/lore-models/radio";

@Component({
  selector: 'app-radio-modification-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './radio-modification-dialog.component.html',
  styleUrl: './radio-modification-dialog.component.scss'
})
export class RadioModificationDialogComponent {
  radio: Radio = {
    cycle: 0,
    week: 0,
    author: '',
    broadcasts: [''],
  };

  constructor(public dialogRef: MatDialogRef<RadioModificationDialogComponent>) {}

  increment(field: 'cycle' | 'week'): void {
    this.radio[field]++;
  }

  decrement(field: 'cycle' | 'week'): void {
    if (this.radio[field] > 0) {
      this.radio[field]--;
    }
  }

  addBroadcast(): void {
    this.radio.broadcasts.push('');
  }

  save(): void {
    this.dialogRef.close({
      action: 'save',
      data: { title: 'radio-broadcast', content: this.radio },
    });
  }
}
