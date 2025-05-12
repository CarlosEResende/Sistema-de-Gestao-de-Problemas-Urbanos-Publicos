package br.com.gestaourbana.backend.models.dtos;
import lombok.*;

import java.time.LocalDateTime;

import br.com.gestaourbana.backend.models.enums.TipoUsuario;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsuarioResponseDTO {
    private Long id;
    private String nome;
    private String email;
    private String cpf;
    private String telefone;
    private TipoUsuario tipoUsuario;
    private LocalDateTime dataCadastro;
    private Boolean ativo;
}
