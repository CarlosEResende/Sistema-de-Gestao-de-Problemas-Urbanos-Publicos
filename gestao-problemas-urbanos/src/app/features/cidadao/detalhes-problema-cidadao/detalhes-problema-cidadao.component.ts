import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProblemaUrbano } from '../../../core/models/problema-urbano.model'
import { Usuario } from '../../../core/models/usuario.model';
import { ProblemaService } from '../../../core/services/problema-urbano.service';
import { UsuarioService } from '../../../core/services/usuario.service';
import { Comentario } from '../../../core/models/comentario.model';

@Component({
  selector: 'app-detalhes-problema-cidadao',
  templateUrl: './detalhes-problema-cidadao.component.html',
  styleUrls: ['./detalhes-problema-cidadao.component.css'],
  standalone: false
})
export class DetalhesProblemaCidadaoComponent implements OnInit {
  problema: ProblemaUrbano | undefined;
  usuarioLogado: Usuario | null = null;
  carregando = false;
  mensagemErro = '';
  novoComentarioTexto = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private problemaService: ProblemaService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.usuarioLogado = this.usuarioService.getUsuarioLogado();
    if (!this.usuarioLogado) {
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
    this.problemaService.getProblemaPorId(idProblema).subscribe({
      next: async (p) => {
        if (p && p.idCidadaoRegistrou === this.usuarioLogado?.id) {
          this.problema = await this.problemaService.enriquecerComentariosDeUmProblema(p);
        } else if (p) {
          this.mensagemErro = 'Você não tem permissão para ver os detalhes deste problema.';
          this.problema = undefined;
        }
        else {
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

  adicionarComentario(): void {
    if (!this.problema || !this.usuarioLogado || !this.novoComentarioTexto.trim()) {
      return;
    }
    this.problemaService.adicionarComentario(this.problema.id, this.usuarioLogado.id, this.novoComentarioTexto)
      .subscribe({
        next: async (problemaAtualizado) => {
          this.problema = await this.problemaService.enriquecerComentariosDeUmProblema(problemaAtualizado);
          this.novoComentarioTexto = '';
        },
        error: (err) => {
          this.mensagemErro = 'Erro ao adicionar comentário: ' + err.message;
        }
      });
  }

  podeComentar(): boolean {
    return this.problema?.status === 'Registrado';
  }

  navegarParaPainel(): void {
    this.router.navigate(['/cidadao/painel']);
  }
}
