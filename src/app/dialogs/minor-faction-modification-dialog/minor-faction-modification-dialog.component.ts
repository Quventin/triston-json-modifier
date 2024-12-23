import { Component, Inject } from '@angular/core';
import { MinorFaction } from '../../../classes/MinorFactions';
import { CommonModule, NgFor } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MajorFaction } from '../../../classes/MajorFactions';
import { PlayerFactions } from '../../../classes/PlayerFactions';
import { PlayerFactionModificationDialogComponent } from '../player-faction-modification-dialog/player-faction-modification-dialog.component';

@Component({
  selector: 'app-minor-faction-modification-dialog',
  standalone: true,
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
  templateUrl: './minor-faction-modification-dialog.component.html',
  styleUrl: './minor-faction-modification-dialog.component.scss'
})
export class MinorFactionModificationDialogComponent {
  modifiedFaction: MinorFaction;

  constructor(
    private dialogRef: MatDialogRef<MinorFactionModificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { faction: MinorFaction; playerFactions: PlayerFactions[]; majorFactions: MajorFaction[]; minorFactions: MinorFaction[] }
  ) {
    // Make a copy of the faction data to avoid direct mutation
    this.modifiedFaction = { ...data.faction };
  }

  // Increment or decrement power
  adjustPower(amount: number) {
    this.modifiedFaction.power = (this.modifiedFaction.power || 0) + amount;
    console.log('faction', this.modifiedFaction)
  }

  // Adjust relationship with another PlayerFaction
  adjustRelationshipWithPF(factionId: string, amount: number) {
    const relationship = this.modifiedFaction.relationshipWithPF.find(rel => rel.factionId === factionId);
    console.log('add rel pf', factionId)
    if (relationship) {
      relationship.relationship += amount;
      relationship.modified = new Date();
    }
  }

  // Adjust relationship with a MajorFaction
  adjustRelationshipWithMafac(factionId: string, amount: number) {
    const relationship = this.modifiedFaction.relationshipWithMafac.find(rel => rel.factionId === factionId);
    if (relationship) {
      relationship.relationship += amount;
      relationship.modified = new Date();
    }
  }

  // Adjust relationship with a MinorFaction
  adjustRelationshipWithMifac(factionId: string, amount: number) {
    const relationship = this.modifiedFaction.relationshipWithMifac.find(rel => rel.factionId === factionId);
    if (relationship) {
      relationship.relationship += amount;
      relationship.modified = new Date();
    }
  }

  // Save modifications and close the dialog
  save() {
    this.dialogRef.close({
      action: 'save',
      data: { title: 'mifac-modif', content: this.modifiedFaction },
    });
  }

  // Cancel modifications and close the dialog
  cancel() {
    this.dialogRef.close({ action: 'cancel' });
  }
}
