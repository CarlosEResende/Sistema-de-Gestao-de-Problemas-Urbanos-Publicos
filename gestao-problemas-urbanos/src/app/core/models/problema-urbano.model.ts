import { Comentario } from './comentario.model';

export type StatusProblema = 'Registrado' | 'Em Análise' | 'Em Andamento' | 'Resolvido' | 'Cancelado';
export const STATUS_PERMITIDOS_EDICAO_CIDADAO: StatusProblema[] = ['Registrado'];

export interface Endereco {
  rua: string;
  numero?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  complemento?: string;
}
export enum TipoProblema {
  BURACO_VIA = 'Buraco na Via',
  ILUMINACAO_PUBLICA = 'Iluminação Pública',
  LIXO_ACUMULADO = 'Lixo Acumulado',
  VAZAMENTO_AGUA = 'Vazamento de Água',
  PODA_ARVORE = 'Poda de Árvore',
  SINALIZACAO_DEFICIENTE = 'Sinalização Deficiente',
  ENTULHO_CALCADA = 'Entulho na Calçada',
  TERRENO_BALDIO_SUJO = 'Terreno Baldio Sujo/Abandonado',
  ESGOTO_CEU_ABERTO = 'Esgoto a Céu Aberto',
  OUTRO = 'Outro'
}

export interface ProblemaUrbano {
  id: number;
  titulo: string;
  descricao: string;
  tipoProblema: TipoProblema;
  endereco: Endereco;
  dataRegistro: Date;
  idCidadaoRegistrou: number;
  status: StatusProblema;
  comentarios: Comentario[];
  dataUltimaAtualizacao?: Date;
}
