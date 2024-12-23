import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';


// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MinorFaction } from '../../../classes/MinorFactions';
import { Player } from '../../../classes/Player';
import { PlayerFactions } from '../../../classes/PlayerFactions';
import { RelationWithFaction } from '../../../classes/RelationshWithFaction';

@Component({
  selector: 'app-player-dialog',
  standalone: true,
  templateUrl: './player-dialog.component.html',
  styleUrls: ['./player-dialog.component.scss'],
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
    NgFor
  ],
})
export class PlayerDialogComponent {
  playerForm: FormGroup;
  players: Player[] = [];
  playerFactions: PlayerFactions[];
  minorFactions: MinorFaction[];
  filteredFactions: (PlayerFactions | MinorFaction)[] = []

  constructor(
    private dialogRef: MatDialogRef<PlayerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.playerFactions = data.overallData.playerFactions;
    this.minorFactions = data.overallData.mifac;

    this.playerForm = this.fb.group({
      name: ['', Validators.required],
      houseId: ['', Validators.required],
      isGsc: [false],
      isChaos: [false],
    });

    // Initial filtering based on default checkbox values
    this.filterFactions();

    // React to changes in checkboxes
    this.playerForm.get('isGsc')?.valueChanges.subscribe(() => this.filterFactions());
    this.playerForm.get('isChaos')?.valueChanges.subscribe(() => this.filterFactions());
  }

  generateId(): string {
    return 'player-' + Math.floor(Math.random() * 10000);
  }

  // Filter factions based on the values of isGsc and isChaos
  private filterFactions() {
    const isGscChecked = this.playerForm.get('isGsc')?.value;
    const isChaosChecked = this.playerForm.get('isChaos')?.value;

    if (isGscChecked) {
      this.filteredFactions = this.minorFactions.filter(faction => faction.isGsc);
    } else if (isChaosChecked) {
      this.filteredFactions = this.minorFactions.filter(faction => faction.isChaos);
    } else {
      this.filteredFactions = this.playerFactions; // Default to showing player factions if no filters are applied
    }
  }

  createPlayer(): Player {
    return {
      id: this.generateId(),
      name: this.playerForm.get('name')?.value,
      houseId: this.playerForm.get('houseId')?.value,
      isGsc: this.playerForm.get('isGsc')?.value,
      isChaos: this.playerForm.get('isChaos')?.value,
      relationshipWithPF: this.initializeRelationships(this.playerFactions),
      relationshipWithMifac: this.initializeRelationships(this.minorFactions),
      battles: 0,
      deaths: 0,
      kills: 0,
      wins: 0,
      lose: 0,
    };
  }

  private initializeRelationships(factions: Array<{ id: string; name: string }>): RelationWithFaction[] {
    return factions.map(faction => ({
      factionId: faction.id,
      name: faction.name,
      relationship: 0,
      modified: new Date()
    }));
  }

  addPlayer() {
    const newPlayer = this.createPlayer();
    this.players = [...this.players, newPlayer];
    this.resetForm();
  }

  resetForm() {
    this.playerForm.reset({
      name: '',
      houseId: '',
      isGsc: false,
      isChaos: false,
    });
    this.filterFactions();
  }

  removePlayer(index: number) {
    this.players = this.players.filter((_, i) => i !== index);
  }

  save() {
    this.dialogRef.close({ action: 'save', data: { players: this.players, title: 'players' } });
  }

  cancel() {
    this.dialogRef.close({ action: 'cancel' });
  }
}
