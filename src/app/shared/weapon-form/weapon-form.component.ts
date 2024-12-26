import {Component, Input} from '@angular/core';
import {Weapon, WeaponCharacteristic} from "../../../classes/lore-models/reward";
import {WeaponCharacteristicFormComponent} from "../weapon-characteristic-form/weapon-characteristic-form.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-weapon-form',
  standalone: true,
  imports: [CommonModule, FormsModule, WeaponCharacteristicFormComponent],
  templateUrl: './weapon-form.component.html',
  styleUrl: './weapon-form.component.scss'
})
export class WeaponFormComponent {
  @Input() weapon: Weapon = {
    weaponType: '',
    weaponCharacteristics: [] ,
  };

  addCharacteristic() {
    this.weapon.weaponCharacteristics.push({
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
    });
  }
}
