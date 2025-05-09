package com.crud.ops.crud_operations.dtosI;

import jakarta.persistence.Lob;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class Book4BatchDto {
    private Long bookId;
    private Long author;
    private String bookTitle;
    private String bookDescription;
    @Lob
    private byte[] image;
}
