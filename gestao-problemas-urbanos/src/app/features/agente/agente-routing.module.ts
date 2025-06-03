import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PainelAgenteComponent } from './painel-agente/painel-agente.component';
import { DetalhesProblemaAgenteComponent } from './detalhes-problema-agente/detalhes-problema-agente.component';

const routes: Routes = [
  {
    path: 'painel',
    component: PainelAgenteComponent
  },
  {
    path: 'problema/:id',
    component: DetalhesProblemaAgenteComponent
  },
  {
    path: '',
    redirectTo: 'painel',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgenteRoutingModule { }
