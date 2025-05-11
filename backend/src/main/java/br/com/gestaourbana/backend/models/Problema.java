package br.com.gestaourbana.backend.models;

import java.time.LocalDateTime;
import java.util.UUID;

import br.com.gestaourbana.backend.models.enums.StatusProblema;
import br.com.gestaourbana.backend.models.enums.TipoProblema;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @NotNull(message = "O tipo do problema não pode ser nulo")
    private TipoProblema tipo;

    @Column(columnDefinition = "TEXT", nullable = false)
    @NotBlank(message = "A descrição não pode estar vazia")
    private String descricao;

    @Column(nullable = false)
    @NotBlank(message = "A localização não pode estar vazia")
    private String localizacao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private StatusProblema status = StatusProblema.PENDENTE;

    @Column(name = "data_criacao", updatable = false)
    @Builder.Default
    private LocalDateTime dataCriacao = LocalDateTime.now();

    @Column(name = "data_atualizacao")
    private LocalDateTime dataAtualizacao;

    @Column(name = "data_resolucao")
    private LocalDateTime dataResolucao;

    @Column(name = "foto_url")
    private String fotoUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false, updatable = false)
    private Cidadao usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "agente_id")
    private AgentePublico agenteResponsavel;

}
