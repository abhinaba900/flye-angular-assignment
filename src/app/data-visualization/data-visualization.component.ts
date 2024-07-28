import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-data-visualization',
  templateUrl: './data-visualization.component.html',
  styleUrls: ['./data-visualization.component.css'],
})
export class DataVisualizationComponent implements OnInit, OnChanges {
  @Input() users: any[] = [];
  @Input() selectedUser: {
    label: string;
    value: { [key: string]: number };
  } | null = null;

  chartData: any;
  displayModal: boolean = false;

  showDialog() {
    this.displayModal = true;
  }

  ngOnInit() {
    if (this.users.length > 0) {
      this.selectedUser = this.users[0];
      this.updateChartData();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['users'] && this.selectedUser) {
      this.updateChartData();
    }
  }

  onUserSelect(event: any) {
    this.selectedUser = event.value;
    this.updateChartData();
  }

  updateChartData() {
    if (!this.selectedUser) {
      this.chartData = null;
      return;
    }

    const entries = Object.entries(this.selectedUser.value).filter(
      ([key, value]: [string, number]) => value > 0
    );
    const labels = entries.map(([key]) => key);
    const data = entries.map(([, value]) => value);

    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Minutes',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: data,
        },
      ],
    };
  }
}
