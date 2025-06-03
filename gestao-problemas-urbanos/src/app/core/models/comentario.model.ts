export interface Comentario {
  id: number;
  idUsuario: number;
  nomeUsuario?: string;
  texto: string;
  dataHora: Date;
  statusAntigo?: string;
  statusNovo?: string;
}
