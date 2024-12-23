// src/app/major-faction-dialog/major-faction-dialog.component.ts
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MajorFaction } from '../../../classes/MajorFactions';

@Component({
  selector: 'app-major-faction-dialog',
  standalone: true,
  templateUrl: './major-faction-dialog.component.html',
  styleUrls: ['./major-faction-dialog.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
  ],
})
export class MajorFactionDialogComponent {
  majorFactions: MajorFaction[] = [];  // Array to store MajorFaction objects
  majorFactionForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<MajorFactionDialogComponent>,
    private fb: FormBuilder
  ) {
    this.majorFactionForm = this.fb.group({
      name: ['', Validators.required],
      power: [0, Validators.required],
    });
  }

  // Generate unique ID for each MajorFaction
  generateId(): string {
    return 'mafac-' + Math.floor(Math.random() * 10000);
  }

  // Add MajorFaction to the array
  addMajorFaction() {
    const newMajorFaction: MajorFaction = {
      id: this.generateId(),
      name: this.majorFactionForm.get('name')?.value,
      power: this.majorFactionForm.get('power')?.value,
      relationshipWithPF: [],
      relationshipWithMafac: [],
      relationshipWithMifac: [],
      playerIds: [],
    };

    this.majorFactions = [...this.majorFactions, newMajorFaction];
    this.resetForm(); // Clear the form after adding
  }

  // Reset the form
  resetForm() {
    this.majorFactionForm.reset({
      name: '',
      power: 0,
    });
  }

  // Remove MajorFaction from the array by index
  removeMajorFaction(index: number) {
    this.majorFactions = this.majorFactions.filter((_, i) => i !== index);
  }

  // Save changes and close the dialog
  save() {
    this.dialogRef.close({ action: 'save', data: { mafac: this.majorFactions, title: 'mafac' } });
  }

  // Cancel changes and close the dialog
  cancel() {
    this.dialogRef.close({ action: 'cancel' });
  }
}
