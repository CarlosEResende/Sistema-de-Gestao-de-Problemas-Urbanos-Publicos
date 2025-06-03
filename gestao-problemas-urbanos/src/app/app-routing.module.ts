import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'inicio',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'cidadao',
    loadChildren: () => import('./features/cidadao/cidadao.module').then(m => m.CidadaoModule)

  },
  {
    path: 'agente',
    loadChildren: () => import('./features/agente/agente.module').then(m => m.AgenteModule)

  },
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: '/inicio'

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
