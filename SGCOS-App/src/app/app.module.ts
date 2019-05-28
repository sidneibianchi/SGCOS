import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule, ModalModule, TooltipModule, TabsModule, BsDatepickerModule } from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { ClienteService } from './_services/Cliente.service';

import { NavComponent } from './nav/nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteEditComponent } from './clientes/cliente-edit/cliente-edit.component';
import { ChamadosComponent } from './chamados/chamados.component';
import { EquipamentosComponent } from './equipamentos/equipamentos.component';
import { DateFormatPipePipe } from './_helps/DateFormatPipe.pipe';
import { HourFormatPipePipe } from './_helps/HourFormatPipe.pipe';
import { TituloComponent } from './_shared/titulo/titulo.component';
import { NgxMaskModule } from 'ngx-mask';
import { ServicosComponent } from './servicos/servicos.component';

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      DateFormatPipePipe,
      HourFormatPipePipe,
      ClientesComponent,
      ClienteEditComponent,
      ChamadosComponent,
      EquipamentosComponent,
      DashboardComponent,
      TituloComponent,
      ServicosComponent
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
      TabsModule.forRoot(),
      TooltipModule.forRoot(),
      BsDatepickerModule.forRoot(),
      NgxMaskModule.forRoot()
   ],
   providers: [
      ClienteService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
