package com.crud.ops.crud_operations.dtosO;


import com.crud.ops.crud_operations.dtosO.smallO.AuthorSmallODto;
import com.crud.ops.crud_operations.dtosO.smallO.BookReviewSmallODto;
import com.crud.ops.crud_operations.models.Book;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Data
@Getter
@Setter
public class BookResponseODto {
    private Long bookId;
    private String bookTitle;
    private String bookDescription;
    private AuthorSmallODto author;
    private List<BookReviewSmallODto> reviews = new ArrayList<>();

    public BookResponseODto(Book book) {
        this.bookId = book.getBookId();
        this.bookDescription = book.getBookDescription();
        this.bookTitle = book.getBookTitle();
        this.author = new AuthorSmallODto(book.getAuthor());
        for (var bookReview : book.getBookReviews().stream().limit(1).toList()) {
            this.reviews.add(new BookReviewSmallODto(bookReview));
        }
    }

    public BookResponseODto() {
    }
}
