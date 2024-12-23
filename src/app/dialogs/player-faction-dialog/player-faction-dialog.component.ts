// src/app/player-faction-dialog/player-faction-dialog.component.ts
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
import { PlayerFactions } from '../../../classes/PlayerFactions';

@Component({
  selector: 'app-player-faction-dialog',
  standalone: true,
  templateUrl: './player-faction-dialog.component.html',
  styleUrls: ['./player-faction-dialog.component.scss'],
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
export class PlayerFactionDialogComponent {
  playerFactions: PlayerFactions[] = [];  // Array to store PlayerFaction objects
  playerFactionForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<PlayerFactionDialogComponent>,
    private fb: FormBuilder
  ) {
    this.playerFactionForm = this.fb.group({
      name: ['', Validators.required],
      power: [0, Validators.required],
      playerIds: [[]],  // Can be populated dynamically as needed
    });
  }

  // Generate unique ID for each PlayerFaction
  generateId(): string {
    return 'pfac-' + Math.floor(Math.random() * 10000);
  }

  // Add PlayerFaction to the array
  addPlayerFaction() {
    const newPlayerFaction: PlayerFactions = {
      id: this.generateId(),
      name: this.playerFactionForm.get('name')?.value,
      power: this.playerFactionForm.get('power')?.value,
      playerIds: this.playerFactionForm.get('playerIds')?.value || [],
      relationshipWithPF: [],
      relationshipWithMafac: [],
      relationshipWithMifac: [],
      dramatisList: [],
    };

    this.playerFactions = [...this.playerFactions, newPlayerFaction];
    this.resetForm(); // Clear the form after adding
  }

  // Reset the form
  resetForm() {
    this.playerFactionForm.reset({
      name: '',
      power: 0,
      playerIds: [],
    });
  }

  // Remove PlayerFaction from the array by index
  removePlayerFaction(index: number) {
    this.playerFactions = this.playerFactions.filter((_, i) => i !== index);
  }

  // Save changes and close the dialog
  save() {
    this.dialogRef.close({ action: 'save', data: { playerFactions: this.playerFactions, title: 'playerFactions' } });
  }

  // Cancel changes and close the dialog
  cancel() {
    this.dialogRef.close({ action: 'cancel' });
  }
}
