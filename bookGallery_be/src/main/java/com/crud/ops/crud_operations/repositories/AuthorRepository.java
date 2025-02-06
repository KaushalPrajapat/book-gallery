package com.crud.ops.crud_operations.repositories;

import com.crud.ops.crud_operations.models.Author;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
    @Modifying
    @Transactional
    @Query(value = "INSERT IGNORE  INTO crud_author (id, user_id, first_name, last_name, gender, email, phone, date_of_birth, job_title)" +
            " VALUES (:id, :userId, :firstName, :lastName, :gender, :email, :phone, :dateOfBirth, :jobTitle)", nativeQuery = true)
    void saveAuthor(Long id, String userId, String firstName, String lastName, String gender, String email, String phone, String dateOfBirth, String jobTitle);


    Optional<Author> findFirstByEmail(String email);

    Optional<Author> findFirstByFirstNameAndLastName(String firstName, String lastName);

    Optional<Author> findFirstByFirstName(String firstName);

    Optional<Author> findByUserId(String userId);



//    @EntityGraph(attributePaths = {"books", "reviews"})
//    Optional<Author> findById(Long id);
}