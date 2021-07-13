import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Chart Ng2
import * as ng2 from 'ng2-charts';
import {DashboardRoutersModule} from "../dashboard/dashboard.routers.module";

import {EntryExitComponent} from "./entry-exit.component";
import {StatisticsComponent} from "./statistics/statistics.component";
import {DetailsComponent} from "./details/details.component";
import {ReactiveFormsModule} from "@angular/forms";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {SharedModule} from "../shared/shared.module";
import {StoreModule} from "@ngrx/store";

import {entryExitReducer} from "./entry-exit.reducer";


@NgModule({
  declarations: [
    DashboardComponent,
    EntryExitComponent,
    StatisticsComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('entryExit', entryExitReducer),
    ng2.ChartsModule,
    ReactiveFormsModule,
    SharedModule,
    DashboardRoutersModule
  ],

})
export class EntryExitModule { }
