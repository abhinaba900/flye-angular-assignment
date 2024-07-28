import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppDataModalComponent } from './data-modal.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

describe('AppDataModalComponent', () => {
  let component: AppDataModalComponent;
  let fixture: ComponentFixture<AppDataModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppDataModalComponent],
      imports: [DialogModule, ButtonModule, FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show and hide the dialog', () => {
    component.showDialog();
    expect(component.visible).toBeTrue();

    component.hideDialog();
    expect(component.visible).toBeFalse();
  });

  it('should emit new workout entry and save to local storage', () => {
    const newEntry = {
      name: 'Test User',
      workout: 'Test Workout',
      workoutMinutes: 30,
    };
    spyOn(localStorage, 'setItem');
    spyOn(component.workoutAdded, 'emit');

    component.newEntry = { ...newEntry };
    component.addWorkout();

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'workoutData',
      jasmine.any(String)
    );
    expect(component.workoutAdded.emit).toHaveBeenCalledWith(newEntry);
    expect(component.newEntry).toEqual({
      name: '',
      workout: '',
      workoutMinutes: '',
    });
    expect(component.visible).toBeFalse();
  });

  it('should check for local storage availability', () => {
    expect(component.isLocalStorageAvailable()).toBeTrue();
  });

  it('should not add workout if form is incomplete', () => {
    spyOn(localStorage, 'setItem');
    spyOn(component.workoutAdded, 'emit');

    component.newEntry = {
      name: 'Test User',
      workout: '',
      workoutMinutes: 30 || '',
    };
    component.addWorkout();

    expect(localStorage.setItem).not.toHaveBeenCalled();
    expect(component.workoutAdded.emit).not.toHaveBeenCalled();
  });
});
