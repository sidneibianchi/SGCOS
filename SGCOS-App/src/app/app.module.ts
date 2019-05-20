import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule, ModalModule, TooltipModule, AccordionModule, BsDatepickerModule } from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateFormatPipePipe } from './_helps/DateFormatPipe.pipe';
import { HourFormatPipePipe } from './_helps/HourFormatPipe.pipe';
import { ClienteService } from './_services/Cliente.service';
import { ClientesComponent } from './clientes/clientes.component';

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      DateFormatPipePipe,
      HourFormatPipePipe,
      ClientesComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BsDropdownModule.forRoot(),
      ModalModule.forRoot(),
      TooltipModule.forRoot(),
      AccordionModule.forRoot(),
      BsDatepickerModule.forRoot()
   ],
   providers: [
      ClienteService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
