package br.com.gestaourbana.backend.models; 

import java.time.LocalDateTime;
import java.util.UUID;

import br.com.gestaourbana.backend.models.enums.StatusProblema; 
import br.com.gestaourbana.backend.models.enums.TipoProblema;   
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Table(name = Problema.TABLE_NAME)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Problema {

    public static final String TABLE_NAME = "problema";

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotNull(message = "O tipo do problema não pode ser nulo")
    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_problema", nullable = false, length = 50) 
    private TipoProblema tipo;

    @NotBlank(message = "Título é obrigatório.")
    @Size(min = 5, max = 150, message = "Título deve ter entre 5 e 150 caracteres.")
    @Column(nullable = false, length = 150)
    private String titulo;

    @NotBlank(message = "Descrição é obrigatória.")
    @Size(min = 10, max = 2000, message = "Descrição deve ter entre 10 e 2000 caracteres.")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String descricao;

    @NotBlank(message = "Rua do endereço é obrigatória.")
    @Size(max = 200, message = "Rua do endereço não pode exceder 200 caracteres.")
    @Column(name = "endereco_rua", length = 200)
    private String enderecoRua;

    @NotBlank(message = "Bairro do endereço é obrigatório.")
    @Size(max = 100, message = "Bairro do endereço não pode exceder 100 caracteres.")
    @Column(name = "endereco_bairro", length = 100)
    private String enderecoBairro;

    @Size(max = 9, message = "CEP não pode exceder 9 caracteres.")
    @Column(name = "endereco_cep", length = 9)
    private String enderecoCEP; 

    @Size(max = 500, message = "URL da foto não pode exceder 500 caracteres.")
    @Column(name = "foto_url", length = 500)
    private String fotoUrl;

    @NotNull 
    @Column(name = "data_registro", nullable = false, updatable = false)
    private LocalDateTime dataRegistro;

    @NotNull 
    @Column(name = "data_ultima_atualizacao", nullable = false)
    private LocalDateTime dataUltimaAtualizacao;

    @NotNull(message = "Status do problema é obrigatório.")
    @Enumerated(EnumType.STRING)
    @Column(name = "status_problema", nullable = false, length = 30)
    private StatusProblema statusProblema = StatusProblema.PENDENTE;

    @NotNull(message = "Usuário que reportou o problema é obrigatório.")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_reportou_id", nullable = false)
    private Usuario usuarioReportou;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "agente_responsavel_id")
    private Usuario agenteResponsavel;


}