import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MajorFaction } from '../../../classes/MajorFactions';

@Component({
  selector: 'app-major-faction-modification-dialog',
  standalone: true,
  templateUrl: './major-faction-modification-dialog.component.html',
  styleUrls: ['./major-faction-modification-dialog.component.scss'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
    CommonModule,
    NgFor,
    MatDialogModule,
    FormsModule
  ],
})
export class MajorFactionModificationDialogComponent {
  modifiedFaction: MajorFaction;

  constructor(
    private dialogRef: MatDialogRef<MajorFactionModificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { faction: MajorFaction }
  ) {
    // Make a copy of the faction data to avoid direct mutation
    this.modifiedFaction = { ...data.faction };
  }

  // Increment or decrement power
  adjustPower(amount: number) {
    this.modifiedFaction.power = (this.modifiedFaction.power || 0) + amount;
  }

  // Save modifications and close the dialog
  save() {
    this.dialogRef.close({
      action: 'save',
      data: { title: 'mafac-modif', content: this.modifiedFaction },
    });
  }

  // Cancel modifications and close the dialog
  cancel() {
    this.dialogRef.close({ action: 'cancel' });
  }
}
