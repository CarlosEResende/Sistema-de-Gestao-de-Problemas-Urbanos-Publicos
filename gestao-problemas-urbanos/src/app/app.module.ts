import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbar,
    MatCard,
    MatCardContent,
    MatDivider,
    MatIconModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
