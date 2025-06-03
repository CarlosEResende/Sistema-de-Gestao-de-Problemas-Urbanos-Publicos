import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { Usuario, TipoUsuario } from '../../../../core/models/usuario.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  standalone: false

})
export class CadastroComponent {
  novoUsuario: Omit<Usuario, 'id'> = {
    nome: '',
    email: '',
    senha: '',
    tipo: 'cidadao'
  };
  confirmarSenha: string = '';
  hidePassword = true;
  hideConfirmPassword = true;
  loading = false;
  mensagemErro: string = '';
  mensagemSucesso: string = '';
  tiposUsuario = ['cidadao', 'agente'];


  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  cadastrar(): void {
    this.mensagemErro = '';
    this.mensagemSucesso = '';

    if (!this.novoUsuario.nome || !this.novoUsuario.email || !this.novoUsuario.senha || !this.confirmarSenha) {
      this.mensagemErro = 'Todos os campos são obrigatórios.';
      return;
    }
    if (this.novoUsuario.senha !== this.confirmarSenha) {
      this.mensagemErro = 'As senhas não coincidem.';
      return;
    }

    this.usuarioService.cadastrarUsuario(this.novoUsuario).subscribe({
      next: (usuarioCadastrado) => {
        this.mensagemSucesso = `Usuário ${usuarioCadastrado.nome} cadastrado com sucesso! Você pode fazer login agora.`;
        console.log('Cadastro bem-sucedido:', usuarioCadastrado);
        this.router.navigate(['/auth/login']);
        this.novoUsuario = { nome: '', email: '', senha: '', tipo: 'cidadao' };
        this.confirmarSenha = '';
      },
      error: (err) => {
        this.mensagemErro = err.message || 'Falha no cadastro.';
        console.error('Erro no cadastro:', err);
      }
    });

  }
}
