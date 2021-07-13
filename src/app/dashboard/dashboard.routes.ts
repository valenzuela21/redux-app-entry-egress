import {Routes} from "@angular/router";
import {StatisticsComponent} from "../entry-exit/statistics/statistics.component";
import {EntryExitComponent} from "../entry-exit/entry-exit.component";
import {DetailsComponent} from "../entry-exit/details/details.component";
export const DashboardRoutes: Routes = [
  {path: 'statistics', component: StatisticsComponent},
  {path: 'entry-exit', component: EntryExitComponent},
  {path: 'details', component: DetailsComponent},
  {path: '', component: StatisticsComponent},
];

