// src/app/create-source/create-source.component.ts
import { Component } from '@angular/core';
import { JsonService } from '../json-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-source',
  standalone: true,
  templateUrl: './create-source.component.html',
  styleUrls: ['./create-source.component.scss'],
  imports: [MatButtonModule],
})
export class CreateSourceComponent {
  constructor(private jsonService: JsonService, private snackBar: MatSnackBar) {}

  createSource() {
    this.jsonService.createSource();
    this.snackBar.open("Source created successfully", "Close", { duration: 3000 });
  }
}
