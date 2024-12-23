// src/app/app.component.ts
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { JsonService } from './json-service.service';
import { CommonModule, NgIf } from '@angular/common';
import { ModificationsPageComponent } from './modifications-page/modifications-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, NgIf, ModificationsPageComponent, RouterOutlet]
})
export class AppComponent {
  selectedFile: File | null = null;
  jsonData: any = null;  // Store loaded JSON data
  jsonLoaded: boolean = false;  // Flag to show the button conditionally

  constructor(private jsonService: JsonService, private router: Router) {}



  navigateToModifications() {
    this.router.navigate(['/modifications']);
  }

  navigateToLoreModifications() {
    this.router.navigate(['/lore']);
  }
}
