package br.com.gestaourbana.backend.repositories;

import br.com.gestaourbana.backend.models.Problema;
import br.com.gestaourbana.backend.models.enums.StatusProblema;
import br.com.gestaourbana.backend.models.enums.TipoProblema;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.UUID;

public interface ProblemaRepository extends JpaRepository<Problema, UUID> {

    @Query("SELECT p FROM Problema p WHERE p.status = 'PENDENTE' AND p.tipo IN :tipos")
    List<Problema> findPendentesPorTipo(@Param("tipos") List<TipoProblema> tipos);

    List<Problema> findByAgenteResponsavelIdAndStatus(UUID agenteId, StatusProblema status);

    List<Problema> findByCidadaoId(UUID cidadaoId);

    List<Problema> findByStatus(StatusProblema status);
}