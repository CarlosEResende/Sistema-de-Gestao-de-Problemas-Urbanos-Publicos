import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../../core/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent {
  email = '';
  senha = '';
  mensagemErro = '';
  hidePassword = true;
  loading = false;
  rememberMe = false;
  currentYear = new Date().getFullYear();

  exibirMensagemErroFlag = false;
  sumindoErro = false;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  efetuarLogin(): void {
    this.resetErrorState();
    this.loading = true;

    if (!this.email || !this.senha) {
      this.exibirMensagemErro('Por favor, preencha e-mail e senha.');
      this.loading = false;
      return;
    }

    this.usuarioService.login(this.email, this.senha).subscribe({
      next: (usuario) => {
        this.loading = false;
        this.handleLoginSuccess(usuario);
      },
      error: (err) => {
        this.loading = false;
        this.handleLoginError(err);
      }
    });
  }

  private resetErrorState(): void {
    this.mensagemErro = '';
    this.exibirMensagemErroFlag = false;
    this.sumindoErro = false;
  }

  private handleLoginSuccess(usuario: any): void {
    if (usuario.tipo === 'cidadao') {
      this.router.navigate(['/cidadao/painel']);
    } else if (usuario.tipo === 'agente') {
      this.router.navigate(['/agente/painel']);
    } else {
      this.router.navigate(['/']);
    }
  }

  private handleLoginError(err: any): void {
    const errorMessage = err.error?.message ||
                       err.message ||
                       'Falha no login. Verifique suas credenciais.';
    this.exibirMensagemErro(errorMessage);
  }
  exibirMensagemErro(msg: string, duracaoMs = 4900) {
    this.mensagemErro = msg;
    this.sumindoErro = false;
    this.exibirMensagemErroFlag = true;

    setTimeout(() => {
      this.sumindoErro = true;
      setTimeout(() => {
        this.exibirMensagemErroFlag = false;
        this.mensagemErro = '';
        this.sumindoErro = false;
      }, 400);
    }, duracaoMs);
  }

  navegarParaCadastrarUsuario() {
    this.router.navigate(['/auth/cadastro']);
  }
}
