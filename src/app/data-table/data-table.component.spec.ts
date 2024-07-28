import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTableComponent } from './data-table.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataTableComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load data from local storage if available', () => {
    const testData = [
      { name: 'Test User', workout: 'Test Workout', workoutMinutes: 10 },
    ];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(testData));

    component.ngOnInit();
    expect(component.rawData).toEqual(testData);
  });

  it('should load default data if local storage is empty', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const expectedData = [
      { name: 'John Doe', workout: 'Running', workoutMinutes: 30 },
      { name: 'John Doe', workout: 'Cycling', workoutMinutes: 45 },
      { name: 'Jane Smith', workout: 'Swimming', workoutMinutes: 50 },
      { name: 'Jane Smith', workout: 'Running', workoutMinutes: 30 },
    ];

    component.ngOnInit();
    expect(component.rawData).toEqual(expectedData);
  });

  it('should save data to local storage', () => {
    const testData = [
      { name: 'Test User', workout: 'Test Workout', workoutMinutes: 10 },
    ];
    spyOn(localStorage, 'setItem');

    component.rawData = testData;
    component.saveToLocalStorage();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'workoutData',
      JSON.stringify(testData)
    );
  });

  it('should aggregate data correctly', () => {
    component.rawData = [
      { name: 'John Doe', workout: 'Running', workoutMinutes: 30 },
      { name: 'John Doe', workout: 'Cycling', workoutMinutes: 45 },
      { name: 'Jane Smith', workout: 'Swimming', workoutMinutes: 50 },
      { name: 'Jane Smith', workout: 'Running', workoutMinutes: 30 },
      { name: 'Jane Smith', workout: 'Running', workoutMinutes: 30 },
    ];

    component.aggregateData();

    const expectedRows = [
      {
        name: 'John Doe',
        workouts: 'Running, Cycling',
        numberOfWorkouts: 2,
        totalWorkoutMinutes: 75,
      },
      {
        name: 'Jane Smith',
        workouts: 'Swimming, Running',
        numberOfWorkouts: 3,
        totalWorkoutMinutes: 110,
      },
    ];

    expect(component.rows).toEqual(expectedRows);
  });

  it('should apply global filter correctly', () => {
    component.rows = [
      {
        name: 'John Doe',
        workouts: 'Running, Cycling',
        numberOfWorkouts: 2,
        totalWorkoutMinutes: 75,
      },
      {
        name: 'Jane Smith',
        workouts: 'Swimming, Running',
        numberOfWorkouts: 3,
        totalWorkoutMinutes: 110,
      },
    ];

    component.globalFilter = 'john';
    component.applyFilters();

    expect(component.filteredRows.length).toBe(1);
    expect(component.filteredRows[0].name).toBe('John Doe');
  });

  it('should apply workout filter correctly', () => {
    component.rows = [
      {
        name: 'John Doe',
        workouts: 'Running, Cycling',
        numberOfWorkouts: 2,
        totalWorkoutMinutes: 75,
      },
      {
        name: 'Jane Smith',
        workouts: 'Swimming, Running',
        numberOfWorkouts: 3,
        totalWorkoutMinutes: 110,
      },
    ];

    component.workoutFilter = 'Swimming';
    component.applyFilters();

    expect(component.filteredRows.length).toBe(1);
    expect(component.filteredRows[0].name).toBe('Jane Smith');
  });

  it('should add new workout and update local storage', () => {
    const newEntry = {
      name: 'New User',
      workout: 'New Workout',
      workoutMinutes: 20,
    };
    spyOn(localStorage, 'setItem');

    component.addWorkout(newEntry);

    expect(component.rawData).toContain(newEntry);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'workoutData',
      JSON.stringify(component.rawData)
    );
  });
});
