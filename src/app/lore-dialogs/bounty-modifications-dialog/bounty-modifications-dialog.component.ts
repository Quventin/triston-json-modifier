import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogRef} from "@angular/material/dialog";
import {Bounty} from "../../../classes/lore-models/bounty";

@Component({
  selector: 'app-bounty-modifications-dialog',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,],
  templateUrl: './bounty-modifications-dialog.component.html',
  styleUrl: './bounty-modifications-dialog.component.scss'
})
export class BountyModificationsDialogComponent {
  bounties: Bounty[] = [];
  newBounty: Partial<Bounty> = {};
  factions: string[] = ['PlayerFaction1', 'MiFac1', 'MaFac1', 'PlayerFaction2'];

  dateCycle: number = 1;
  dateWeek: number = 1;

  constructor(private dialogRef: MatDialogRef<BountyModificationsDialogComponent>) {}

  addBounty() {
    if (this.newBounty.author && this.newBounty.description && this.newBounty.reward) {
      this.newBounty.date = `Cycle ${this.dateCycle} Week ${this.dateWeek}`;
      this.newBounty.isCanceled = false;
      this.newBounty.image = this.newBounty.image || 'default.png';
      this.newBounty.id = this.generateId();

      this.bounties.push(this.newBounty as Bounty);
      this.resetForm();
    }
  }

  deleteBounty(index: number) {
    this.bounties.splice(index, 1);
  }

  resetForm() {
    this.newBounty = {};
    this.dateCycle = 1;
    this.dateWeek = 1;
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    this.dialogRef.close({
      action: 'save',
      data: {title: 'bounty', content: this.bounties},
    });
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}
