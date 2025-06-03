import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Usuario, TipoUsuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuariosDB: Usuario[] = [
    // Dados mockados iniciais
    { id: 1, nome: 'Cidadão Teste', email: 'cidadao@teste.com', senha: '123456', tipo: 'cidadao' },
    { id: 2, nome: 'Agente Teste', email: 'agente@teste.com', senha: '123456', tipo: 'agente' },
  ];
  private proximoIdUsuario = 3;

  private usuarioLogadoSubject = new BehaviorSubject<Usuario | null>(null);
  public usuarioLogado$ = this.usuarioLogadoSubject.asObservable();

  constructor() {
    const usuarioSalvo = localStorage.getItem('usuarioLogado');
    if (usuarioSalvo) {
      this.usuarioLogadoSubject.next(JSON.parse(usuarioSalvo));
    }
  }

  getUsuarioLogado(): Usuario | null {
    return this.usuarioLogadoSubject.value;
  }

  cadastrarUsuario(dadosCadastro: Omit<Usuario, 'id'>): Observable<Usuario> {
    if (this.usuariosDB.find(u => u.email === dadosCadastro.email)) {
      return throwError(() => new Error('E-mail já cadastrado.'));
    }
    const novoUsuario: Usuario = {
      id: this.proximoIdUsuario++,
      ...dadosCadastro
    };
    this.usuariosDB.push(novoUsuario);
    console.log('Usuários DB:', this.usuariosDB);
    return of(novoUsuario);
  }

  login(email: string, senhaInput: string): Observable<Usuario> {
    const usuarioEncontrado = this.usuariosDB.find(u => u.email === email && u.senha === senhaInput);
    if (usuarioEncontrado) {
      const { senha, ...usuarioSemSenha } = usuarioEncontrado;
      this.usuarioLogadoSubject.next(usuarioSemSenha);
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioSemSenha));
      return of(usuarioSemSenha);
    }
    return throwError(() => new Error('E-mail ou senha inválidos.'));
  }

  logout(): void {
    this.usuarioLogadoSubject.next(null);
    localStorage.removeItem('usuarioLogado');
  }

  getUsuarioPorId(id: number): Observable<Usuario | undefined> {
    return of(this.usuariosDB.find(u => u.id === id)).pipe(
      map(user => user ? {...user, senha: ''} : undefined)
    );
  }

  public async getNomeUsuario(idUsuario: number): Promise<string> {
    const usuario = await this.getUsuarioPorId(idUsuario).toPromise();
    return usuario ? usuario.nome : 'Usuário Desconhecido';
  }
}
