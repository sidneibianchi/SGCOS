import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule, ModalModule, TooltipModule, AccordionModule, BsDatepickerModule } from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { ClienteService } from './_services/Cliente.service';

import { NavComponent } from './nav/nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ChamadosComponent } from './chamados/chamados.component';
import { ChamadoEditComponent } from './chamados/chamado-edit/chamado-edit.component';
import { EquipamentosComponent } from './equipamentos/equipamentos.component';
import { DateFormatPipePipe } from './_helps/DateFormatPipe.pipe';
import { HourFormatPipePipe } from './_helps/HourFormatPipe.pipe';
import { TituloComponent } from './_shared/titulo/titulo.component';

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      DateFormatPipePipe,
      HourFormatPipePipe,
      ClientesComponent,
      ChamadosComponent,
      ChamadoEditComponent,
      EquipamentosComponent,
      DashboardComponent,
      TituloComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot(),
      BsDropdownModule.forRoot(),
      ModalModule.forRoot(),
      TooltipModule.forRoot(),
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
