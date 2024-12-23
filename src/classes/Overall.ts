// src/app/models/overall.model.ts
import { Battle } from './Battle';
import { MajorFaction } from './MajorFactions';
import { MinorFaction } from './MinorFactions';
import { Player } from './Player';
import { PlayerFactions } from './PlayerFactions';

export class Overall {
  players: Array<Player> = [];
  playerFactions: Array<PlayerFactions> = [];
  mafac: Array<MajorFaction> = [];
  mifac: Array<MinorFaction> = [];
  gscCorruption: number = 0;
  chaosRace: number = 0;
  totalBattles: number = 0;
  totalDeaths: number = 0;
  version: number = 0; // Start at 0 by default
  battles: Array<Battle> = [];
}
