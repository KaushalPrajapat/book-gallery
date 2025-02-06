package com.crud.ops.crud_operations.controllers;

import com.crud.ops.crud_operations.dtosI.BookIDto;
import com.crud.ops.crud_operations.models.Book;
import com.crud.ops.crud_operations.repositories.BookRepository;
import com.crud.ops.crud_operations.services.AuthorService;
import com.crud.ops.crud_operations.services.BookReviewService;
import com.crud.ops.crud_operations.services.BookService;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/basic")
public class BookController {

    final AuthorService authorService;
    final BookService bookService;
    final BookReviewService bookReviewService;
    final BookRepository bookRepository;

    public BookController(AuthorService authorService, BookService bookService,
                          BookReviewService bookReviewService, BookRepository bookRepository) {
        this.authorService = authorService;
        this.bookService = bookService;
        this.bookReviewService = bookReviewService;
        this.bookRepository = bookRepository;
    }

    @PostMapping("/create/book")
    public ResponseEntity<?> createABook(@RequestBody BookIDto bookIDto) {
        var res =bookService.createABook(bookIDto);
        return ResponseEntity.ok(res);
    }

//    @GetMapping("/book")
//    public ResponseEntity<?> getAllBook() {
//        return ResponseEntity.ok(bookService.getAllBook());
//    }

    @GetMapping("/book/count")
    public ResponseEntity<?> getCountOfBook() {
        return ResponseEntity.ok(bookService.getCountOfBook());
    }

    @GetMapping("/book")
    public ResponseEntity<?> getAllBook(@RequestParam(name = "size") int count,
                                        @RequestParam(name = "page") int pageNumber) {
        Pageable page = PageRequest.of(pageNumber, count);

        return ResponseEntity.ok(bookService.getAllBook(page));
    }

    @GetMapping("/book/{bookId}")
    public ResponseEntity<?> getABook(@PathVariable Long bookId) {
        return ResponseEntity.ok(bookService.getABook(bookId));
    }
}
