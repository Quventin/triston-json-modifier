// src/app/json.service.ts
import {Injectable} from '@angular/core';
import {saveAs} from 'file-saver';
import {Overall} from '../classes/Overall';
import {RelationWithFaction} from '../classes/RelationshWithFaction';

@Injectable({
  providedIn: 'root',
})
export class JsonService {
  private jsonData: any = {};
  private fileName = 'overall.json';
  createSource() {
    this.jsonData = { Overall: {} }; // Initialize empty Overall object
    this.saveJsonFile(this.jsonData);
  }

  loadSource(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          this.jsonData = JSON.parse(event.target?.result as string);
          resolve(this.jsonData);
        } catch (error) {
          reject('Error parsing JSON');
        }
      };
      reader.onerror = () => reject('Error reading file');
      reader.readAsText(file);
    });
  }

  downloadJson() {
    const blob = new Blob([JSON.stringify(this.jsonData, null, 2)], {
      type: 'application/json',
    });
    saveAs(blob, 'modifications.json');
  }

  saveJsonFile(overall: Overall) {
    const jsonBlob = new Blob([JSON.stringify(overall, null, 2)], {
      type: 'application/json',
    });
    saveAs(jsonBlob, this.fileName);
  }

  async normalizeFactions(data: Overall) {
    if (!data) return;
    console.log('normalise', data)
    const overall: Overall = { ...data };

    // Normalize relationships for each faction type
    this.normalizeRelationships(overall.mifac, overall.mifac, 'mifac', 'mifac');
    this.normalizeRelationships(overall.mifac, overall.mafac, 'mifac', 'mafac');
    this.normalizeRelationships(
      overall.mifac,
      overall.playerFactions,
      'mifac',
      'playerFactions'
    );
    this.normalizeRelationships(overall.mafac, overall.mifac, 'mafac', 'mifac');
    this.normalizeRelationships(overall.mafac, overall.mafac, 'mafac', 'mafac');
    this.normalizeRelationships(
      overall.mafac,
      overall.playerFactions,
      'mafac',
      'playerFactions'
    );
    this.normalizeRelationships(
      overall.playerFactions,
      overall.mifac,
      'playerFactions',
      'mifac'
    );
    this.normalizeRelationships(
      overall.playerFactions,
      overall.mafac,
      'playerFactions',
      'mafac'
    );
    this.normalizeRelationships(
      overall.playerFactions,
      overall.playerFactions,
      'playerFactions',
      'playerFactions'
    );

    // Save the updated overall object
    this.saveJsonFile(overall);
  }

  private normalizeRelationships(
    sourceFactions: any[],
    targetFactions: any[],
    soruceType: string,
    targetType: string
  ) {
    for (const source of sourceFactions) {
      for (const target of targetFactions) {
        if (source.id !== target.id) {
          this.ensureBidirectionalRelationship(
            source,
            target,
            soruceType,
            targetType
          );
        }
      }
    }
  }

  private ensureBidirectionalRelationship(
    source: any,
    target: any,
    soruceType: string,
    targetType: string
  ) {
    // Determine the correct relationship array based on the targetType
    const sourceRelationshipArray = this.getRelationshipArray(
      source,
      targetType
    );
    const targetRelationshipArray = this.getRelationshipArray(
      target,
      soruceType
    );

    // Check if a relationship exists from source to target and vice versa
    let sourceToTarget = sourceRelationshipArray.find(
      (rel: RelationWithFaction) => rel.factionId === target.id
    );
    let targetToSource = targetRelationshipArray.find(
      (rel: RelationWithFaction) => rel.factionId === source.id
    );

    // If the relationship does not exist, initialize it with 0
    if (!sourceToTarget) {
      sourceToTarget = {
        factionId: target.id,
        name: target.name,
        relationship: 0,
        modified: new Date(2000, 0, 1, 0, 0, 0),
      };
      sourceRelationshipArray.push(sourceToTarget);
    }
    if (!targetToSource) {
      targetToSource = {
        factionId: source.id,
        name: source.name,
        relationship: 0,
        modified: new Date(2000, 0, 1, 0, 0, 0),
      };
      targetRelationshipArray.push(targetToSource);
    }

    // Determine the most recently modified relationship
    const isSourceNewer =
      new Date(sourceToTarget.modified).getTime() >
      new Date(targetToSource.modified).getTime();
    if(source.name === 'Goliath' || target.name ==='Goliath') {
      console.log('source', source)
      console.log('target', target)
    }

    if (isSourceNewer) {
      targetToSource.relationship = sourceToTarget.relationship;
      targetToSource.modified = sourceToTarget.modified;
    } else {
      sourceToTarget.relationship = targetToSource.relationship;
      sourceToTarget.modified = targetToSource.modified;
    }
  }

  // Helper function to get the correct relationship array based on the targetType
  private getRelationshipArray(
    faction: any,
    targetType: string
  ): RelationWithFaction[] {
    switch (targetType) {
      case 'playerFactions':
        return faction.relationshipWithPF;
      case 'mafac':
        return faction.relationshipWithMafac;
      case 'mifac':
        return faction.relationshipWithMifac;
      default:
        throw new Error(`Unknown faction type: ${targetType}`);
    }
  }
}
