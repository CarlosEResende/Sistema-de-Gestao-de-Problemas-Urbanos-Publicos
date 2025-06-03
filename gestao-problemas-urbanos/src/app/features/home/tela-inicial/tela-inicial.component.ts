import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from '../../../core/models/usuario.model';
import { UsuarioService } from '../../../core/services/usuario.service';

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.css'],
  standalone: false,
})
export class TelaInicialComponent implements OnInit {
  usuarioLogado$: Observable<Usuario | null>;

  constructor(
    public usuarioService: UsuarioService,
    public router: Router
  ) {
    this.usuarioLogado$ = this.usuarioService.usuarioLogado$;
  }

  ngOnInit(): void {
  }

  irParaLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  irParaRegistro(): void {
    this.router.navigate(['/auth/cadastro']);
  }
}
