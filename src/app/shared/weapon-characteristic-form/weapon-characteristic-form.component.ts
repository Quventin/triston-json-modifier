import {Component, Input} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {WeaponCharacteristic} from "../../../classes/lore-models/reward";

@Component({
  selector: 'app-weapon-characteristic-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weapon-characteristic-form.component.html',
  styleUrl: './weapon-characteristic-form.component.scss'
})
export class WeaponCharacteristicFormComponent {
  @Input() characteristic: WeaponCharacteristic = {
    name: '',
    rangeShort: 0,
    rangeLong: 0,
    accShort: 0,
    accLong: 0,
    strength: 0,
    ap: 0,
    damage: 0,
    traits: [],
    cost: 0,
  };
  traitsString = '';

  parseTraits() {
    this.characteristic.traits = this.traitsString.split(',').map((t) => t.trim());
  }
}
