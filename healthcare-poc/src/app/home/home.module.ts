import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientComponent } from './patient/patient.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import {TabMenuModule} from 'primeng/tabmenu';
import { AddPatientComponent } from './patient/add-patient/add-patient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SplitterModule} from 'primeng/splitter';
import {ButtonModule} from 'primeng/button';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
//import { ChartsModule } from "@progress/kendo-angular-charts";
import { InputsModule } from "@progress/kendo-angular-inputs";
import {RadioButtonModule} from 'primeng/radiobutton';
import {SliderModule} from 'primeng/slider';
import { GridModule, PDFModule, ExcelModule } from '@progress/kendo-angular-grid';
import { PatientService } from 'src/shared/services/patient.service';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from "primeng/toast";
import {ChartModule} from 'primeng/chart';
@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    PatientComponent,
    TopMenuComponent,
    AddPatientComponent        
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TabMenuModule,
    FormsModule,
    ReactiveFormsModule,
    SplitterModule,
    ButtonModule,
    ConfirmPopupModule,
    RadioButtonModule,
    SliderModule,
    GridModule,
    InputsModule,
    PDFModule,
    ExcelModule,
    ConfirmDialogModule,
    ToastModule,
    ChartModule
    
  ],
  providers:[PatientService,ConfirmationService,MessageService]
})
export class HomeModule { 
}
