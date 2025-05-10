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
            userId: 'user-123',
            title: 'Mr.',
            firstName: 'John',
            lastName: 'Doe',
            fullName: 'John Doe',
            email: 'john.doe@example.com',
            userType: UserType.INDIVIDUAL_USER,
            roles: [RoleType.VIEW_DASHBOARD, RoleType.CREATE_WILL],
            status: UserStatus.ACTIVE,
            address: {
                line1: '123 Main St',
                city: 'Cityville',
                postalCode: '12345',
                country: 'Countryland',
            },
            createdAt: '2025-04-09T12:00:00Z',
            createdBy: 'admin',
            updatedAt: '2025-04-09T12:00:00Z',
            updatedBy: 'admin',
        },
        {
            userId: 'user-124',
            title: 'Mr.',
            firstName: 'Alice',
            lastName: 'Smith',
            fullName: 'Alice Smith',
            email: 'alice.smith@example.com',
            userType: UserType.CORPORATE_ADMIN,
            roles: [RoleType.MANAGE_USERS, RoleType.VIEW_DASHBOARD],
            status: UserStatus.ACTIVE,
            address: {
                line1: '456 Admin Ave',
                city: 'Cityville',
                postalCode: '67890',
                country: 'Countryland',
            },
            createdAt: '2025-04-09T12:00:00Z',
            createdBy: 'admin',
            updatedAt: '2025-04-09T12:00:00Z',
            updatedBy: 'admin',
        },
        {
            userId: 'user-125',
            title: 'Ms.',
            firstName: 'Linda',
            lastName: 'Johnson',
            fullName: 'Linda Johnson',
            email: 'linda.johnson@example.com',
            userType: UserType.SUPPORT_USER,
            roles: [RoleType.VIEW_DASHBOARD],
            status: UserStatus.ACTIVE,
            address: {
                line1: '789 Support St',
                city: 'Cityville',
                postalCode: '11223',
                country: 'Countryland',
            },
            createdAt: '2025-04-09T12:00:00Z',
            createdBy: 'admin',
            updatedAt: '2025-04-09T12:00:00Z',
            updatedBy: 'admin',
        },
        {
            userId: 'user-126',
            title: 'Mr.',
            firstName: 'Blocked',
            lastName: 'User',
            fullName: 'Blocked User',
            email: 'blocked.user@example.com',
            userType: UserType.INDIVIDUAL_USER,
            roles: [RoleType.VIEW_WILL],
            status: UserStatus.BLOCKED,
            address: {
                line1: '101 Blocked St',
                city: 'Cityville',
                postalCode: '44556',
                country: 'Countryland',
            },
            createdAt: '2025-04-09T12:00:00Z',
            createdBy: 'admin',
            updatedAt: '2025-04-09T12:00:00Z',
            updatedBy: 'admin',
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
