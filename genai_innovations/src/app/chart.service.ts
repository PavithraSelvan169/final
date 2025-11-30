import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ChartService {

  private http = inject(HttpClient);

  getSummary() {
    return this.http.get<any>('/api/chart/summary');
  }

  getReports() {
    return this.http.get<any>('/api/chart/reports');
  }
}
