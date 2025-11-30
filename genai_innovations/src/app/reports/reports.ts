import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartService } from '../chart.service';

@Component({
  selector: 'app-reports',
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports implements OnInit{

  data:any;

  constructor(private service:ChartService){}

  ngOnInit() {
    this.service.getReports().subscribe(res=>{
      this.data = res;
    });
  }
}
