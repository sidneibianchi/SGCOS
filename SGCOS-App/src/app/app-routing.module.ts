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

const routes: Routes = [
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent }
    ]
  },
  {path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard]},
  {path: 'equipamentos', component: EquipamentosComponent, canActivate: [AuthGuard]},
  {path: 'servico/:idEquipamento/edit', component: ServicosComponent, canActivate: [AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
