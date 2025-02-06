package com.crud.ops.crud_operations.dtosO;

import lombok.*;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
public class LoginResponse {
    private String accessToken;
    private String refreshToken;
}
