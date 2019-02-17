import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./main/users/users.component";
import { MainComponent } from './main/main.component';
import { ShiftComponent } from './main/shift/shift.component';
import { ReportComponent } from './main/report/report.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "epm",
    component: MainComponent,
    children: [
      {
        path: "users",
        component: UsersComponent
      },
      {
        path: "shifts",
        component: ShiftComponent
      },
      {
        path: "reports",
        component: ReportComponent
      }
    ]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    MainComponent,
    ShiftComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
