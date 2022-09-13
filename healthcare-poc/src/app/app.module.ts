import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [BrowserAnimationsModule, AppRoutingModule, ButtonModule, HttpClientModule],
  
  bootstrap: [AppComponent],
})
export class AppModule {}
