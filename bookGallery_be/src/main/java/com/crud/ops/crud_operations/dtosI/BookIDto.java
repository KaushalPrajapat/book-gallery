package com.crud.ops.crud_operations.dtosI;

import com.crud.ops.crud_operations.models.Author;
import com.crud.ops.crud_operations.models.BookReview;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class BookIDto {
    private Long bookId;
    private Long authorId;
    private String bookTitle;
    private String bookDescription;
}
