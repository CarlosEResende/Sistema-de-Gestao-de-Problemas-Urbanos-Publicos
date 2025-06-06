export type TipoUsuario = 'cidadao' | 'agente';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha?: string;
  tipo: TipoUsuario;
}
