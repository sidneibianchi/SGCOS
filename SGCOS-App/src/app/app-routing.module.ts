import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteEditComponent } from './clientes/cliente-edit/cliente-edit.component';
import { ChamadosComponent } from './chamados/chamados.component';
import { EquipamentosComponent } from './equipamentos/equipamentos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ServicosComponent } from './servicos/servicos.component';

const routes: Routes = [
  {path: 'clientes', component: ClientesComponent},
  {path: 'cliente/:id/edit', component: ClienteEditComponent},
  {path: 'chamados', component: ChamadosComponent},
  {path: 'equipamentos', component: EquipamentosComponent},
  {path: 'servico/:idEquipamento/edit', component: ServicosComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
