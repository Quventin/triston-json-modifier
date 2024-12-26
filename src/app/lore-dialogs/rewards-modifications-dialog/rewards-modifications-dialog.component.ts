import { Component } from '@angular/core';
import {
  HirableSpecialUnitFormComponent
} from "../../shared/hirable-special-unit-form/hirable-special-unit-form.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {WeaponFormComponent} from "../../shared/weapon-form/weapon-form.component";

@Component({
  selector: 'app-rewards-modifications-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, WeaponFormComponent, HirableSpecialUnitFormComponent],
  templateUrl: './rewards-modifications-dialog.component.html',
  styleUrl: './rewards-modifications-dialog.component.scss'
})
export class RewardsModificationsDialogComponent {
  reward = {
    mifacName: '',
    item: {
      name: '',
      description: '',
      isWeapon: false,
      weaponValue: null,
    },
    specialUnit: {
      name: '',
      credit: 0,
      move: 0,
      ws: 0,
      bs: 0,
      str: 0,
      tough: 0,
      wound: 0,
      init: 0,
      attack: 0,
      ld: 0,
      cl: 0,
      will: 0,
      intel: 0,
      weapons: [],
      skills: [],
      wargear: [],
      abilities: [],
    },
  };
}
