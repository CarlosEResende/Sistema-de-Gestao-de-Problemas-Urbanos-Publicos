import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CidadaoRoutingModule } from './cidadao-routing.module';
import { PainelCidadaoComponent } from './painel-cidadao/painel-cidadao.component';
import { FormularioProblemaComponent } from './formulario-problema/formulario-problema.component';
import { DetalhesProblemaCidadaoComponent } from './detalhes-problema-cidadao/detalhes-problema-cidadao.component';
import { RouterModule } from '@angular/router';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatList, MatListItem } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatToolbar } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    PainelCidadaoComponent,
    FormularioProblemaComponent,
    DetalhesProblemaCidadaoComponent
  ],
  imports: [
    CommonModule,
    CidadaoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatExpansionModule,
    MatStep,
    MatStepper,
    MatTableModule,
    MatCardModule,
    MatAccordion,
    MatChipsModule,
    MatList,
    MatListItem,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDividerModule,
    MatProgressBar,
    MatToolbar,

  ]

})
export class CidadaoModule { }
