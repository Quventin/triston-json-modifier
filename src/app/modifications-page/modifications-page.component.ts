// src/app/modifications-page/modifications-page.component.ts
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { JsonService } from '../json-service.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MinorFactionDialogComponent } from '../dialogs/minor-faction-dialog/minor-faction-dialog.component';
import { Overall } from '../../classes/Overall';
import { MajorFaction } from '../../classes/MajorFactions';
import { MinorFaction } from '../../classes/MinorFactions';
import { PlayerFactions } from '../../classes/PlayerFactions';
import { MajorFactionDialogComponent } from '../dialogs/major-faction-dialog/major-faction-dialog.component';
import { PlayerFactionDialogComponent } from '../dialogs/player-faction-dialog/player-faction-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { JsonDialogComponent } from '../dialogs/json-dialog/json-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PlayerDialogComponent } from '../dialogs/player-dialog/player-dialog.component';
import { Player } from '../../classes/Player';
import { PlayerModificationDialogComponent } from '../dialogs/player-modification-dialog/player-modification-dialog.component';
import { MajorFactionModificationDialogComponent } from '../dialogs/major-faction-modification-dialog/major-faction-modification-dialog.component';
import { PlayerFactionModificationDialogComponent } from '../dialogs/player-faction-modification-dialog/player-faction-modification-dialog.component';
import { MinorFactionModificationDialogComponent } from '../dialogs/minor-faction-modification-dialog/minor-faction-modification-dialog.component';
import { BattleModificationDialogComponent } from '../dialogs/battle-modification-dialog/battle-modification-dialog.component';
import { Battle } from '../../classes/Battle';

@Component({
  selector: 'app-modifications-page',
  standalone: true,
  templateUrl: './modifications-page.component.html',
  styleUrls: ['./modifications-page.component.scss'],
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatDialogModule,
  ],
})
export class ModificationsPageComponent {
  @Input() initialData: any; // Receives loaded JSON data from AppComponent
  modifications: any[] = [];
  selectedModification: any | null = null;
  selectedFile: File | null = null;
  jsonData: any = null;  // Store loaded JSON data
  jsonLoaded: boolean = false;  // Flag to show the button conditionally

  constructor(
    private router: Router,
    private jsonService: JsonService,
    private dialog: MatDialog
  ) {
    // Retrieve data from the navigation state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.modifications = navigation.extras.state['data'];
    }
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
        this.initialData = this.jsonData
      })
      .catch((error) => {
        alert(error);
      });
  }

  // Get the power of the player's house based on houseId
  getHousePower(houseId: string): number | null {
    const house =
      this.initialData.playerFactions.find((f: any) => f.id === houseId) ||
      this.initialData.mifac.find((f: any) => f.id === houseId);
    return house ? house.power : null;
  }

  // Get the relationship value with the player's house
  getRelationshipWithHouse(player: Player): number | null {
    const houseId = player.houseId;
    const relationship = houseId.startsWith('pfac')
      ? player.relationshipWithPF.find((rel) => rel.factionId === houseId)
      : player.relationshipWithMifac.find((rel) => rel.factionId === houseId);
    return relationship ? relationship.relationship : null;
  }

  // Get Minor Factions with isGsc set to true
  getGscMinorFactions(): MinorFaction[] {
    return this.initialData.mifac.filter((faction: any) => faction.isGsc);
  }

  openMifacDialog() {
    const dialogRef = this.dialog.open(MinorFactionDialogComponent, {
      width: '50%',
      height: '50%',
      data: { overallData: this.modifications },
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

  openPlayerModificationDialog(player: Player) {
    const dialogRef = this.dialog.open(PlayerModificationDialogComponent, {
      width: '600px',
      data: {
        player,
        playerFactions: this.initialData.playerFactions,
        minorFactions: this.initialData.mifac,
      },
    });

    // Handle dialog result
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.action === 'save') {
        this.modifications = [
          ...this.modifications,
          {
            title: result.data.title,
            content: JSON.stringify(result.data.content),
          },
        ];
      }
    });
  }

  openMajorFactionModificationDialog(faction: MajorFaction) {
    const dialogRef = this.dialog.open(
      MajorFactionModificationDialogComponent,
      {
        width: '600px',
        data: { faction },
      }
    );

    // Handle dialog result
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.action === 'save') {
        this.modifications = [
          ...this.modifications,
          {
            title: result.data.title,
            content: JSON.stringify(result.data.content),
          },
        ];
      }
    });
  }

  openPlayerFactionModificationDialog(faction: PlayerFactions) {
    const dialogRef = this.dialog.open(
      PlayerFactionModificationDialogComponent,
      {
        width: '600px',
        data: {
          faction,
          playerFactions: this.initialData.playerFactions,
          majorFactions: this.initialData.mafac,
          minorFactions: this.initialData.mifac,
        },
      }
    );

    // Handle dialog result
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.action === 'save') {
        this.modifications = [
          ...this.modifications,
          {
            title: result.data.title,
            content: JSON.stringify(result.data.content),
          },
        ];
      }
    });
  }

  openMinorFactionModificationDialog(faction: MinorFaction) {
    const dialogRef = this.dialog.open(
      MinorFactionModificationDialogComponent,
      {
        width: '600px',
        data: {
          faction,
          playerFactions: this.initialData.playerFactions,
          majorFactions: this.initialData.mafac,
          minorFactions: this.initialData.mifac,
        },
      }
    );

    // Handle dialog result
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.action === 'save') {
        this.modifications = [
          ...this.modifications,
          {
            title: result.data.title,
            content: JSON.stringify(result.data.content),
          },
        ];
      }
    });
  }

  openMafacDialog() {
    const dialogRef = this.dialog.open(MajorFactionDialogComponent, {
      width: '50%',
      height: '50%',
      data: { overallData: this.modifications },
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

  openPFacDialog() {
    const dialogRef = this.dialog.open(PlayerFactionDialogComponent, {
      width: '50%',
      height: '50%',
      data: { overallData: this.modifications },
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

  openPlayerDialog() {
    console.log('inidata', this.initialData);
    const dialogRef = this.dialog.open(PlayerDialogComponent, {
      width: '50%',
      height: '50%',
      data: { overallData: this.initialData },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.action === 'save') {
        console.log('result');
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

  openBattleDialog() {
    const dialogRef = this.dialog.open(BattleModificationDialogComponent, {
      width: '90%',
      height: '90%',
      data: {
        players: this.initialData.players,
        playerFactions: this.initialData.playerFactions,
        mafac: this.initialData.mafac,
        mifac: this.initialData.mifac,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.action === 'save') {
        console.log('result', result);
        this.modifications = [
          ...this.modifications,
          {
            title: result.data.title,
            content: JSON.stringify(result.data.content),
          },
        ];
      }
    });
  }

  openJsonDialog(mod: any) {
    this.dialog.open(JsonDialogComponent, {
      data: { content: mod.content },
      width: '600px',
    });
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }


  saveModifications() {
    // Initialize the overall object
    // Start with the existing overall data from initialData
    const overall = new Overall();
    Object.assign(overall, this.initialData); // Copy existing data to retain values
    overall.players.forEach((p) => {
      if(p.isRetired === undefined || p.isRetired === null) {
        p.isRetired = false;
      }
    })
    // Merge modifications into the overall object
    console.log('modific', this.modifications);
    overall.mifac = this.mergeUniqueFactions(
      overall.mifac,
      'mifac'
    ) as MinorFaction[];
    overall.mafac = this.mergeUniqueFactions(
      overall.mafac,
      'mafac'
    ) as MajorFaction[];
    overall.playerFactions = this.mergeUniqueFactions(
      overall.playerFactions,
      'playerFactions'
    ) as PlayerFactions[];

    // Handle players modifications specifically
    const playerMod = this.modifications.find((mod) => mod.title === 'players');
    if (playerMod) {
      const newPlayers =JSON.parse(playerMod.content) as Player[]; // Update players array
      overall.players = [...overall.players, ...newPlayers]
      // Assign each player's ID to the respective faction
      overall.players.forEach((player) => {
        if (player.houseId.startsWith('pfac')) {
          // Find the PlayerFaction and add the player's ID to it
          const faction = overall.playerFactions.find(
            (pf) => pf.id === player.houseId
          );
          if (faction) {
            if (!faction.playerIds.includes(player.id)) {
              faction.playerIds.push(player.id);
            }
          }
        } else if (player.houseId.startsWith('mifac')) {
          // Find the MinorFaction and add the player's ID to it
          const faction = overall.mifac.find((mf) => mf.id === player.houseId);
          if (faction) {
            // Ensure playerIds is initialized
            faction.playerIds = faction.playerIds || [];

            if (!faction.playerIds.includes(player.id)) {
              faction.playerIds.push(player.id);
            }
          }
        }
      });
    }
    const battlesMod = this.modifications.filter((mod) => mod.title === 'battle');
    if (battlesMod) {
      const battles = battlesMod.map((v) => ( JSON.parse(v.content) as Battle) )
      this.administerBattles(overall, battles.flat());
      overall.battles = [...overall.battles, ...battles.flat()];

    }
    console.log('overall after stuff', overall);
    // Process the new modifications last
    this.processSpecialModifications(overall);
    console.log('overall after process');

    // Update the version number
    overall.version = (overall.version ?? 0) + 0.1;

    const chaosMain = overall.playerFactions.find((v) => v.id === 'pfac-7917')
    const chaosMifacs = overall.mifac.filter((v) => v.isChaos)
    const chaosPower = chaosMifacs.reduce((total, item) => total + (item.power ?? 0), 0);
    chaosMain!.power = chaosPower
    overall.gscCorruption = overall.mifac.find((v) => v.id === 'mifac-3064')?.power ?? 0;
    // Save the updated overall object to JSON
    this.jsonService.saveJsonFile(overall);
  }

  administerBattles(overall: Overall, battles: Battle[]) {
    battles.forEach((battle) => {
      if (!battle.isDraw) {
        battle.players.forEach((p) => {
          const originPlayer = overall.players.find((v) => v.id === p.id);
          console.log('player Name:', originPlayer!.name)
          const originFaction =
            originPlayer?.isChaos || originPlayer?.isGsc
              ? overall.mifac.find((v) => v.id === originPlayer.houseId)
              : overall.playerFactions.find(
                  (v) => originPlayer?.houseId === v.id
                );
          console.log('faction name:', originFaction!.name)
          console.log('faction power:', originFaction!.power)
          // originFaction!.power =
          //   (originFaction!.power || 0) + (p.winner ? 1 : -1);
          if(p.winner) {
            originFaction!.power = (originFaction!.power || 0) + 1
          } else if(!battle.isDraw) {
            originFaction!.power = (originFaction!.power || 0) - 1
          }
          const ownRel =  originPlayer?.isChaos || originPlayer?.isGsc
          ? originPlayer?.relationshipWithMifac.find(
            (v) => v.factionId === originPlayer.houseId
          ) :  originPlayer?.relationshipWithPF.find(
            (v) => v.factionId === originPlayer.houseId
          )
          console.log('player win?:', p.winner)
          console.log('faction power after mod:', originFaction!.power)
          console.log('Relationship before:', ownRel!.relationship)
          ownRel!.relationship =
            (ownRel!.relationship || 0) + (p.winner ? 1 : 0);
          ownRel!.modified = new Date();
          originPlayer!.battles++;
          console.log('Relationship after:', ownRel!.relationship)
          if (p.subPlot) {
            const faction = originPlayer?.relationshipWithPF.find(
              (v) => v.factionId === p.subPlotRelationId
            );
            console.log('subplot faction', faction!.name)
            faction!.relationship = (ownRel!.relationship || 0) + 1;
          }

          if (p.sideMission) {
            const sideType = p.sideMissionRelationId?.split('-')[0];
            const faction =
              sideType === 'mifac'
                ? originPlayer?.relationshipWithMifac.find(
                    (v) => v.factionId === p.sideMissionRelationId
                  )
                : originPlayer?.relationshipWithPF.find(
                    (v) => v.factionId === p.sideMissionRelationId
                  );
            faction!.relationship = (ownRel!.relationship || 0) + 1;
          }
        });
      }
    });
  }

  downloadJson() {
    this.jsonService.downloadJson();
  }

  // Helper method to merge unique factions without overwriting existing data
  mergeUniqueFactions(originalFactions: any[], type: string): any[] {
    const newFactions = this.mergeModifications(type);
    const mergedFactions = [...originalFactions];

    newFactions.forEach((newFaction: any) => {
      if (!originalFactions.some((faction) => faction.id === newFaction.id)) {
        mergedFactions.push(newFaction);
      }
    });

    return mergedFactions;
  }

  // Helper method to merge modifications of the same type
  mergeModifications(type: string) {
    return this.modifications
      .filter((mod) => mod.title === type)
      .reduce((acc, mod) => [...acc, ...JSON.parse(mod.content)], []);
  }

  normalizeFactions() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Are you sure you want to normalize factions?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.jsonService.normalizeFactions(this.initialData);
      }
    });
  }

  processSpecialModifications(overall: Overall) {
    this.modifications.forEach((modification) => {
      if (modification.title === 'mafac-modif') {
        const modifiedFaction = JSON.parse(modification.content);
        const originalFaction = overall.mafac.find(
          (f) => f.id === modifiedFaction.id
        );
        if (originalFaction) {
          this.applyModificationsToObject(originalFaction, modifiedFaction);
        }
      } else if (modification.title === 'mifac-modif') {
        const modifiedFaction = JSON.parse(modification.content);
        const originalFaction = overall.mifac.find(
          (f) => f.id === modifiedFaction.id
        );
        if (originalFaction) {
          this.applyModificationsToObject(originalFaction, modifiedFaction);
        }
      } else if (modification.title === 'player-modif') {
        const modifiedPlayer = JSON.parse(modification.content);
        const originalPlayer = overall.players.find(
          (p) => p.id === modifiedPlayer.id
        );
        if (originalPlayer) {
          this.applyModificationsToObject(originalPlayer, modifiedPlayer);
        }
      } else if (modification.title === 'pfac-modif') {
        const modifiedFaction = JSON.parse(modification.content);
        const originalFaction = overall.playerFactions.find(
          (f) => f.id === modifiedFaction.id
        );
        if (originalFaction) {
          this.applyModificationsToObject(originalFaction, modifiedFaction);
        }
      }
    });
  }

  applyModificationsToObject(original: any, modified: any) {
    for (const key in modified) {
      if (key === 'power') {
        original.power = modified.power;
      } else if (modified[key] !== null && modified[key] !== 0) {
        if (typeof modified[key] === 'number') {
          // If the property is a number, add the difference
          original[key] = (original[key] || 0) + modified[key];
        } else {
          // For non-numeric properties (e.g., strings), replace the value directly
          original[key] = modified[key];
        }
      }
    }
  }

  deleteModification(index: number) {
    this.modifications = this.modifications.filter((_, i) => i !== index);
  }
}
