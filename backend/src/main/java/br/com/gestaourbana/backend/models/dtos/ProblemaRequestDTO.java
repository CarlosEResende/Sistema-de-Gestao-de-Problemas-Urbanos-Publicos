package br.com.gestaourbana.backend.models.dtos;

import br.com.gestaourbana.backend.models.enums.TipoProblema; 
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProblemaRequestDTO {

    @NotNull(message = "O tipo do problema não pode ser nulo")
    private TipoProblema tipo;

    @NotBlank(message = "Título é obrigatório.")
    @Size(min = 5, max = 150, message = "Título deve ter entre 5 e 150 caracteres.")
    private String titulo;

    @NotBlank(message = "Descrição é obrigatória.")
    @Size(min = 10, max = 2000, message = "Descrição deve ter entre 10 e 2000 caracteres.")
    private String descricao;

    @NotBlank(message = "Rua do endereço é obrigatória.")
    @Size(max = 200, message = "Rua do endereço não pode exceder 200 caracteres.")
    private String enderecoRua;

    @NotBlank(message = "Bairro do endereço é obrigatório.")
    @Size(max = 100, message = "Bairro do endereço não pode exceder 100 caracteres.")
    private String enderecoBairro;

    @Size(max = 9, message = "CEP não pode exceder 9 caracteres.")
    private String enderecoCEP; 


    @Size(max = 500, message = "URL da foto não pode exceder 500 caracteres.")
    private String fotoUrl;

}