import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BsDropdownModule, ModalModule, TooltipModule, TabsModule, BsDatepickerModule, PopoverModule } from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { ClienteService } from './_services/Cliente.service';

import { NavComponent } from './nav/nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientesComponent } from './clientes/clientes.component';
import { EquipamentosComponent } from './equipamentos/equipamentos.component';
import { DateFormatPipePipe } from './_helps/DateFormatPipe.pipe';
import { HourFormatPipePipe } from './_helps/HourFormatPipe.pipe';
import { TituloComponent } from './_shared/titulo/titulo.component';
import { NgxMaskModule } from 'ngx-mask';
import { ServicosComponent } from './servicos/servicos.component';

import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { TouchSequence } from 'selenium-webdriver';
import { NgxCurrencyModule } from 'ngx-currency';
import { UsuariosComponent } from './user/usuarios/usuarios.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';



@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      DateFormatPipePipe,
      HourFormatPipePipe,
      ClientesComponent,
      EquipamentosComponent,
      DashboardComponent,
      TituloComponent,
      ServicosComponent,
      UserComponent,
      LoginComponent,
      RegistrationComponent,
      UsuariosComponent
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
      NgxMaskModule.forRoot(),
      NgxCurrencyModule,
      PopoverModule.forRoot(),
      PaginationModule.forRoot()

   ],
   providers: [
      ClienteService,
      {
         provide: HTTP_INTERCEPTORS,
         useClass: AuthInterceptor,
         multi: true
      }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
