package com.crud.ops.crud_operations.repositories;


import com.crud.ops.crud_operations.models.Author;
import com.crud.ops.crud_operations.models.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    boolean existsByAuthor(Author user);

    RefreshToken findByAuthor(Author user);
}
