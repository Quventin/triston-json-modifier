import {Component, Input} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HirableSpecialUnit} from "../../../classes/lore-models/reward";

@Component({
  selector: 'app-hirable-special-unit-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hirable-special-unit-form.component.html',
  styleUrl: './hirable-special-unit-form.component.scss'
})
export class HirableSpecialUnitFormComponent {
  @Input() specialUnit: HirableSpecialUnit = {
    name: '',
    credit: 0,
    move: 0,
    ws: 0,
    bs: 0,
    str: 0,
    tough: 0,
    wound:0,
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
  };
}
