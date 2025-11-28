package com.ecommerce.ecommerce_project.repository;

import com.ecommerce.ecommerce_project.entity.PaymentInformation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentInformationRepository extends JpaRepository<PaymentInformation, Long> {
}