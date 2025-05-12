package br.com.gestaourbana.backend.models.dtos;

import br.com.gestaourbana.backend.models.enums.TipoUsuario;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioRequestDTO {

    @NotBlank(message = "Nome é obrigatório.")
    @Size(min = 3, max = 100, message = "Nome deve ter entre 3 e 100 caracteres.")
    private String nome;

    @NotBlank(message = "Email é obrigatório.")
    @Email(message = "Email deve ser válido.")
    @Size(max = 100, message = "Email não pode exceder 100 caracteres.")
    private String email;

    @NotBlank(message = "Senha é obrigatória.")
    @Size(min = 8, max = 20, message = "Senha deve ter entre 8 e 20 caracteres.")
    private String senha;

    @NotBlank(message = "CPF é obrigatório.")
    private String cpf;

    @NotBlank
    @Size(max = 20, message = "Telefone não pode exceder 20 caracteres.")
    private String telefone;

    @NotNull(message = "Tipo de usuário é obrigatório.")
    private TipoUsuario tipoUsuario;
}