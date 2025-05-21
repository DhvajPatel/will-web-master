// src/services/login/LoginServiceMockImpl.ts
import { LoginService } from './LoginService';
import { LoginRequestDto } from './LoginRequestDto';
import { LoginResponseDto } from './LoginResponseDto';
import { UserDto, UserStatus } from '../../services/user/UserDto';
import { UserType } from '../../services/user/UserType';
import { RoleType } from '../../services/user/RoleType';

// A mock function to simulate JWT generation
const generateMockJWT = (userId: string): string => {
    return `mocked-jwt-token-for-${userId}`;
};

export class LoginServiceMockImpl implements LoginService {
    // Mock users data
    private users: UserDto[] = [
        {
            userId: 'account-123',
            title: 'Mr.',
            firstName: 'Account',
            lastName: 'User',
            fullName: 'Account User',
            email: 'account@example.com',
            userType: UserType.ACCOUNT_USER,
            roles: [RoleType.VIEW_DASHBOARD],
            status: UserStatus.ACTIVE,
            address: {
                line1: '123 Account St',
                city: 'Cityville',
                postalCode: '12345',
                country: 'Countryland',
            },
            createdAt: '2024-02-15T12:00:00Z',
            createdBy: 'system',
            updatedAt: '2024-02-15T12:00:00Z',
            updatedBy: 'system',
        },
        {
            userId: 'partner-123',
            title: 'Ms.',
            firstName: 'Partner',
            lastName: 'User',
            fullName: 'Partner User',
            email: 'partner@example.com',
            userType: UserType.PARTNER_USER,
            roles: [RoleType.VIEW_DASHBOARD],
            status: UserStatus.ACTIVE,
            address: {
                line1: '456 Partner Ave',
                city: 'Cityville',
                postalCode: '67890',
                country: 'Countryland',
            },
            createdAt: '2024-02-15T12:00:00Z',
            createdBy: 'system',
            updatedAt: '2024-02-15T12:00:00Z',
            updatedBy: 'system',
        },
        {
            userId: 'admin-123',
            title: 'Dr.',
            firstName: 'Admin',
            lastName: 'User',
            fullName: 'Admin User',
            email: 'admin@example.com',
            userType: UserType.ADMIN_USER,
            roles: [RoleType.VIEW_DASHBOARD, RoleType.MANAGE_USERS],
            status: UserStatus.ACTIVE,
            address: {
                line1: '789 Admin Blvd',
                city: 'Cityville',
                postalCode: '11223',
                country: 'Countryland',
            },
            createdAt: '2024-02-15T12:00:00Z',
            createdBy: 'system',
            updatedAt: '2024-02-15T12:00:00Z',
            updatedBy: 'system',
        }
    ];

    // Login method
    async login(request: LoginRequestDto): Promise<LoginResponseDto> {
        // Simulate latency
        await new Promise((r) => setTimeout(r, 1000));

        // Search for the user by email
        const user = this.users.find(u => u.email === request.email);

        if (!user) {
            throw new Error('Invalid credentials');  // User not found
        }

        // Check password (for mock purposes, we use a hardcoded password check)
        if (request.password !== 'password') {
            throw new Error('Invalid credentials');  // Incorrect password
        }

        // Simulate different user status
        if (user.status === UserStatus.BLOCKED) {
            throw new Error('User is blocked');  // Blocked user scenario
        }

        // Generate and return the mocked JWT token
        const token = generateMockJWT(user.userId);

        // Return the response as per the new contract (LoginResponseDto)
        return {
            token: token,
            user: user,  // Include the full user object as per the new contract
        };
    }
}
