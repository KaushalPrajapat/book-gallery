package com.crud.ops.crud_operations.models;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "job_refresh_token")
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long refreshTokenId;

    @Column(length = 1000)
    private String refreshToken;
    @Column(length = 1000)
    private String lastAccessToken;

    @OneToOne(fetch = FetchType.EAGER )
    @JoinColumn(nullable = false)
    private Author author;
}
