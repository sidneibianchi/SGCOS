import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { EquipamentosComponent } from './equipamentos/equipamentos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ServicosComponent } from './servicos/servicos.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { AuthGuard } from './auth/auth.guard';
import { UsuariosComponent } from './user/usuarios/usuarios.component';

const routes: Routes = [
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
      {path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard]}
    ]
  },
  {path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard]},
  {path: 'equipamentos/:idCliente/edit', component: EquipamentosComponent, canActivate: [AuthGuard]},
  {path: 'equipamentos', component: EquipamentosComponent, canActivate: [AuthGuard]},
  {path: 'servicos/:idEquipamento/edit', component: ServicosComponent, canActivate: [AuthGuard]},
  {path: 'servicos', component: ServicosComponent, canActivate: [AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'clientes', pathMatch: 'full'},
  {path: '**', redirectTo: 'clientes', pathMatch: 'full'}
  /*{path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '**', redirectTo: 'dashboard', pathMatch: 'full'}*/
];

@NgModule({
   imports: [
      RouterModule.forRoot(routes)
   ],
   exports: [
      RouterModule
   ],
   declarations: [
   ]
})
export class AppRoutingModule { }
