package com.RoadReady.Security;

import com.RoadReady.Entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@SuppressWarnings("serial")
public class UserDetailsImpl implements UserDetails {

    private Long id;
    private String username;
    private String password;
    private Collection<? extends GrantedAuthority> authorities;

    public UserDetailsImpl(Long id, String username, String password, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.authorities = authorities;
    }

    public static UserDetailsImpl build(User user) {
        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.name())) 
                .collect(Collectors.toList());

        return new UserDetailsImpl(
                user.getId(),
                user.getEmail(), 
                user.getPassword(),
                authorities);
    }

    public Long getId() { 
        return id;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() { 
        return authorities;
    }

    @Override
    public String getPassword() { 
        return password;
    }

    @Override
    public String getUsername() { 
        return username;
    }

    @Override
    public boolean isAccountNonExpired() { 
        return true;
    }

    @Override
    public boolean isAccountNonLocked() { 
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() { 
        return true;
    }

    @Override
    public boolean isEnabled() { 
        return true;
    }
}