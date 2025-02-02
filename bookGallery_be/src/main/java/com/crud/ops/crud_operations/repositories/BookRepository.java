package com.crud.ops.crud_operations.repositories;

import com.crud.ops.crud_operations.dtosO.smallO.BookSmallODto;
import com.crud.ops.crud_operations.models.Author;
import com.crud.ops.crud_operations.models.Book;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO crud_book (book_id, book_title, book_description, author_id) " +
            "VALUES (:bookId, :bookTitle, :bookDescription, :author) " +
            "ON DUPLICATE KEY UPDATE book_id = book_id;", nativeQuery = true)
    void saveBook(Long bookId, String bookTitle, String bookDescription, Long author);


    List<Book> findAllByAuthor(Author something);

    List<Book> findAllByAuthorId(Long authorId);

//    DELETE ME
//    @Transactional
//    @Query("SELECT new com.crud.ops.crud_operations.dtos.BookSmallODto(br.bookId, br.bookTitle, br.bookDescription) " +
//            "FROM Book br WHERE br.bookId = bookId")
//    List<BookSmallODto> fetchABookByBookId(Long bookId);
}

//@Query("SELECT new com.crud.ops.crud_operations.dtos.BookReviewResponseODto(br.bookReviewId, br.bookReviewTitle, br.bookReview, br.bookReviewRating, br.book) " +
//        "FROM BookReview br WHERE br.book IN :books")