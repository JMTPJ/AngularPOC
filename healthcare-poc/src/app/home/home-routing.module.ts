import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home.component';
import { PatientComponent } from './patient/patient.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    children:[{
      path:'home',
      component:DashboardComponent
    },
    {
      path:'patiants',
      component:PatientComponent

    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
