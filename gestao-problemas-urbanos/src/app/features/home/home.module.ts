import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    TelaInicialComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCardModule,
    MatDividerModule,
    MatToolbarModule
  ],
})
export class HomeModule { }
