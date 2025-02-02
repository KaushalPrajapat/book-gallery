package com.crud.ops.crud_operations.dtosO;


import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class SuccessMessageDto {
    private String message;
    private int successCode;
}
