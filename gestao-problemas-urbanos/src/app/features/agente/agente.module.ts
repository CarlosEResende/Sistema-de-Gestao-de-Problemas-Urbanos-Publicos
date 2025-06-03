import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgenteRoutingModule } from './agente-routing.module';
import { PainelAgenteComponent } from './painel-agente/painel-agente.component';
import { RouterModule } from '@angular/router';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipListbox, MatChipsModule } from '@angular/material/chips';
import { MatList, MatListItem } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner, MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { DetalhesProblemaAgenteComponent } from './detalhes-problema-agente/detalhes-problema-agente.component';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';

@NgModule({
  declarations: [
    PainelAgenteComponent,
    DetalhesProblemaAgenteComponent
  ],
  imports: [
    MatSidenavContainer,
    MatSidenavContent,
    MatGridList,
    MatPaginator,
    MatGridTile,
    CommonModule,
    AgenteRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbar,
    MatMenu,
    MatToolbarRow,
    MatProgressBar,
    MatBadgeModule,
    MatMenuModule,
    MatChipListbox,
    MatExpansionModule,
    MatStep,
    MatStepper,
    MatTableModule,
    MatCardModule,
    MatChipsModule,
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
    MatProgressSpinner,
  ]

})
export class AgenteModule { }
