import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MinorFaction } from '../../../classes/MinorFactions';
import { Player } from '../../../classes/Player';
import { PlayerFactions } from '../../../classes/PlayerFactions';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';


@Component({
  selector: 'app-player-modification-dialog',
  standalone: true,
  templateUrl: './player-modification-dialog.component.html',
  styleUrls: ['./player-modification-dialog.component.scss'],
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
export class PlayerModificationDialogComponent {
  modifiedPlayer: Player;

  constructor(
    private dialogRef: MatDialogRef<PlayerModificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { player: Player; playerFactions: PlayerFactions[]; minorFactions: MinorFaction[] }
  ) {
    // Make a copy of the player data to avoid mutating the original until save
    this.modifiedPlayer = { ...data.player };
  }

  // Increment or decrement House Power
  adjustHousePower(amount: number) {
    const faction = this.getHouseFaction();
    if (faction) {
      faction.power = (faction.power || 0) + amount;
    }
  }

  // Increment or decrement relationship value in PlayerFactions
  adjustRelationshipWithPF(factionId: string, amount: number) {
    const relationship = this.modifiedPlayer.relationshipWithPF.find(rel => rel.factionId === factionId);
    if (relationship) {
      relationship.relationship += amount;
      relationship.modified = new Date();
    }
  }

  // Increment or decrement relationship value in MinorFactions
  adjustRelationshipWithMifac(factionId: string, amount: number) {
    const relationship = this.modifiedPlayer.relationshipWithMifac.find(rel => rel.factionId === factionId);
    if (relationship) {
      relationship.relationship += amount;
      relationship.modified = new Date();
    }
  }

  // Helper to get the player's house faction for power display/editing
  getHouseFaction(): PlayerFactions | MinorFaction | undefined {
    return (
      this.data.playerFactions.find(f => f.id === this.modifiedPlayer.houseId) ||
      this.data.minorFactions.find(f => f.id === this.modifiedPlayer.houseId)
    );
  }

  // Save modifications and close the dialog
  save() {
    this.dialogRef.close({
      action: 'save',
      data: { title: 'player-modif', content: this.modifiedPlayer },
    });
  }

  // Cancel modifications and close the dialog
  cancel() {
    this.dialogRef.close({ action: 'cancel' });
  }
}
