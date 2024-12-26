export interface Faction {
  type: FactionType
  description?: string
  leader: Array<FactionPersona>
  associates: Array<FactionPersona>
}

export interface FactionPersona {
  name: string
  title: string
  description: string
}

export enum FactionType {
  PFAC = 'pfac',
  MAFAC = 'mafac',
  MIFAC = 'mifac'
}
