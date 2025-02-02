package com.crud.ops.crud_operations.dtosO;

import com.crud.ops.crud_operations.dtosO.smallO.BookSmallODto;
import com.crud.ops.crud_operations.dtosO.smallO.BookSmallODto;
import com.crud.ops.crud_operations.models.Author;
import com.crud.ops.crud_operations.models.Book;
import com.crud.ops.crud_operations.models.BookReview;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Data
@Getter
@Setter
public class AuthorResponseODto {
    private Long id;
    private String userId;
    private String name;
    private String gender;
    private String email;
    private String phone;
    private String dateOfBirth;
    private String jobTitle;
    private List<BookSmallODto> books;
    private List<BookReviewResponseODto> reviews;

    public AuthorResponseODto(Author author) {
        this.userId = author.getUserId();
        this.id = author.getId();
        this.name = author.getFirstName() + " " + author.getLastName();
        this.email = author.getEmail();
        this.gender = author.getGender();
        this.phone = author.getPhone();
        this.dateOfBirth = author.getDateOfBirth();
        this.jobTitle = author.getJobTitle();

        List<BookSmallODto> books = new ArrayList<>();
        for (Book book : author.getBooks()) {
            books.add(new BookSmallODto(book));
        }

        List<BookReviewResponseODto> bookReviews = new ArrayList<>();
        for (BookReview bookReview : author.getReviews()) {
            bookReviews.add(new BookReviewResponseODto(bookReview));
        }
        this.books = books;
        this.reviews = bookReviews;
    }
}
