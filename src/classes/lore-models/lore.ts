import {Faction} from "./faction";
import {Radio} from "./radio";
import {Bounty} from "./bounty";

export interface Lore {
  factionLore: Array<Faction>
  radioBroadcasts: Array<Radio>
  bounties: Array<Bounty>
}
