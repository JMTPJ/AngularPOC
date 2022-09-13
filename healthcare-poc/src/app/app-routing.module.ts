import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'login',
   component:LoginComponent},
   {
    path:'poc',
    loadChildren:()=>{
      return import('./home/home.module').then(
        (x)=>x.HomeModule
      )
    }
   },
  //  {
  //   path:'**',
  //   redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
