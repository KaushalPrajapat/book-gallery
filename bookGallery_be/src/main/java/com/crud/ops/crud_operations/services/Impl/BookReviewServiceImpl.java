package com.crud.ops.crud_operations.services.Impl;

import com.crud.ops.crud_operations.dtosI.BookReviewIDto;
import com.crud.ops.crud_operations.dtosO.SuccessMessageDto;
import com.crud.ops.crud_operations.exceptions.CustomException;
import com.crud.ops.crud_operations.models.Author;
import com.crud.ops.crud_operations.models.Book;
import com.crud.ops.crud_operations.models.BookReview;
import com.crud.ops.crud_operations.repositories.AuthorRepository;
import com.crud.ops.crud_operations.repositories.BookRepository;
import com.crud.ops.crud_operations.repositories.BookReviewRepository;
import com.crud.ops.crud_operations.services.AuthService;
import com.crud.ops.crud_operations.services.BookReviewService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class BookReviewServiceImpl implements BookReviewService {
    private static final Logger log = LoggerFactory.getLogger(BookReviewServiceImpl.class);
    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final BookReviewRepository bookReviewRepository;
    private final AuthUtils authUtils;

    public BookReviewServiceImpl(BookRepository bookRepository, AuthorRepository authorRepository,
                                 BookReviewRepository bookReviewRepository, AuthService authService, AuthUtils authUtils) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
        this.bookReviewRepository = bookReviewRepository;
        this.authUtils = authUtils;
    }

    @Override
    public SuccessMessageDto createABookReview(BookReviewIDto bookReviewInput) {
        Author writer = authUtils.getLoggedInUser();
        BookReview bookReview = new BookReview();
        BeanUtils.copyProperties(bookReviewInput, bookReview);
        Book book = getBookByBookId(bookReviewInput.getBook());
        bookReview.setAuthor(writer);
        bookReview.setBook(book);
        BookReview savedReview = bookReviewRepository.save(bookReview);
        book.getBookReviews().add(savedReview);
        bookRepository.save(book);
        return new SuccessMessageDto("Review Created", 200);
    }

    private Author getAuthorByFirstName(String firstName) {
        return authorRepository.findFirstByFirstName(firstName).orElseGet(() -> {
            Author author = new Author();
            author.setFirstName(firstName);
            return authorRepository.save(author);
        });
    }

    private Author getAuthorByFullName(String firstName, String lastName) {
        return authorRepository.findFirstByFirstNameAndLastName(firstName, lastName).orElseGet(() ->
        {
            Author author = new Author();
            author.setFirstName(firstName);
            author.setLastName(lastName);
            return authorRepository.save(author);
        });
    }

    private Book getBookByBookId(Long bookId) {
        return bookRepository.findById(bookId).orElseThrow(() ->
                new CustomException("Book doesn't exists", "BOOK_NOT_FOUND", 404));
    }

    private Author getAuthorByAuthorId(Long authorId) {
        return authorRepository.findById(authorId).orElseThrow(() ->
                new CustomException("Author doesn't exists", "AUTHOR_NOT_FOUND", 404));
    }
}
