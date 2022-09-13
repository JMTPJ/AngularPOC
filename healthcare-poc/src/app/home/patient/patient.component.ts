import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GridComponent } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
import * as $ from 'jquery';
import { Gender, OxygenData, Patient } from 'src/shared/models/patient';
import { kedoGrid } from 'src/shared/models/common';
import { PatientService } from 'src/shared/services/patient.service';
import { HttpParams } from '@angular/common/http';
import { HttpsService } from 'src/shared/services/https.service';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent implements OnInit {
  gender = Gender;
  public gridView: unknown[] = [];
  public pageSize: number = 0;
  public skip: number = 0;
  public gridData!: kedoGrid;
  public data: Patient[] = [];
  public mySelection: string[] = [];
  public httpParams!: HttpParams;
  public searchData: string = '';
  public patientData!: Patient;
  basicData: any;
  @ViewChild('grid') grid!: GridComponent;
  filterForm = new FormGroup({
    searchKeyword: new FormControl('', [Validators.required]),
  });
  constructor(
    private patientService: PatientService,
    private http: HttpsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.gridData = {} as kedoGrid;
    this.pageSize = 10;
    this.getPatients();
  }
  ngAfterViewInit() {}
  deletePatient(data: any, event: Event) {
    this.confirmationService.confirm({
      target: event.target ? event.target : ({} as EventTarget),
      message: 'Are you sure that you want to Delete? ' + data.firstName,
      accept: () => {
        this.patientService.deletePatient(data.patientId).subscribe((res) => {
          if (res) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Delete Succssfully',
            });
            this.getPatients();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: 'Error occure while deletion',
            });
          }
        });
      },
    });
  }
  getPatients() {
    this.setHttpParam();
    this.patientService.getPatients(this.httpParams).subscribe((res) => {
      let data = res.data;
      data.forEach((element: any) => {
        element.firstName =
          element.firstName +
          (element.middleName ? ' ' + element.middleName + ' ' : ' ') +
          element.surname;
        element.chart = this.getOxigenData(element.oxygenData);
      });
      this.gridData.data = data;
      this.gridData.total = res.totalRexords;
      this.grid.pageSize = this.pageSize;
      this.grid.data = this.gridData;
    });
  }
  setHttpParam() {
    this.httpParams = new HttpParams()
      .set('pageIndex', this.skip)
      .set('pageSize', this.pageSize)
      .set('SearchKey', this.searchData);
  }
  pageChange(event: any) {
    this.skip = event.skip;
    this.pageSize = event.take;
    this.getPatients();
  }
  public onFilter(input: Event): void {
    const inputValue = (input.target as HTMLInputElement).value;
    this.gridView = process(this.gridData.data, {
      filter: {
        logic: 'or',
        filters: [
          {
            field: 'full_name',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'job_title',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'budget',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'phone',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'address',
            operator: 'contains',
            value: inputValue,
          },
        ],
      },
    }).data;
    this.grid.skip = 0;
  }
  getOxigenData(data: OxygenData[]) {
    let chartLabel = new Array<string>();
    let chartData = new Array<number>();
    data.forEach((x) => {
      let time = new Date(x.date);
      chartLabel.push(time.getHours().toString());
      chartData.push(x.rate);
    });
    let chart = {
      labels: chartLabel,
      datasets: [
        {
          label: 'Oxygen',
          data: chartData,
          fill: false,
          borderColor: '#42A5F5',
          tension: 0.4,
        },
      ],
    };
    return chart;
  }
  addPatient(selector: string, data?: any) {
    this.patientData = {} as Patient;
    if (data) {
      $('body').addClass('show-sidepanel');
      $('.side-panel-right.active').removeClass('active');
      var forwhich = $('.' + selector).attr('data-for');
      $('#' + selector).addClass('active');
      this.patientData = data;
    } else {
      this.patientData.patientCode =
        'PAT' + Math.floor(100000 + Math.random() * 900000);
      $('body').addClass('show-sidepanel');
      $('.side-panel-right.active').removeClass('active');
      var forwhich = $('.' + selector).attr('data-for');
      $('#' + selector).addClass('active');
    }
  }
  public photoURL(dataItem: any): string {
    if (dataItem.image.imagePath) {
      return 'data:image/png;base64,' + dataItem.image.imagePath;
    } else {
      return 'D:POCSNew Join POCapiHealthcarePocHealthcarePocwwwrootImagesDefault_Person_Image';
    }
  }
  public flagURL(dataItem: { country: string }): string {
    const code: string = dataItem.country;
    return '';
  }
  resetFilter() {}

  applyFilter(event: any) {}
}
