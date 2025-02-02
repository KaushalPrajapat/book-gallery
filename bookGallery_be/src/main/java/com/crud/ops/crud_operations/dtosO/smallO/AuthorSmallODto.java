package com.crud.ops.crud_operations.dtosO.smallO;


import com.crud.ops.crud_operations.models.Author;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
@AllArgsConstructor
public class AuthorSmallODto {
    private long id;
    private String name;

    public AuthorSmallODto(Author author) {
        this.id = author.getId();
        this.name = author.getFirstName() + " " + author.getLastName();
    }

    public AuthorSmallODto() {

    }
}
