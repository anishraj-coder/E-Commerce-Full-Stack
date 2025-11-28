package com.ecommerce.ecommerce_project.service;

import com.ecommerce.ecommerce_project.dto.request.CreateAddressRequest;
import com.ecommerce.ecommerce_project.entity.Address;
import com.ecommerce.ecommerce_project.entity.AppUser;
import com.ecommerce.ecommerce_project.repository.AddressRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;

    @Transactional(readOnly = true)
    public List<Address> getAddressFromUser(AppUser user){
        return addressRepository.findAllByUserAndIsArchivedFalse(user);
    }

    @Transactional
    public Address addAddressToUser(AppUser appUser, CreateAddressRequest request){
        Address address=Address.builder()
                .streetAddress(request.getStreetAddress())
                .city(request.getCity())
                .state(request.getState())
                .zip(request.getZip())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phoneNo(request.getPhoneNo())
                .user(appUser)
                .build();
        Address savedAddress=addressRepository.save(address);
        appUser.getAddresses().add(savedAddress);
        return savedAddress;
    }

    @Transactional
    public void removeAddress(AppUser appUser, Long addressId){
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> {
                    log.error("Cannot find address with id: {}", addressId);
                    return new IllegalArgumentException("Cannot find the address with id: " + addressId);
                });

        if(!address.getUser().getId().equals(appUser.getId()))
            throw new SecurityException("Cannot change address of this user");

        address.setIsArchived(true);
        addressRepository.save(address);

        appUser.getAddresses().remove(address);
    }

    @Transactional(readOnly = true)
    public Address getAddressById(Long addressId){
        return addressRepository.findById(addressId)
                .orElseThrow(()->{
                    log.error("Cannot find address with id: {}",addressId);
                    return new IllegalArgumentException("Cannot find address with id: "+addressId);
                });
    }
}
