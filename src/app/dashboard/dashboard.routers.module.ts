import {NgModule} from '@angular/core';
import {DashboardComponent} from "./dashboard.component";
import {DashboardRoutes} from "./dashboard.routes";
//import {AuthGuard} from "../services/auth.guard";
import {RouterModule, Routes} from "@angular/router";

const routesChildren: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: DashboardRoutes,
    //canActivate: [AuthGuard]
  },
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routesChildren)
  ],
  exports:[
    RouterModule
  ]
})
export class DashboardRoutersModule {
}
