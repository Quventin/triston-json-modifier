// src/app/minor-faction-dialog/minor-faction-dialog.component.ts
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
import { MinorFaction } from '../../../classes/MinorFactions';

@Component({
  selector: 'app-minor-faction-dialog',
  standalone: true,
  templateUrl: './minor-faction-dialog.component.html',
  styleUrls: ['./minor-faction-dialog.component.scss'],
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
export class MinorFactionDialogComponent {
  minorFactions: MinorFaction[] = [];  // Array to store MinorFaction objects
  minorFactionForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<MinorFactionDialogComponent>,
    private fb: FormBuilder
  ) {
    this.minorFactionForm = this.fb.group({
      name: ['', Validators.required],
      power: [0, Validators.required],
      isGsc: [false],
      isChaos: [false],
    });
  }

  // Generate unique ID for each MinorFaction
  generateId(): string {
    return 'mifac-' + Math.floor(Math.random() * 10000);
  }

  // Add MinorFaction to the array
  addMinorFaction() {
    const newMinorFaction: MinorFaction = {
      id: this.generateId(),
      name: this.minorFactionForm.get('name')?.value,
      power: this.minorFactionForm.get('power')?.value,
      isGsc: this.minorFactionForm.get('isGsc')?.value,
      isChaos: this.minorFactionForm.get('isChaos')?.value,
      relationshipWithPF: [],
      relationshipWithMafac: [],
      relationshipWithMifac: [],
      playerIds: [],
      agentList: [],
    };

    this.minorFactions = [...this.minorFactions, newMinorFaction];
    this.resetForm(); // Clear the form after adding
    console.log(this.minorFactions)
  }

  // Reset the form
  resetForm() {
    this.minorFactionForm.reset({
      name: '',
      power: 0,
      isGsc: false,
      isChaos: false,
    });
  }

  // Remove MinorFaction from the array by index
  removeMinorFaction(index: number) {
    this.minorFactions = this.minorFactions.filter((_, i) => i !== index);
  }

  // Save changes and close the dialog
  save() {
    this.dialogRef.close({ action: 'save', data: { mifac: this.minorFactions, title: 'mifac' } });
  }

  // Cancel changes and close the dialog
  cancel() {
    this.dialogRef.close({ action: 'cancel' });
  }
}
