import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./users/users.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "users",
    component: UsersComponent
  }
];

@NgModule({
  declarations: [AppComponent, HomeComponent, UsersComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
