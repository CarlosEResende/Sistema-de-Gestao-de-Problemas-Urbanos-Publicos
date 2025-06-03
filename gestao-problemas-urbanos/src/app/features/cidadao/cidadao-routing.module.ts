import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PainelCidadaoComponent } from './painel-cidadao/painel-cidadao.component';
import { FormularioProblemaComponent } from './formulario-problema/formulario-problema.component';
import { DetalhesProblemaCidadaoComponent } from './detalhes-problema-cidadao/detalhes-problema-cidadao.component';

const routes: Routes = [
  {
    path: 'painel',
    component: PainelCidadaoComponent
  },
  {
    path: 'problema/novo',
    component: FormularioProblemaComponent
  },
  {
    path: 'problema/editar/:id',
    component: FormularioProblemaComponent
  },
  {
    path: 'problema/:id',
    component: DetalhesProblemaCidadaoComponent
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
export class CidadaoRoutingModule { }
