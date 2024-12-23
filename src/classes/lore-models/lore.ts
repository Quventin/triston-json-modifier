import {Faction} from "./faction";
import {Radio} from "./radio";

export interface Lore {
  factionLore: Array<Faction>
  radioBroadcasts: Array<Radio>
}
