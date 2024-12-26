import { Component } from '@angular/core';
import {Faction, FactionType} from "../../../classes/lore-models/faction";
import {MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButton, MatButtonModule, MatIconButton} from "@angular/material/button";
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
import {MatIcon} from "@angular/material/icon";
import {MatInput, MatInputModule} from "@angular/material/input";
import {CommonModule, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";

@Component({
  selector: 'app-faction-lore-modification-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButton,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,],
  templateUrl: './faction-lore-modification-dialog.component.html',
  styleUrl: './faction-lore-modification-dialog.component.scss'
})
export class FactionLoreModificationDialogComponent {
  factionTypes = Object.values(FactionType);
  faction: Faction = {
    type: FactionType.PFAC,
    description: '',
    leader: [],
    associates: [],
  };

  constructor(public dialogRef: MatDialogRef<FactionLoreModificationDialogComponent>) {}

  addAssociate(): void {
    this.faction.associates.push({
      name: '',
      title: '',
      description: '',
    });
  }

  addLeader(): void {
    this.faction.leader.push({
      name: '',
      title: '',
      description: '',
    });
  }

  save(): void {
    this.dialogRef.close({
      action: 'save',
      data: { title: 'faction', content: this.faction },
    });
  }
}
