package br.com.gestaourbana.backend.repositories;

import br.com.gestaourbana.backend.models.Problema;
import br.com.gestaourbana.backend.models.enums.StatusProblema;
import br.com.gestaourbana.backend.models.enums.TipoProblema;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface ProblemaRepository extends JpaRepository<Problema, UUID> {

    List<Problema> findByStatusProblema(StatusProblema status);
    List<Problema> findByTipo(TipoProblema tipo);
    List<Problema> findByUsuarioReportouId(UUID usuarioReportouId);

    @Query("SELECT p FROM Problema p WHERE p.tipo = :tipo AND p.enderecoBairro = :bairro")
    List<Problema> findByTipoAndBairro(
        @Param("tipo") TipoProblema tipo,
        @Param("bairro") String bairro
    );

    @Query("SELECT p FROM Problema p WHERE p.usuarioReportou.id = :usuarioId AND p.statusProblema = :status")
    List<Problema> findByUsuarioAndStatus(
        @Param("usuarioId") UUID usuarioId,
        @Param("status") StatusProblema status
    );

    @Query("SELECT p FROM Problema p WHERE p.statusProblema = 'PENDENTE' AND p.dataRegistro < :dataLimite")
    List<Problema> findProblemasPendentesAntigos(@Param("dataLimite") LocalDateTime dataLimite);

   
    List<Problema> findAllByOrderByDataRegistroDesc();

    @Query("SELECT p FROM Problema p WHERE p.tipo = :tipo ORDER BY p.statusProblema, p.dataRegistro DESC")
    List<Problema> findByTipoOrderByStatusAndData(
        @Param("tipo") TipoProblema tipo
    );
}