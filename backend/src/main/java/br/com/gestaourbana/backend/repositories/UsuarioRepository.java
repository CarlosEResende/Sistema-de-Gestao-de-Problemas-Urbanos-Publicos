package br.com.gestaourbana.backend.repositories;

import br.com.gestaourbana.backend.models.Usuario;
import br.com.gestaourbana.backend.models.enums.TipoUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, UUID> {

    Optional<Usuario> findByEmail(String email);
    boolean existsByEmail(String email);
    Optional<Usuario> findByCpf(String cpf);
    
    @Query("SELECT u FROM Usuario u WHERE u.tipoUsuario = :tipo AND u.ativo = true")
    List<Usuario> buscarPorTipoEAtivo(@Param("tipo") TipoUsuario tipo);

    @Query("SELECT u FROM Usuario u WHERE LOWER(u.nome) LIKE LOWER(concat('%', :nome,'%'))")
    List<Usuario> buscarPorNome(@Param("nome") String nome);

    List<Usuario> findByTipoUsuario(TipoUsuario tipo);

    List<Usuario> findByAtivo(boolean ativo);

    Optional<Usuario> findByTelefone(String telefone);

    @Query("SELECT u FROM Usuario u WHERE u.email LIKE %:dominio%")
    List<Usuario> buscarPorDominioEmail(@Param("dominio") String dominio);
}