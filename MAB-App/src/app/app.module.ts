import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule, ModalModule, TooltipModule, AccordionModule, BsDatepickerModule } from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutosbuscaComponent } from './autosbusca/autosbusca.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoBuscaService } from './_services/AutoBusca.service';
import { DateFormatPipePipe } from './_helps/DateFormatPipe.pipe';
import { HourFormatPipePipe } from './_helps/HourFormatPipe.pipe';
import { InqueritosComponent } from './inqueritos/inqueritos.component';
import { InqueritoService } from './_services/Inquerito.service';

@NgModule({
   declarations: [
      AppComponent,
      AutosbuscaComponent,
      NavComponent,
      DateFormatPipePipe,
      HourFormatPipePipe,
      InqueritosComponent
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
      AutoBuscaService,
      InqueritoService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
