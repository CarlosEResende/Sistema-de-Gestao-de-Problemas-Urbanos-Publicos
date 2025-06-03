import { Component } from '@angular/core';
import { UsuarioService } from '../../../core/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: false
})
export class NavbarComponent {

  constructor(
    public usuarioService: UsuarioService,
    private router: Router
  ) {}

  loginAsCidadao() {
    this.usuarioService.login('cidadao@teste.com', '123456').subscribe({
      next: () => this.router.navigate(['/cidadao/painel']),
      error: err => alert(err.message)
    });
  }

  loginAsAgente() {
    this.usuarioService.login('agente@teste.com', '123456').subscribe({
      next: () => this.router.navigate(['/agente']),
      error: err => alert(err.message)
    });
  }
  loginAsAgenteTwo() {
    this.usuarioService.login('agente2@teste.com', '123456').subscribe({
      next: () => this.router.navigate(['/agente']),
      error: err => alert(err.message)
    });
  }

  logout() {
    this.usuarioService.logout();
    this.router.navigate(['/auth/login']);
  }


}
