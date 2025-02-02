package com.crud.ops.crud_operations.models;


import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "crud_book")
@Data
@Getter
@Setter
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id")
    private Author author;

    private String bookTitle;
    private String bookDescription;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "book")
    private List<BookReview> bookReviews;

}
