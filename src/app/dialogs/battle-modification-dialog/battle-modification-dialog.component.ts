import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {Battle, PlayerInBattle} from '../../../classes/Battle';
import {Player} from '../../../classes/Player';
import {
  provideNativeDateAdapter,
} from '@angular/material/core';
import {CommonModule, NgFor} from '@angular/common';
import {MajorFaction} from '../../../classes/MajorFactions';
import {MinorFaction} from '../../../classes/MinorFactions';
import {PlayerFactions} from '../../../classes/PlayerFactions';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-battle-modification-dialog',
  standalone: true,
  templateUrl: './battle-modification-dialog.component.html',
  styleUrls: ['./battle-modification-dialog.component.scss'],
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
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
    FormsModule,
    MatDatepickerModule,
  ],
})
export class BattleModificationDialogComponent {
  battles: Battle[] = []; // Array for table
  newBattle: Battle = {
    id: '',
    players: [],
    isEvent: false,
    isFlashpoint: false,
    isDraw: false,
    scenarioName: '',
    date: new Date(),
  };

  scenarioList: string[] = ['SaSh - Pit Showdown',
    'SaSh - Guilder Storehouse Heist', 'SaSh - The Flood', 'SaSh - Train Robbery',
    'SaSh - Roadblock', 'SaSh - Catacomb extermination', 'BW - Rumble in the Jungle',
    'BW - Glowshroom Harvest', 'BW - Into the Thicket', 'BW - Ther Raft Rush', 'BW - Bog Brawl',
    'BW - Burning Bloom', 'AA - Race against the Dusk', 'AA - Grand Theft Hauler', 'AA - Caravan Carnage',
    'AA - Its Raining Scrap', 'AA - Grit and Glory', 'AA - The Great Wurm Chase', 'DT - High Ground Hussle',
    'DT - Current Crisis', 'DT - Skyfall Scramble', 'DT - Precarious Plunder', 'DT - High Ground Havoc',
    'DT - Skyline Sabotage', 'Other'];
  selectedScenario: string = this.scenarioList[0];

  players: Player[] = [];
  allPlayers: Player[] = [];
  selectedPlayers: PlayerInBattle[] = [];
  winners: Set<string> = new Set<string>();
  allFactions: Array<any> = [];

  constructor(private cd: ChangeDetectorRef,
              private dialogRef: MatDialogRef<BattleModificationDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data: {
                players: Player[];
                playerFactions: PlayerFactions[];
                mafac: MajorFaction[];
                mifac: MinorFaction[];
              }
  ) {
    this.players = data.players;
    this.allPlayers = this.players;
    this.allFactions = [
      ...this.data.playerFactions.map((f) => ({id: f.id, name: f.name})),
      ...this.data.mifac.map((f) => ({id: f.id, name: f.name})),
      ...this.data.mafac.map((f) => ({id: f.id, name: f.name})),
    ];
  }

  // Generate a unique ID for each battle
  generateId() {
    return `battle-${Math.floor(Math.random() * 10000)}`;
  }

  // Add a new battle to the list
  addBattle() {
    this.newBattle.id = this.generateId();
    this.newBattle.scenarioName =
      this.selectedScenario === 'Other'
        ? this.newBattle.scenarioName
        : this.selectedScenario;

    // Assign players and winners
    this.newBattle.players = this.selectedPlayers
    this.battles = [...this.battles, this.newBattle];
    // this.battles.push({ title: this.newBattle.scenarioName, content: { ...this.newBattle } });
    this.resetForm();
  }

  // Reset the form
  resetForm() {
    this.newBattle = {
      id: '',
      players: [],
      isEvent: false,
      isFlashpoint: false,
      isDraw: false,
      scenarioName: '',
      date: new Date(),
    };
    this.selectedScenario = this.scenarioList[0];
    this.selectedPlayers = [];
    this.allPlayers = this.players
    this.winners.clear();
    this.cd.detectChanges();

  }

  // Save modifications and close dialog
  save() {
    this.dialogRef.close({
      action: 'save',
      data: {title: 'battle', content: this.battles},
    });
  }

  // Cancel and close dialog
  cancel() {
    this.dialogRef.close({action: 'cancel'});
  }

  // Get related factions for sideMission and subPlot dropdowns
  getRelatedFactions(): { id: string; name: string }[] {
    return [
      ...this.data.playerFactions.map((f) => ({id: f.id, name: f.name})),
      ...this.data.mifac.map((f) => ({id: f.id, name: f.name})),
      ...this.data.mafac.map((f) => ({id: f.id, name: f.name})),
    ];
  }

  getPlayerFactions(): { id: string; name: string }[] {
    return this.data.playerFactions.map((f) => ({id: f.id, name: f.name}));
  }

  removeBattles(index: number) {
    this.battles = this.battles.filter((_, i) => i !== index);
  }

  toggleWinner(player: Player) {
    if (this.winners.has(player.id)) {
      this.winners.delete(player.id);
    } else {
      this.winners.add(player.id);
    }
  }

  togglePlayerSelection(player: Player) {
    console.log('togglePlayer');
    if (this.selectedPlayers.filter((v) => v.id === player.id).length > 0) {
      this.selectedPlayers = this.selectedPlayers.filter(
        (p) => p.id !== player.id
      );
    } else {
      console.log('adding new selected player');
      const newSelectedPlaye: PlayerInBattle = {
        id: player.id,
        name: player.name,
        sideMission: false,
        sideMissionRelationId: '',
        subPlot: false,
        winner: false,
        subPlotRelationId: '',
      };
      this.selectedPlayers = [...this.selectedPlayers, newSelectedPlaye];
    }
  }

  onSideMissionChange(player: any) {
    if (!player.sideMission) {
      // If unchecked, reset sideMissionRelationId
      player.sideMissionRelationId = null;
    }
  }

  onSideMissionSelection(player: any, event: any) {
    // Set sideMissionRelationId to the selected item's ID
    player.sideMissionRelationId = event.value;
  }

  onSubPlotChange(player: any) {
    if (!player.subPlot) {
      // If unchecked, reset subPlotRelationId
      player.subPlotRelationId = null;
    }
  }

  onSubPlotSelection(player: any, event: any) {
    // Set subPlotRelationId to the selected item's ID
    player.subPlotRelationId = event.value;
  }

  isPlayerSelected(player: { id: string; name: string }): boolean {
    return this.selectedPlayers.findIndex((v) => v.id === player.id) > -1
  }

}
