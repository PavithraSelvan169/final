import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, HttpClientModule, BaseChartDirective],
  templateUrl: './summary.html',
  styleUrl: './summary.css',
})

export class Summary implements OnInit {
  @ViewChild(BaseChartDirective) chart_imp?: BaseChartDirective;
  @ViewChild(BaseChartDirective) chart_adopt?: BaseChartDirective;

  constructor(private http: HttpClient) { }

  private apiUrl_imp = 'http://ec2-54-174-121-211.compute-1.amazonaws.com:3000/data/dataset1';
  private apiUrl_adopt = 'http://ec2-54-174-121-211.compute-1.amazonaws.com:3000/data/dataset2';

  doughnutChartType: ChartType = 'doughnut';


  doughnutChartData_imp: ChartConfiguration['data'] = {
    labels: [],
    datasets: [{ data: [] }]
  };
  doughnutChartData_adopt: ChartConfiguration['data'] = {
    labels: [],
    datasets: [{ data: [] }]
  };

  doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right'
      }
    }
  };






  ngOnInit(): void {
    console.log('entered oninit');
    this.loadChartData_imp();
    this.loadChartData_adopt();
  }

  private loadChartData_imp(): void {
    const token = localStorage.getItem('access_token');
    console.log('token received:');
    console.log(token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any[]>(this.apiUrl_imp, { headers }).subscribe({
      next: (response) => {

        this.doughnutChartData_imp.labels!.length = 0;
        this.doughnutChartData_imp.labels!.push(...response.map(item => item.implementation_strategy));

        //       this.doughnutChartLabels = [
        //   'Have started exploring the potential',
        //   'Considering experimenting/deploying (6-12 months)',
        //   'Piloting initial use cases',
        //   'Implemented at partial scale',
        //   'Implemented at scale'
        // ];


        // const percentages_imp = response.map(item => item.percentage);


        this.doughnutChartData_imp.datasets[0].data!.length = 0;
        this.doughnutChartData_imp.datasets[0].data!.push(...response.map(item => item.percentage));

        // const baseColor = '#36A2EB'; // blue
        // const baseColor = '#7abde9ff'; // blue
        const n = response.length;
        this.doughnutChartData_imp.datasets[0].backgroundColor = this.generateSubtleColors(n);
        // this.doughnutChartData.datasets[0].backgroundColor = this.generateShades(baseColor, n);

        this.chart_imp?.update();


      },
      error: (err) => {
        console.error('Error loading adoption data - dataset1', err);
      }

    });
  }



  private loadChartData_adopt(): void {
    const token = localStorage.getItem('access_token');
    console.log('token received:');
    console.log(token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any[]>(this.apiUrl_adopt, { headers }).subscribe({
      next: (response) => {

        this.doughnutChartData_adopt.labels!.length = 0;
        this.doughnutChartData_adopt.labels!.push(...response.map(item => item.current_state_of_adoption));

        //       this.doughnutChartLabels = [
        //   'Have started exploring the potential',
        //   'Considering experimenting/deploying (6-12 months)',
        //   'Piloting initial use cases',
        //   'Implemented at partial scale',
        //   'Implemented at scale'
        // ];


        // const percentages_adopt = response.map(item => item.percentage);


        this.doughnutChartData_adopt.datasets[0].data!.length = 0;
        this.doughnutChartData_adopt.datasets[0].data!.push(...response.map(item => item.percentage));

        // const baseColor = '#36A2EB'; // blue
        // const baseColor = '#7abde9ff'; // blue
        const n = response.length;
        this.doughnutChartData_adopt.datasets[0].backgroundColor = this.generateSubtleColors(n);
        // this.doughnutChartData.datasets[0].backgroundColor = this.generateShades(baseColor, n);

        this.chart_adopt?.update();


      },
      error: (err) => {
        console.error('Error loading adoption data - dataset1', err);
      }

    });
  }




  private generateShades(baseColor: string, n: number): string[] {
    const shades: string[] = [];
    // Convert hex to RGB
    const r = parseInt(baseColor.slice(1, 3), 16);
    const g = parseInt(baseColor.slice(3, 5), 16);
    const b = parseInt(baseColor.slice(5, 7), 16);

    for (let i = 0; i < n; i++) {
      const factor = 0.5 + 0.5 * (i / (n - 1)); // between 0.5 → 1
      const newR = Math.min(255, Math.round(r * factor));
      const newG = Math.min(255, Math.round(g * factor));
      const newB = Math.min(255, Math.round(b * factor));
      shades.push(`rgb(${newR}, ${newG}, ${newB})`);
    }
    return shades;
  }


  private generateColors(n: number): string[] {
  const colors: string[] = [];
  const saturation = 70; // percentage
  const lightness = 50;  // percentage

  for (let i = 0; i < n; i++) {
    const hue = Math.round((360 * i) / n); // rotate around color wheel
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }
  return colors;
}

private generateSubtleColors(n: number): string[] {
  const colors: string[] = [];
  const saturation = 40; // lower saturation for soft look
  const lightness = 65;  // brighter/muted

  for (let i = 0; i < n; i++) {
    const hue = Math.round((360 * i) / n); // evenly spaced hues
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }
  return colors;
}

}
