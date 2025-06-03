import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Se usar ngModel

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
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
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCheckbox } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    LoginComponent,
    CadastroComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    MatIcon,
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
    MatToolbar,
    MatCheckbox,
  ]
})
export class AuthModule { }
