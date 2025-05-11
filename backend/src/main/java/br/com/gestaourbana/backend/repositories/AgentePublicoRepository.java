package br.com.gestaourbana.backend.repositories;

import br.com.gestaourbana.backend.models.AgentePublico;
import br.com.gestaourbana.backend.models.enums.TipoDepartamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AgentePublicoRepository extends JpaRepository<AgentePublico, UUID> {

    List<AgentePublico> findByDepartamento(TipoDepartamento departamento);

    List<AgentePublico> findByAtivoIsTrue();

    Optional<AgentePublico> findByEmail(String email);

    @Query("SELECT a FROM AgentePublico a WHERE SIZE(a.problemasAtribuidos) > :quantidade")
    List<AgentePublico> findAgentesSobrecarregados(@Param("quantidade") int quantidade);
}