package br.com.gestaourbana.backend.models.dtos;

import br.com.gestaourbana.backend.models.enums.StatusProblema; 
import br.com.gestaourbana.backend.models.enums.TipoProblema;  
import lombok.*; 

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProblemaResponseDTO {

    private UUID id;
    private TipoProblema tipo;
    private String tipoDescricao;
    private String titulo;
    private String descricao;
    private String enderecoRua;
    private String enderecoBairro;
    private String enderecoCEP;
    private String fotoUrl;
    private LocalDateTime dataRegistro;
    private LocalDateTime dataUltimaAtualizacao;
    private StatusProblema statusProblema;

   
}