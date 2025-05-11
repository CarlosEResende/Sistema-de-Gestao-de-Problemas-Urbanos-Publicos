package br.com.gestaourbana.backend.repositories;

import br.com.gestaourbana.backend.models.Cidadao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CidadaoRepository extends JpaRepository<Cidadao, UUID> {

    Optional<Cidadao> findByEmail(String email);

    List<Cidadao> findByAtivoIsTrue();

    @Query("SELECT c FROM Cidadao c WHERE LOWER(c.nome) LIKE LOWER(CONCAT('%', :nome, '%'))")
    List<Cidadao> buscarPorNome(@Param("nome") String nome);

    List<Cidadao> findByCep(String cep);

    List<Cidadao> findByAtivoIsFalse();
}