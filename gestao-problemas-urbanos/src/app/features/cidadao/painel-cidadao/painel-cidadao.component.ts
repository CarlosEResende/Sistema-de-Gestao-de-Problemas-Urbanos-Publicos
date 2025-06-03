import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProblemaUrbano } from '../../../core/models/problema-urbano.model';
import { Usuario } from '../../../core/models/usuario.model';
import { ProblemaService } from '../../../core/services/problema-urbano.service';
import { UsuarioService } from '../../../core/services/usuario.service';

@Component({
  selector: 'app-painel-cidadao',
  templateUrl: './painel-cidadao.component.html',
  styleUrls: ['./painel-cidadao.component.css'],
  standalone: false,
})
export class PainelCidadaoComponent implements OnInit {
  usuarioLogado: Usuario | null = null;
  meusProblemas: ProblemaUrbano[] = [];
  carregando = false;
  mensagemErro = '';

  constructor(
    private usuarioService: UsuarioService,
    private problemaService: ProblemaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuarioLogado = this.usuarioService.getUsuarioLogado();
    if (!this.usuarioLogado || this.usuarioLogado.tipo !== 'cidadao') {
      this.router.navigate(['/auth/login']);
      return;
    }
    this.carregarMeusProblemas();
  }

  async carregarMeusProblemas(): Promise<void> {
    if (!this.usuarioLogado) return;
    this.carregando = true;
    this.mensagemErro = '';
    this.problemaService.getProblemasPorCidadao(this.usuarioLogado.id).subscribe({
      next: async (problemas) => {
        this.meusProblemas = await this.problemaService.enriquecerComentarios(problemas);
        this.carregando = false;
      },
      error: (err) => {
        this.mensagemErro = 'Erro ao carregar problemas: ' + err.message;
        this.carregando = false;
        console.error(err);
      }
    });
  }

  navegarParaNovoProblema(): void {
    this.router.navigate(['/cidadao/problema/novo']);
  }

  navegarParaEditarProblema(idProblema: number): void {
    this.router.navigate(['/cidadao/problema/editar', idProblema]);
  }

  navegarParaDetalhesProblema(idProblema: number): void {
     this.router.navigate(['/cidadao/problema', idProblema]);
  }

  podeEditar(problema: ProblemaUrbano): boolean {
    return problema.status === 'Registrado';
  }
  logout() {
    this.usuarioService.logout();
    this.router.navigate(['/auth/']);
  }
}
