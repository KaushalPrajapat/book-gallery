package com.crud.ops.crud_operations.configs.jwt;


import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.Objects;
import java.util.stream.Collectors;


@Component
@Slf4j
@PropertySource("classpath:props.properties")
public class JwtUtils {
    @Value("${spring.app.jwtSecret}")
    private String jwtSecret;

    @Value("${spring.app.jwtAccessExpirationMs}")
    private long jwtAccessExpirationMs;


    @Value("${spring.app.jwtRefreshExpirationMs}")
    private long jwtRefreshExpirationMs;

    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    public String generateAccessToken(UserDetails userDetails) {
        return generateAccessTokenFromUserName(userDetails, jwtAccessExpirationMs);
    }

    public String generateRefreshTokenToken(UserDetails userDetails) {
        return generateRefreshFromUserName(userDetails, jwtRefreshExpirationMs);
    }

    private String generateAccessTokenFromUserName(UserDetails userDetails, long expirationTime) {
        String username = userDetails.getUsername();
        String roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        JwtBuilder builder = Jwts.builder();
        builder.subject(username);
        builder.claim("roles", roles);
        builder.issuedAt(new Date());
        builder.expiration(new Date(new Date().getTime() + expirationTime));
        builder.signWith(key());
        return builder.compact();
    }

    private String generateRefreshFromUserName(UserDetails userDetails, long expirationTime) {
        String username = userDetails.getUsername();
        String roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        JwtBuilder builder = Jwts.builder();
        builder.subject(username);
        builder.issuedAt(new Date());
        builder.expiration(new Date(new Date().getTime() + expirationTime));
        builder.signWith(key());
        return builder.compact();
    }

    public Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public String getUserNameFromJwtToken(String token) {
        if (extractAllClaims(token) == null) return null;
        else return Objects.requireNonNull(extractAllClaims(token)).getSubject();
    }

    public Date extractExpiration(String token) {
        return extractAllClaims(token).getExpiration();
    }


    private Claims extractAllClaims(String token) {
        try {
            return Jwts.parser().verifyWith((SecretKey) key())
                    .build().parseSignedClaims(token).getPayload();
        } catch (Exception e) {
            return null;
        }
    }

    public String extractJwtTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        log.warn("Bearer Token : {}", bearerToken);
        System.out.println(bearerToken);
        if (bearerToken != null && bearerToken.startsWith("Bearer")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    public boolean validateJwtToken(UserDetails userDetails, String authToken) {
        try {
            boolean isTokenExpired = isTokenExpired(authToken);
            String getUserNameFromJwtToken = getUserNameFromJwtToken(authToken);
            return !isTokenExpired && userDetails.getUsername().equalsIgnoreCase(getUserNameFromJwtToken);
        } catch (MalformedJwtException e) {
            log.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            log.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.error("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }
}
