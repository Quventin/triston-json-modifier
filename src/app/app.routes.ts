// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ModificationsPageComponent } from './modifications-page/modifications-page.component';
import {LoreModificationsComponent} from "./lore-modifications/lore-modifications.component";


export const routes: Routes = [
  { path: '', redirectTo: '/modifications', pathMatch: 'full' }, // Ensure pathMatch is a literal "full"
  {
    path: 'modifications',
    component: ModificationsPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'lore',
    component: LoreModificationsComponent,
    pathMatch: 'full'
  },
];
