package com.crud.ops.crud_operations.services.Impl;

import com.crud.ops.crud_operations.dtosI.AuthorIDto;
import com.crud.ops.crud_operations.dtosI.BookIDto;
import com.crud.ops.crud_operations.dtosO.BookResponseODto;
import com.crud.ops.crud_operations.dtosO.BookReviewResponseODto;
import com.crud.ops.crud_operations.dtosO.SuccessMessageDto;
import com.crud.ops.crud_operations.exceptions.CustomException;
import com.crud.ops.crud_operations.models.Author;
import com.crud.ops.crud_operations.models.Book;
import com.crud.ops.crud_operations.models.BookReview;
import com.crud.ops.crud_operations.repositories.AuthorRepository;
import com.crud.ops.crud_operations.repositories.BookRepository;
import com.crud.ops.crud_operations.repositories.BookReviewRepository;
import com.crud.ops.crud_operations.services.BookService;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookServiceImpl implements BookService {
    final private BookRepository bookRepository;
    final BookReviewRepository bookReviewRepository;
    final private AuthorRepository authorRepository;

    public BookServiceImpl(BookRepository bookRepository, BookReviewRepository bookReviewRepository, AuthorRepository authorRepository) {
        this.bookRepository = bookRepository;
        this.bookReviewRepository = bookReviewRepository;
        this.authorRepository = authorRepository;
    }

    @Override
    public List<BookResponseODto> getAllBook() {
        List<Book> books = bookRepository.findAll();
        return bookResponse(books);
    }

    @Override
    public List<BookResponseODto> getAllBook(Pageable page) {
        Page<Book> bookPage = bookRepository.findAll(page);
        return bookResponse(bookPage.getContent());
    }

    @Override
    public BookResponseODto getABook(Long bookId) {
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new CustomException("Book with given bookId : " + bookId + " doesn't exists", "BOOK_NOT_FOUND", 404));
        List<BookReview> bookReviews = bookReviewRepository.findByBookBookId(bookId);
        book.setAuthor(authorRepository.findById(book.getAuthor().getId()).orElseGet(() -> authorRepository.findById(1L).get()));
        book.setBookReviews(bookReviews);
//        System.out.println(bookReviews.size());
//        System.out.println(bookReviewRepository.findByBookBookId(1L).size());
        var br = new BookResponseODto(book);
        return br;
    }

    @Override
    public List<BookReviewResponseODto> getReviewsOfABook(Long bookId) {
        List<BookReview> bookReviews = bookReviewRepository.findByBook(bookRepository.findById(bookId).orElseThrow());
        List<BookReviewResponseODto> bookReviewResponseDtoList = new ArrayList<>();
        for (BookReview br : bookReviews) {
            bookReviewResponseDtoList.add(new BookReviewResponseODto(br));
        }
        return bookReviewResponseDtoList;
    }

    @Override
    public AuthorIDto getAuthorOfABook(Long bookId) {
        var authorDto = new AuthorIDto();
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new CustomException("Book with given bookId : " + bookId + " doesn't exists", "BOOK_NOT_FOUND", 404));
        BeanUtils.copyProperties(authorRepository.findById(book.getAuthor().getId()).orElseThrow(() ->
                new CustomException("user doesn;t exists", "USER_NOT_FOUND", 404)), authorDto);
        return authorDto;
    }

    @Override
    public Long getCountOfBook() {
        return bookRepository.count();
    }

    @Override
    public SuccessMessageDto createABook(BookIDto bookIDto) {
        Book book = new Book();
        book.setBookTitle(bookIDto.getBookTitle());
        book.setBookDescription(bookIDto.getBookDescription());
        book.setAuthor(getAuthorByAuthorId(bookIDto.getAuthorId()));
        bookRepository.save(book);
        return SuccessMessageDto.builder().message("Book Saved SuccessFully")
                .successCode(201).build();
    }

    private Author getAuthorByAuthorId(Long authorId) {
        return authorRepository.findById(authorId).orElseThrow(() ->
                new CustomException("Author not found", "AUTHOR_NOT_FOUND", 404));
    }

    private List<BookResponseODto> bookResponse(List<Book> books) {
        List<BookReviewResponseODto> reviews = new ArrayList<>();
        for (Book book : books) {
            List<BookReview> bookReviews = bookReviewRepository.findByBook(book);
            book.setBookReviews(bookReviews);
        }
        List<BookResponseODto> bookResponses = new ArrayList<>();
        for (Book book : books) {
            bookResponses.add(new BookResponseODto(book));
        }
        return bookResponses;
    }
}
