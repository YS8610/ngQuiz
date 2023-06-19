import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QnPageComponent } from './qn-page/qn-page.component';

const routes: Routes = [
  {path:":test/:number",component:QnPageComponent},
  {path:"",component:HomeComponent},
  {path:"**",redirectTo:""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
