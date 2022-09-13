import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  items!: MenuItem[];
  constructor() { }

  ngOnInit() {
    this.items = [
        {label: 'Home', icon: 'pi pi-fw pi-home',routerLink:'./home'},
        {label: 'Patiants', icon: 'pi pi-fw pi-users',routerLink:'./patiants'},
        {label: 'Doctor'},   
        {label: 'LogOut', icon: 'pi pi-fw pi-sign-out',routerLink:'/login'},    
    ];
}

}
