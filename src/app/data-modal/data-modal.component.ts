import { Component, EventEmitter, Output, Input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-modal',
  templateUrl: './data-modal.component.html',
  styleUrls: ['./data-modal.component.css'],
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    FormsModule,
    
  ],
})
export class AppDataModalComponent {
  @Input() visible: boolean = false;
  @Output() workoutAdded = new EventEmitter<any>();

  newEntry = { name: '', workout: '', workoutMinutes: '' };

  isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  showDialog() {
    this.visible = true;
  }

  hideDialog() {
    this.visible = false;
  }

  addWorkout() {
    if (
      this.newEntry.name &&
      this.newEntry.workout &&
      this.newEntry.workoutMinutes
    ) {
      // Save to local storage
      if (this.isLocalStorageAvailable()) {
        const data = localStorage.getItem('workoutData');
        let workoutData = data ? JSON.parse(data) : [];
        workoutData.push(this.newEntry);
        localStorage.setItem('workoutData', JSON.stringify(workoutData));
      }

      // Emit the new entry to the parent component
      this.workoutAdded.emit(this.newEntry);

      // Reset the form
      this.hideDialog();
      this.newEntry = { name: '', workout: '', workoutMinutes: '' };
    }
  }
}
