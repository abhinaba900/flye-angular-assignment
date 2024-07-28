import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DataVisualizationComponent } from './data-visualization.component';
import { DialogModule } from 'primeng/dialog';
import { ListboxModule } from 'primeng/listbox';
import { ChartModule } from 'primeng/chart';

describe('DataVisualizationComponent', () => {
  let component: DataVisualizationComponent;
  let fixture: ComponentFixture<DataVisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataVisualizationComponent],
      imports: [FormsModule, DialogModule, ListboxModule, ChartModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DataVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show dialog when showDialog is called', () => {
    component.showDialog();
    expect(component.displayModal).toBeTrue();
  });

  it('should set selectedUser on init', () => {
    component.users = [
      { label: 'John Doe', value: { running: 30, cycling: 45 } },
    ];
    component.ngOnInit();
    expect(component.selectedUser).toEqual(component.users[0]);
  });

  it('should update chartData on user select', () => {
    const user = { label: 'John Doe', value: { running: 30, cycling: 45 } };
    component.selectedUser = user;
    component.updateChartData();
    expect(component.chartData).toEqual({
      labels: ['running', 'cycling'],
      datasets: [
        {
          label: 'Minutes',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [30, 45],
        },
      ],
    });
  });

  it('should filter out zero values in chartData', () => {
    const user = {
      label: 'John Doe',
      value: { running: 30, cycling: 0, swimming: 50 },
    };
    component.selectedUser = user;
    component.updateChartData();
    expect(component.chartData).toEqual({
      labels: ['running', 'swimming'],
      datasets: [
        {
          label: 'Minutes',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [30, 50],
        },
      ],
    });
  });
});
