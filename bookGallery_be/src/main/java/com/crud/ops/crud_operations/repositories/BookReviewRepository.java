package com.crud.ops.crud_operations.repositories;


import com.crud.ops.crud_operations.dtosO.BookReviewResponseODto;
import com.crud.ops.crud_operations.dtosO.smallO.BookReviewSmallODto;
import com.crud.ops.crud_operations.models.Author;
import com.crud.ops.crud_operations.models.Book;
import com.crud.ops.crud_operations.models.BookReview;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;


@Repository
public interface BookReviewRepository extends JpaRepository<BookReview, Long> {

    List<BookReview> findAllByAuthor(Author author) ;

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO crud_book_review (book_review_id,  author_id, book_review_title, book_review, book_review_rating, book_id) " +
            "VALUES (:bookReviewId, :bookReviewAuthor, :bookReviewTitle, :bookReview, :bookReviewRating, :bookId) " +
            "ON DUPLICATE KEY UPDATE book_review_id = book_review_id;", nativeQuery = true)
    void saveBookReview(Long bookReviewId, Long bookReviewAuthor, String bookReviewTitle, String bookReview, float bookReviewRating, Long bookId);




    List<BookReviewSmallODto> findByBookIn(Set<Book> books);

    @Query("SELECT new com.crud.ops.crud_operations.dtosO.smallO.BookReviewSmallODto(br.bookReviewId, br.bookReviewTitle," +
            " br.bookReview, br.bookReviewRating, br.book, br.author) " +
            "FROM BookReview br WHERE br.book IN :books")
    List<BookReviewSmallODto> findByBooks(@Param("books") Set<Book> books);

    @Query("SELECT new com.crud.ops.crud_operations.dtosO.smallO.BookReviewSmallODto(br.bookReviewId, br.bookReviewTitle," +
            " br.bookReview, br.bookReviewRating, br.book, br.author) " +
            "FROM BookReview br WHERE br.book IN :books")
    List<BookReviewSmallODto> findByBooks(@Param("books") List<Book> books);

    @Query("SELECT new com.crud.ops.crud_operations.dtosO.BookReviewResponseODto(br.bookReviewId, br.bookReviewTitle," +
            " br.bookReview, br.bookReviewRating, br.book) " +
            "FROM BookReview br WHERE br.book IN :books")
    List<BookReviewResponseODto> findReviewsWithBook(@Param("books") List<Book> books);


    List<BookReview> findByBook(Book book);
    List<BookReview> findByBookBookId(Long bookId);

    List<BookReview> findByAuthorId(Long authorId);
}
