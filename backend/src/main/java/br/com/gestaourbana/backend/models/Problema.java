package br.com.gestaourbana.backend.models;

import java.time.LocalDateTime;
import java.util.UUID;

import br.com.gestaourbana.backend.models.enums.StatusProblema;
import br.com.gestaourbana.backend.models.enums.TipoProblema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = Problema.TABLE_NAME)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Problema {

    public static final String TABLE_NAME = "problema";

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @NotNull
    private TipoProblema tipo;

    @Column(columnDefinition = "TEXT", nullable = false)
    @NotBlank
    private String descricao;

    @Column(nullable = false)
    @NotBlank
    private String localizacao;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusProblema status = StatusProblema.PENDENTE;

    @Column(name = "data_criacao", updatable = false)
    private LocalDateTime dataCriacao = LocalDateTime.now();

    @Column(name = "data_resolucao")
    private LocalDateTime dataResolucao;

    @Column(name = "foto_url")
    private String fotoUrl;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false, updatable = false)
    private Usuario usuario;


}
