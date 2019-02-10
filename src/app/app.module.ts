import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./main/users/users.component";
import { MainComponent } from './main/main.component';
import { ShiftComponent } from './main/shift/shift.component';
import { ReportComponent } from './main/report/report.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "epm",
    component: MainComponent
  },
  {
    path: "epm/users",
    component: UsersComponent
  },
  {
    path: "epm/shifts",
    component: ShiftComponent
  },
  {
    path: "epm/reports",
    component: ReportComponent
  }
];

@NgModule({
  declarations: [AppComponent, HomeComponent, UsersComponent, MainComponent, ShiftComponent, ReportComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
