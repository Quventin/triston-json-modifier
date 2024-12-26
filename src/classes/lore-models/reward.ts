export interface Reward {
  mifacName: string
  item: RewardItem
  specialUnit: HirableSpecialUnit
}

export interface RewardItem {
  name: string
  description: string
  isWeapon: boolean
  weaponValue: Weapon
}

export interface Weapon {
  weaponType: string
  weaponCharacteristics: Array<WeaponCharacteristic>
}

export interface WeaponCharacteristic  {
  name: string
  rangeShort: number
  rangeLong: number
  accShort: number
  accLong: number
  strength: number
  ap: number
  damage: number
  traits: Array<string>
  cost: number
}

export interface HirableSpecialUnit {
  name: string
  credit: number
  move: number
  ws: number
  bs: number
  str: number
  tough: number
  wound:number
  init: number
  attack: number
  ld: number
  cl: number
  will: number
  intel: number
  weapons: Array<WeaponCharacteristic>
  skills: Array<string>
  wargear: Array<string>
  abilities: Array<ability>
}

export interface ability {
  name: string
  description: string
}
