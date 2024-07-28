import { Component, OnInit } from '@angular/core';
import { NewEntry } from './new-entry.model';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit {
  columns: any[] = [
    { field: 'name', header: 'Name' },
    { field: 'workouts', header: 'Workouts' },
    { field: 'numberOfWorkouts', header: 'Number of Workouts' },
    { field: 'totalWorkoutMinutes', header: 'Total Workout Minutes' },
  ];

  rawData: any[] = [];
  rows: any[] = [];
  filteredRows: any[] = [];
  globalFilter: string = '';
  workoutFilter: string = '';
  rowsPerPageOptions: number[] = [5, 10, 15, 20];
  rowsPerPage: number = 5;
  dialogVisible: boolean = false;
  newEntry: NewEntry = { name: '', workout: '', workoutMinutes: 0 };

  users: any[] = [];
  selectedUser: any;

  ngOnInit(): void {
    if (this.isLocalStorageAvailable()) {
      this.loadFromLocalStorage();
    } else {
      this.loadInitialData();
    }
    this.aggregateData();
    this.processUserData(this.rawData);
  }

  isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  loadFromLocalStorage(): void {
    const data = localStorage.getItem('workoutData');
    if (data) {
      this.rawData = JSON.parse(data);
    } else {
      this.loadInitialData();
      this.saveToLocalStorage();
    }
  }

  loadInitialData(): void {
    this.rawData = [
      { name: 'John Doe', workout: 'Running', workoutMinutes: 30 },
      { name: 'John Doe', workout: 'Cycling', workoutMinutes: 45 },
      { name: 'Jane Smith', workout: 'Swimming', workoutMinutes: 50 },
      { name: 'Jane Smith', workout: 'Running', workoutMinutes: 30 },
    ];
  }

  saveToLocalStorage(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('workoutData', JSON.stringify(this.rawData));
    }
  }

  aggregateData(): void {
    const aggregatedData = this.rawData.reduce((acc, cur) => {
      const found = acc.find((item: any) => item.name === cur.name);
      if (found) {
        found.numberOfWorkouts += 1;
        found.totalWorkoutMinutes += cur.workoutMinutes;
        const workoutsSet = new Set(found.workouts.split(', '));
        workoutsSet.add(cur.workout);
        found.workouts = Array.from(workoutsSet).join(', ');
      } else {
        acc.push({
          name: cur.name,
          workouts: cur.workout,
          numberOfWorkouts: 1,
          totalWorkoutMinutes: cur.workoutMinutes,
        });
      }
      return acc;
    }, []);

    this.rows = aggregatedData;
    this.filteredRows = [...this.rows];
  }

  processUserData(data: any[]) {
    const userMap = data.reduce((acc, cur) => {
      if (!acc[cur.name]) {
        acc[cur.name] = {
          label: cur.name,
          value: { running: 0, cycling: 0, swimming: 0 },
        };
      }
      acc[cur.name].value[cur.workout.toLowerCase()] += cur.workoutMinutes;
      return acc;
    }, {});

    this.users = Object.values(userMap);
    if (this.users.length > 0) {
      this.selectedUser = this.users[0];
    }
  }

  onGlobalFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.globalFilter = input.value.toLowerCase();
    this.applyFilters();
  }

  onWorkoutFilterChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.workoutFilter = select.value;
    this.applyFilters();
  }

  applyFilters(): void {
    let filteredData = [...this.rows];

    if (this.globalFilter) {
      filteredData = filteredData.filter((row) =>
        Object.values(row).some((value: any) =>
          value.toString().toLowerCase().includes(this.globalFilter)
        )
      );
    }

    if (this.workoutFilter) {
      filteredData = filteredData.filter((row) =>
        row.workouts.toLowerCase().includes(this.workoutFilter.toLowerCase())
      );
    }

    this.filteredRows = filteredData;
  }

  showDialog(): void {
    this.dialogVisible = true;
  }

  hideDialog(): void {
    this.dialogVisible = false;
  }

  addWorkout(newEntry: NewEntry): void {
    this.rawData.push(newEntry);
    if (this.isLocalStorageAvailable()) {
      this.saveToLocalStorage();
    }
    this.aggregateData();
    this.processUserData(this.rawData);
    this.hideDialog();
  }
}
