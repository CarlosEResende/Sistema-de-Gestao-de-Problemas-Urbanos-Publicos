import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProblemaUrbano, Endereco, STATUS_PERMITIDOS_EDICAO_CIDADAO, TipoProblema } from '../../../core/models/problema-urbano.model';
import { Usuario } from '../../../core/models/usuario.model';
import { ProblemaService } from '../../../core/services/problema-urbano.service';
import { UsuarioService } from '../../../core/services/usuario.service';

interface ProblemaForm {
  titulo: string;
  descricao: string;
  tipoProblema: TipoProblema;
  endereco: Endereco;
}

@Component({
  selector: 'app-formulario-problema',
  templateUrl: './formulario-problema.component.html',
  styleUrls: ['./formulario-problema.component.css'],
  standalone: false
})
export class FormularioProblemaComponent implements OnInit {
  problema: ProblemaForm = {
    titulo: '',
    descricao: '',
    tipoProblema: TipoProblema.BURACO_VIA,
    endereco: {
      rua: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: ''
    }
  };

  idProblemaEdicao?: number;
  usuarioLogado: Usuario | null = null;
  modoEdicao = false;
  mensagemErro = '';
  mensagemSucesso = '';
  carregando = false;

  tiposDeProblema: {key: string, value: TipoProblema, label: string}[] = [];

  constructor(
    private problemaService: ProblemaService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usuarioLogado = this.usuarioService.getUsuarioLogado();
    if (!this.usuarioLogado || this.usuarioLogado.tipo !== 'cidadao') {
      this.router.navigate(['/auth/login']);
      return;
    }

    this.tiposDeProblema = Object.keys(TipoProblema)
      .filter(key => isNaN(Number(key)))
      .map(key => ({
        key,
        value: TipoProblema[key as keyof typeof TipoProblema],
        label: TipoProblema[key as keyof typeof TipoProblema].toString()
      }));

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.idProblemaEdicao = +idParam;
      this.modoEdicao = true;
      this.carregarProblemaParaEdicao();
    } else {
      this.resetForm();
    }
  }

  private resetForm(): void {
    this.problema = {
      titulo: '',
      descricao: '',
      tipoProblema: TipoProblema.BURACO_VIA,
      endereco: {
        rua: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: ''
      }
    };
  }

  carregarProblemaParaEdicao(): void {
    if (!this.idProblemaEdicao) return;

    this.carregando = true;
    this.problemaService.getProblemaPorId(this.idProblemaEdicao).subscribe({
      next: (problemaExistente) => {
        if (problemaExistente) {
          if (problemaExistente.idCidadaoRegistrou !== this.usuarioLogado?.id) {
            this.mensagemErro = "Você não tem permissão para editar este problema.";
            this.carregando = false;
            return;
          }

          if (!STATUS_PERMITIDOS_EDICAO_CIDADAO.includes(problemaExistente.status)) {
            this.mensagemErro = `Não é possível editar problemas com status "${problemaExistente.status}".`;
            this.carregando = false;
            return;
          }

          const tipoProblema = this.tiposDeProblema.find(t => t.value === problemaExistente.tipoProblema)?.value || TipoProblema.BURACO_VIA;

          this.problema = {
            titulo: problemaExistente.titulo,
            descricao: problemaExistente.descricao,
            tipoProblema: tipoProblema,
            endereco: { ...problemaExistente.endereco }
          };
        } else {
          this.mensagemErro = 'Problema não encontrado para edição.';
        }
        this.carregando = false;
      },
      error: (err) => {
        this.mensagemErro = 'Erro ao carregar problema: ' + err.message;
        this.carregando = false;
      }
    });
  }

  salvarProblema(): void {
    this.mensagemErro = '';
    this.mensagemSucesso = '';

    if (!this.usuarioLogado) {
      this.mensagemErro = 'Usuário não logado.';
      return;
    }

    if (!this.validarFormulario()) {
      this.mensagemErro = "Por favor, preencha todos os campos obrigatórios.";
      return;
    }

    this.carregando = true;

    if (this.modoEdicao && this.idProblemaEdicao) {
      this.atualizarProblema();
    } else {
      this.criarNovoProblema();
    }
  }

  private validarFormulario(): boolean {
    return !!this.problema.titulo &&
      !!this.problema.descricao &&
      !!this.problema.tipoProblema &&
      !!this.problema.endereco.rua &&
      !!this.problema.endereco.bairro &&
      !!this.problema.endereco.cidade &&
      !!this.problema.endereco.estado &&
      !!this.problema.endereco.cep;
  }

  private atualizarProblema(): void {
    const dadosAtualizados = {
      titulo: this.problema.titulo,
      descricao: this.problema.descricao,
      tipoProblema: this.problema.tipoProblema,
      endereco: this.problema.endereco
    };

    this.problemaService.editarProblema(
      this.idProblemaEdicao!,
      dadosAtualizados,
      this.usuarioLogado!.id
    ).subscribe({
      next: () => {
        this.mensagemSucesso = 'Problema atualizado com sucesso!';
        this.carregando = false;
        setTimeout(() => this.router.navigate(['/cidadao/painel']), 1500);
      },
      error: (err) => {
        this.mensagemErro = 'Erro ao atualizar problema: ' + err.message;
        this.carregando = false;
      }
    });
  }

  private criarNovoProblema(): void {
    const novoProblema = {
      titulo: this.problema.titulo,
      descricao: this.problema.descricao,
      tipoProblema: this.problema.tipoProblema,
      endereco: this.problema.endereco
    };

    this.problemaService.registrarProblema(
      novoProblema,
      this.usuarioLogado!.id
    ).subscribe({
      next: () => {
        this.mensagemSucesso = 'Problema registrado com sucesso!';
        this.carregando = false;
        this.resetForm();
        setTimeout(() => this.router.navigate(['/cidadao/painel']), 1500);
      },
      error: (err) => {
        this.mensagemErro = 'Erro ao registrar problema: ' + err.message;
        this.carregando = false;
      }
    });
  }

  navegarParaPainel(): void {
    this.router.navigate(['/cidadao/painel']);
  }
}
