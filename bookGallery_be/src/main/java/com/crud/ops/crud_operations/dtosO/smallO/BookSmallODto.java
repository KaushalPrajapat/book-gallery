package com.crud.ops.crud_operations.dtosO.smallO;

import com.crud.ops.crud_operations.models.Book;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class BookSmallODto {
    private Long bookId;
    private String bookTitle;
    private String bookDescription;

    public BookSmallODto() {
    }

    public BookSmallODto(Book book) {
        this.bookId = book.getBookId();
        this.bookDescription = book.getBookDescription();
        this.bookTitle = book.getBookTitle();
    }

    public BookSmallODto(Long bookId, String bookTitle, String bookDescription) {
        this.bookId = bookId;
        this.bookTitle = bookTitle;
        this.bookDescription = bookDescription;
    }
}
