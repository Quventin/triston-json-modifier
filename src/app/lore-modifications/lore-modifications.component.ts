import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {JsonService} from "../json-service.service";
import {MatDialog} from "@angular/material/dialog";
import {CommonModule, JsonPipe, NgIf, SlicePipe} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {JsonDialogComponent} from "../dialogs/json-dialog/json-dialog.component";
import {MinorFactionDialogComponent} from "../dialogs/minor-faction-dialog/minor-faction-dialog.component";
import {
  RadioModificationDialogComponent
} from "../lore-dialogs/radio-modification-dialog/radio-modification-dialog.component";
import {
  FactionLoreModificationDialogComponent
} from "../lore-dialogs/faction-lore-modification-dialog/faction-lore-modification-dialog.component";

@Component({
  selector: 'app-lore-modifications',
  standalone: true,
  imports: [
    CommonModule,
    JsonPipe,
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatRow,
    MatRowDef,
    MatTable,
    SlicePipe,
    NgIf
  ],
  templateUrl: './lore-modifications.component.html',
  styleUrl: './lore-modifications.component.scss'
})
export class LoreModificationsComponent {
  selectedFile: File | null = null;
  jsonData: any = null;  // Store loaded JSON data
  jsonLoaded: boolean = false;  // Flag to show the button conditionally
  modifications: any[] = [];
  constructor(
    private router: Router,
    private jsonService: JsonService,
    private dialog: MatDialog
  ) {
  }

  createSource() {
    this.jsonService.createSource();
    alert("Source created and downloaded as source.json");
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  loadSource() {
    if (!this.selectedFile) {
      alert("No file selected.");
      return;
    }

    this.jsonService.loadSource(this.selectedFile)
      .then((data) => {
        console.log("Loaded JSON data:", data);
        alert("Source loaded successfully!");
        this.jsonData = data;  // Store the loaded JSON data
        this.jsonLoaded = true; // Set flag to true to show the button

      })
      .catch((error) => {
        alert(error);
      });
  }

  openJsonDialog(mod: any) {
    this.dialog.open(JsonDialogComponent, {
      data: { content: mod.content },
      width: '600px',
    });
  }

  saveModifications() {

  }

  openRadioDialog() {
    const dialogRef = this.dialog.open(RadioModificationDialogComponent, {
      width: '50%',
      height: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.action === 'save') {
        this.modifications = [
          ...this.modifications,
          {
            title: result.data.title,
            content: JSON.stringify(result.data[result.data.title.toString()]),
          },
        ];
      }
    });
  }

  openLoreDialog() {
    const dialogRef = this.dialog.open(FactionLoreModificationDialogComponent, {
      width: '50%',
      height: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.action === 'save') {
        this.modifications = [
          ...this.modifications,
          {
            title: result.data.title,
            content: JSON.stringify(result.data[result.data.title.toString()]),
          },
        ];
      }
    });
  }

  deleteModification(index: number){
    this.modifications = this.modifications.filter((_, i) => i !== index);
  }
}
