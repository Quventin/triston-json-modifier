// src/app/load-source/load-source.component.ts
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JsonService } from '../json-service.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-load-source',
  standalone: true,
  templateUrl: './load-source.component.html',
  styleUrls: ['./load-source.component.scss'],
  imports: [MatButtonModule],
})
export class LoadSourceComponent {
  selectedFile: File | null = null;

  constructor(private jsonService: JsonService, private snackBar: MatSnackBar) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile)
  }

  loadSource() {
    if (!this.selectedFile) {
      this.snackBar.open("No file selected.", "Close", { duration: 3000 });
      return;
    }

    this.jsonService.loadSource(this.selectedFile)
      .then(() => {
        this.snackBar.open("Source loaded successfully!", "Close", { duration: 3000 });
      })
      .catch((error) => {
        this.snackBar.open(error, "Close", { duration: 3000 });
      });
  }
}
