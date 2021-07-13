import { Component, OnInit } from '@angular/core';

import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import {EntryExit} from "../../models/entry-exit.model";
import {filter} from "rxjs/operators";

//Charts Ng2
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import {AppStateWithEntry} from "../entry-exit.reducer";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styles: [
  ]
})
export class StatisticsComponent implements OnInit {

  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';

  entry: number = 0;
  egress: number = 0;

  totalEntry: number = 0;
  totalEgress: number = 0;

  constructor(
    public store: Store<AppStateWithEntry>
  ) {}

  ngOnInit(): void {
    this.store.select('entryExit')
      .pipe( filter(({items}) => Object.values(items).length > 0 ))
      .subscribe(({items})=> this.generateStatistics(items))
  }

  generateStatistics(items: EntryExit[] ){
    items.forEach(item=>{
      if(item.type === 'egress'){
        this.totalEgress += parseInt(item.amount);
        this.egress++;
      }else{
        this.totalEntry += parseInt(item.amount);
        this.entry++;
      }
    })
    this.doughnutChartData = [[this.totalEntry, this.totalEgress]]
  }


  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
