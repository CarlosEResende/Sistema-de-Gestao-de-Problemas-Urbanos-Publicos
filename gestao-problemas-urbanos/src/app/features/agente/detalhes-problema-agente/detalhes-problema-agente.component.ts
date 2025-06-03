import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProblemaUrbano, StatusProblema } from '../../../core/models/problema-urbano.model';
import { Usuario } from '../../../core/models/usuario.model';
import { ProblemaService } from '../../../core/services/problema-urbano.service';
import { UsuarioService } from '../../../core/services/usuario.service';
import { Comentario } from '../../../core/models/comentario.model';

@Component({
  selector: 'app-detalhes-problema-agente',
  templateUrl: './detalhes-problema-agente.component.html',
  styleUrls: ['./detalhes-problema-agente.component.css'],
  standalone: false

})
export class DetalhesProblemaAgenteComponent implements OnInit {
  problema: ProblemaUrbano | undefined;
  usuarioLogado: Usuario | null = null;
  carregando = false;
  mensagemErro = '';
  mensagemSucesso = '';

  novoStatus: StatusProblema | '' = '';
  comentarioAgente = '';
  listaStatusDisponiveis: StatusProblema[] = ['Em Análise', 'Em Andamento', 'Resolvido', 'Cancelado'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private problemaService: ProblemaService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.usuarioLogado = this.usuarioService.getUsuarioLogado();
    if (!this.usuarioLogado || this.usuarioLogado.tipo !== 'agente') {
      this.router.navigate(['/auth/login']);
      return;
    }

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.carregarDetalhesProblema(+idParam);
    } else {
      this.mensagemErro = 'ID do problema não fornecido.';
    }
  }

  async carregarDetalhesProblema(idProblema: number): Promise<void> {
    this.carregando = true;
    this.mensagemErro = '';
    this.mensagemSucesso = '';
    this.problemaService.getProblemaPorId(idProblema).subscribe({
      next: async (p) => {
        if (p) {
          this.problema = await this.problemaService.enriquecerComentariosDeUmProblema(p);
          if (this.problema && this.listaStatusDisponiveis.includes(this.problema.status)) {
          }
        } else {
          this.mensagemErro = 'Problema não encontrado.';
        }
        this.carregando = false;
      },
      error: (err) => {
        this.mensagemErro = 'Erro ao carregar detalhes: ' + err.message;
        this.carregando = false;
      }
    });
  }

  atualizarStatus(): void {
    if (!this.problema || !this.novoStatus || !this.usuarioLogado) {
      this.exibirMensagemErro('Selecione um novo status para o problema.');
      return;
    }
    if (this.problema.status === this.novoStatus && !this.comentarioAgente.trim()) {
      this.exibirMensagemErro('Se o status não mudar, adicione um comentário explicativo.');
      return;
    }

    this.carregando = true;
    this.mensagemErro = '';
    this.mensagemSucesso = '';

    this.problemaService.atualizarStatusProblema(
      this.problema.id,
      this.novoStatus,
      this.usuarioLogado.id,
      this.comentarioAgente.trim() || undefined
    ).subscribe({
      next: async (problemaAtualizado) => {
        this.problema = await this.problemaService.enriquecerComentariosDeUmProblema(problemaAtualizado);
        this.exibirMensagemSucesso('Status do problema atualizado com sucesso!');
        this.comentarioAgente = '';
        this.carregando = false;
        setTimeout(() => {
          this.router.navigate(['/agente/painel']);
        }, 1000);
      },
      error: (err) => {
        this.exibirMensagemErro('Erro ao atualizar status: ' + err.message);
        this.carregando = false;
      }
    });
  }


  voltar(): void {
    this.router.navigate(['/agente']);
  }


  exibirMensagemSucessoFlag = false;
  sumindoSucesso = false;


  exibirMensagemErroFlag = false;
  sumindoErro = false;

  exibirMensagemSucesso(msg: string, duracaoMs = 1500) {
    this.mensagemSucesso = msg;
    this.sumindoSucesso = false;
    this.exibirMensagemSucessoFlag = true;

    setTimeout(() => {
      this.sumindoSucesso = true;
      setTimeout(() => {
        this.exibirMensagemSucessoFlag = false;
        this.mensagemSucesso = '';
        this.sumindoSucesso = false;
      }, 400);
    }, duracaoMs);
  }

  exibirMensagemErro(msg: string, duracaoMs = 1500) {
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



}
