import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartService } from '../chart.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports implements OnInit{

  // private apiUrl_mat = 'http://ec2-54-174-121-211.compute-1.amazonaws.com:3000/data/maturity';
  private apiUrl_mat = 'http://localhost:3000/data/maturity';
  levels = ['Level-0', 'Level-1', 'Level-2', 'Level-3', 'Level-4', 'Level-5'];

  next12Months: any[] = [];
  next3Years: any[] = [];

  doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '80%',
    plugins: { legend: { display: false }, tooltip: { enabled: true } }
  };

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.http.get<any[]>(this.apiUrl_mat).subscribe(data => {
      console.log(data);
      this.next12Months = this.buildChartSet(data, 'Next 12 Months');
      this.next3Years  = this.buildChartSet(data, 'Next 1-3 Years');

      // This line is being added, so that the view will detect new chart objects immediately
      Promise.resolve().then(() => this.cdr.detectChanges());

      console.log('Next 12 Months Chart Data:', this.next12Months);
      console.log('Next 3 Years Chart Data:', this.next3Years);
    });
  }

  buildChartSet(data: any[], period: string) {
    return this.levels.map(level => {
      const record = data.find(d =>
        d.maturity_level === level &&
        d.period.toLowerCase().includes(period.toLowerCase())
      );

      const value = record?.percentage || 0;

      return {
        level,
        value,
        chartData: {
          labels: ['Achieved', 'Remaining'],
          datasets: [{
            data: [value, 100 - value],
            backgroundColor: [
            '#0f6e6b', // primary slice color
            '#b9dad8ff'  // remainder (light neutral)
          ],
          borderWidth: 0
          }]
        }
      };
    });
  }
}
