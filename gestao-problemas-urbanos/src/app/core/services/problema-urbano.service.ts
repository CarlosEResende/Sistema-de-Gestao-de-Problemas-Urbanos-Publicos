import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ProblemaUrbano, StatusProblema, STATUS_PERMITIDOS_EDICAO_CIDADAO, Endereco, TipoProblema } from '../models/problema-urbano.model';
import { Comentario } from '../models/comentario.model';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ProblemaService {
  private problemasDB: ProblemaUrbano[] = [
    {
      id: 1,
      titulo: 'Buraco na Rua Principal',
      descricao: 'Um buraco grande na Rua Principal, próximo ao número 100, causando transtorno aos motoristas.',
      tipoProblema: TipoProblema.BURACO_VIA,
      endereco: { rua: 'Rua Principal', numero: '100', bairro: 'Centro', cidade: 'Exemplópolis', estado: 'EX', cep: '12345-000' },
      dataRegistro: new Date(2023, 10, 1, 10, 0, 0),
      idCidadaoRegistrou: 1,
      status: 'Registrado',
      comentarios: [
        { id: 1, idUsuario: 1, texto: 'Problema registrado.', dataHora: new Date(2023, 10, 1, 10, 0, 0) }
      ],
      dataUltimaAtualizacao: new Date(2023, 10, 1, 10, 0, 0)
    },
    {
      id: 2,
      titulo: 'Poste sem luz na Av. Secundária',
      descricao: 'O poste em frente ao mercado está com a luz queimada há dias.',
      tipoProblema: TipoProblema.ILUMINACAO_PUBLICA,
      endereco: { rua: 'Av. Secundária', bairro: 'Vila Nova', cidade: 'Exemplópolis', estado: 'EX', cep: '54321-000' },
      dataRegistro: new Date(2023, 10, 5, 14, 30, 0),
      idCidadaoRegistrou: 1,
      status: 'Em Análise',
      comentarios: [
        { id: 2, idUsuario: 1, texto: 'Problema registrado.', dataHora: new Date(2023, 10, 5, 14, 30, 0) },
        { id: 3, idUsuario: 2, texto: 'Recebido e encaminhado para análise da equipe técnica.', dataHora: new Date(2023, 10, 6, 9, 0, 0), statusAntigo: 'Registrado', statusNovo: 'Em Análise' }
      ],
      dataUltimaAtualizacao: new Date(2023, 10, 6, 9, 0, 0)
    }
  ];
  private proximoIdProblema = 3;
  private proximoIdComentario = 4;

  constructor(private usuarioService: UsuarioService) { }

  registrarProblema(
    dadosProblema: Omit<ProblemaUrbano, 'id' | 'dataRegistro' | 'status' | 'comentarios' | 'idCidadaoRegistrou' | 'dataUltimaAtualizacao'>,
    idCidadao: number
  ): Observable<ProblemaUrbano> {

    if (!Object.values(TipoProblema).includes(dadosProblema.tipoProblema as TipoProblema)) {
      return throwError(() => new Error('Tipo de problema inválido'));
    }

    const dataAtual = new Date();
    const novoProblema: ProblemaUrbano = {
      id: this.proximoIdProblema++,
      ...dadosProblema,
      idCidadaoRegistrou: idCidadao,
      dataRegistro: dataAtual,
      status: 'Registrado',
      comentarios: [{
        id: this.proximoIdComentario++,
        idUsuario: idCidadao,
        texto: 'Problema registrado.',
        dataHora: dataAtual
      }],
      dataUltimaAtualizacao: dataAtual
    };
    this.problemasDB.push(novoProblema);
    return of(novoProblema);
  }
  editarProblema(
    idProblema: number,
    dadosAtualizados: Partial<Omit<ProblemaUrbano, 'id' | 'dataRegistro' | 'status' | 'comentarios' | 'idCidadaoRegistrou' | 'dataUltimaAtualizacao'>>,
    idCidadao: number
  ): Observable<ProblemaUrbano> {
    const indiceProblema = this.problemasDB.findIndex(p => p.id === idProblema);
    if (indiceProblema === -1) {
      return throwError(() => new Error('Problema não encontrado.'));
    }

    const problemaOriginal = this.problemasDB[indiceProblema];
    if (problemaOriginal.idCidadaoRegistrou !== idCidadao) {
      return throwError(() => new Error('Você não tem permissão para editar este problema.'));
    }

    if (!STATUS_PERMITIDOS_EDICAO_CIDADAO.includes(problemaOriginal.status)) {
      return throwError(() => new Error(`Não é possível editar problemas com status "${problemaOriginal.status}". Edição permitida apenas para status: ${STATUS_PERMITIDOS_EDICAO_CIDADAO.join(', ')}.`));
    }

    this.problemasDB[indiceProblema] = {
      ...problemaOriginal,
      ...dadosAtualizados,
      endereco: {
        ...problemaOriginal.endereco,
        ...dadosAtualizados.endereco
      },
      dataUltimaAtualizacao: new Date()
    };
    return of(this.problemasDB[indiceProblema]);
  }

  getProblemaPorId(id: number): Observable<ProblemaUrbano | undefined> {
    const problema = this.problemasDB.find(p => p.id === id);
    return of(problema ? { ...problema } : undefined);
  }

  getProblemasPorCidadao(idCidadao: number): Observable<ProblemaUrbano[]> {
    return of(this.problemasDB.filter(p => p.idCidadaoRegistrou === idCidadao).map(p => ({ ...p })));
  }

  getTodosProblemas(): Observable<ProblemaUrbano[]> {
    return of(this.problemasDB.map(p => ({ ...p })));
  }

  // Usado pelo Agente Público
  atualizarStatusProblema(
    idProblema: number,
    novoStatus: StatusProblema,
    idAgente: number,
    textoComentario?: string
  ): Observable<ProblemaUrbano> {
    const indiceProblema = this.problemasDB.findIndex(p => p.id === idProblema);
    if (indiceProblema === -1) {
      return throwError(() => new Error('Problema não encontrado.'));
    }

    const problemaOriginal = this.problemasDB[indiceProblema];
    const statusAntigo = problemaOriginal.status;


    problemaOriginal.status = novoStatus;
    problemaOriginal.dataUltimaAtualizacao = new Date();

    if (textoComentario || statusAntigo !== novoStatus) {
      const comentario: Comentario = {
        id: this.proximoIdComentario++,
        idUsuario: idAgente,
        texto: textoComentario || `Status alterado de "${statusAntigo}" para "${novoStatus}".`,
        dataHora: new Date(),
        statusAntigo: statusAntigo,
        statusNovo: novoStatus
      };
      problemaOriginal.comentarios.push(comentario);
    }

    this.problemasDB[indiceProblema] = { ...problemaOriginal };
    return of(this.problemasDB[indiceProblema]);
  }
  adicionarComentario(
    idProblema: number,
    idUsuario: number,
    textoComentario: string
  ): Observable<ProblemaUrbano> {
    const indiceProblema = this.problemasDB.findIndex(p => p.id === idProblema);
    if (indiceProblema === -1) {
      return throwError(() => new Error('Problema não encontrado.'));
    }
    const problemaOriginal = this.problemasDB[indiceProblema];

    const usuarioLogado = this.usuarioService.getUsuarioLogado();
    if (usuarioLogado?.tipo === 'cidadao' && problemaOriginal.status !== 'Registrado') {
      return throwError(() => new Error('Cidadão só pode adicionar comentários em problemas com status "Registrado".'));
    }


    const comentario: Comentario = {
      id: this.proximoIdComentario++,
      idUsuario: idUsuario,
      texto: textoComentario,
      dataHora: new Date(),
    };
    problemaOriginal.comentarios.push(comentario);
    problemaOriginal.dataUltimaAtualizacao = new Date();

    this.problemasDB[indiceProblema] = { ...problemaOriginal };
    return of(this.problemasDB[indiceProblema]);
  }

  async enriquecerComentarios(problemas: ProblemaUrbano[]): Promise<ProblemaUrbano[]> {
    for (const problema of problemas) {
      for (const comentario of problema.comentarios) {
        if (!comentario.nomeUsuario) {
          comentario.nomeUsuario = await this.usuarioService.getNomeUsuario(comentario.idUsuario);
        }
      }
    }
    return problemas;
  }

  async enriquecerComentariosDeUmProblema(problema: ProblemaUrbano): Promise<ProblemaUrbano> {
    for (const comentario of problema.comentarios) {
      if (!comentario.nomeUsuario) {
        comentario.nomeUsuario = await this.usuarioService.getNomeUsuario(comentario.idUsuario);
      }
    }
    return problema;
  }
}
