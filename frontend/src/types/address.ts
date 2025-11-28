export interface Address {
    id: number;
    firstName: string;
    lastName: string;
    streetAddress: string;
    city: string;
    state: string;
    zip: string;
    phoneNo: string;
}

export interface CreateAddressRequest {
    firstName: string;
    lastName: string;
    streetAddress: string;
    city: string;
    state: string;
    zip: string;
    phoneNo: string;
}