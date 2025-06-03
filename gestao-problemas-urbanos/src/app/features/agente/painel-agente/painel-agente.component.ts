import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProblemaUrbano, StatusProblema, TipoProblema } from '../../../core/models/problema-urbano.model';
import { Usuario } from '../../../core/models/usuario.model';
import { ProblemaService } from '../../../core/services/problema-urbano.service';
import { UsuarioService } from '../../../core/services/usuario.service';

@Component({
  selector: 'app-painel-agente',
  templateUrl: './painel-agente.component.html',
  styleUrls: ['./painel-agente.component.css'],
  standalone: false
})
export class PainelAgenteComponent implements OnInit {
  usuarioLogado: Usuario | null = null;
  todosProblemas: ProblemaUrbano[] = [];
  problemasFiltrados: ProblemaUrbano[] = [];
  carregando = false;
  mensagemErro = '';

  filtroStatus: StatusProblema | '' = '';
  filtroTipoProblema: TipoProblema | '' = '';
  filtroEndereco = '';

  listaStatus: StatusProblema[] = ['Registrado', 'Em Análise', 'Em Andamento', 'Resolvido', 'Cancelado'];
  listaTiposProblema: TipoProblema[] = Object.values(TipoProblema);

  constructor(
    private usuarioService: UsuarioService,
    private problemaService: ProblemaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usuarioLogado = this.usuarioService.getUsuarioLogado();
    if (!this.usuarioLogado || this.usuarioLogado.tipo !== 'agente') {
      this.router.navigate(['/auth/login']);
      return;
    }
    this.carregarTodosProblemas();
  }

  async carregarTodosProblemas(): Promise<void> {
    this.carregando = true;
    this.mensagemErro = '';
    this.problemaService.getTodosProblemas().subscribe({
      next: async (problemas) => {
        this.todosProblemas = await this.problemaService.enriquecerComentarios(problemas);

        this.todosProblemas.forEach(p => {
          if (!Object.values(TipoProblema).includes(p.tipoProblema as TipoProblema)) {
            console.warn(`Tipo de problema inválido encontrado: ${p.tipoProblema}`);
          }
        });

        this.aplicarFiltros();
        this.carregando = false;
      },
      error: (err) => {
        this.mensagemErro = 'Erro ao carregar problemas: ' + err.message;
        this.carregando = false;
      }
    });
  }

  aplicarFiltros(): void {
    let resultado = [...this.todosProblemas];

    if (this.filtroStatus) {
      resultado = resultado.filter(p => p.status === this.filtroStatus);
    }
    if (this.filtroTipoProblema) {
      resultado = resultado.filter(p => p.tipoProblema === this.filtroTipoProblema);
    }
    if (this.filtroEndereco) {
      const termoBusca = this.filtroEndereco.toLowerCase();
      resultado = resultado.filter(p =>
        p.endereco.rua.toLowerCase().includes(termoBusca) ||
        p.endereco.bairro.toLowerCase().includes(termoBusca) ||
        p.endereco.cep.toLowerCase().includes(termoBusca) ||
        p.endereco.cidade.toLowerCase().includes(termoBusca)
      );
    }
    this.problemasFiltrados = resultado;
  }

  limparFiltros(): void {
    this.filtroStatus = '';
    this.filtroTipoProblema = '';
    this.filtroEndereco = '';
    this.aplicarFiltros();
  }

  navegarParaDetalhesProblema(idProblema: number): void {
    this.router.navigate(['/agente/problema', idProblema]);
  }

  logout(): void {
    this.router.navigate(['/auth/logout']);
  }

  getStatusCount(status: string): number {
    return this.problemasFiltrados.filter(p => p.status === status).length;
  }
}
