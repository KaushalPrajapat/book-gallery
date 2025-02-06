package com.crud.ops.crud_operations.dtosI;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SignInDto {
    private String username;
    private String password;
}
