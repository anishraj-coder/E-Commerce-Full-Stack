package com.ecommerce.ecommerce_project.repository;

import com.ecommerce.ecommerce_project.entity.Address;
import com.ecommerce.ecommerce_project.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address, Long> {

    List<Address> findAllByUser(AppUser user);

    Optional<Address> findByIdAndUser(Long id,AppUser user);
}