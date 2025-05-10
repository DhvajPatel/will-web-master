// src/services/user/UserDto.ts
import { UserType } from "./UserType";
import { RoleType } from "./RoleType";

export enum UserStatus {
    PENDING_VERIFICATION = "PENDING_VERIFICATION",
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED",
    DELETED = "DELETED",
}

export interface AddressDto {
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
}

export interface UserDto {
    userId: string;

    // Name & identity
    title?: string;              // Mr, Ms, Dr etc.
    firstName: string;
    middleName?: string;
    lastName: string;
    fullName: string;            // Derived or backend generated

    // Contact info
    email: string;
    phoneNumber?: string;

    // Address
    address?: AddressDto;

    // Auth & status
    userType: UserType;
    roles: RoleType[];
    status: UserStatus;          // PENDING_VERIFICATION, ACTIVE, BLOCKED, etc.

    // Audit fields
    createdAt?: string;          // ISO timestamp
    createdBy?: string;
    updatedAt?: string;
    updatedBy?: string;
}
