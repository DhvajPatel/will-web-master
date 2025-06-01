import { LoginServiceFactory } from '../src/services/login/LoginServiceFactory'; // Factory for the login service

describe('Login Service Mock Test', () => {
    let loginService: any;

    beforeEach(() => {
        loginService = LoginServiceFactory();  // Factory should return the mock implementation
    });

    it('should return a valid response for correct login credentials', async () => {
        const request = {
            email: 'test@example.com',
            password: 'password',
        };

        const response = await loginService.login(request);

        // Check the expected mock response
        expect(response).toHaveProperty('userId', 'user-123');
        expect(response).toHaveProperty('email', 'test@example.com');
        expect(response).toHaveProperty('fullName', 'Test User');
        expect(response).toHaveProperty('token', 'mocked-jwt-token');
    });

    it('should throw an error for invalid login credentials', async () => {
        const request = {
            email: 'invalid@example.com',
            password: 'wrongpassword',
        };

        await expect(loginService.login(request)).rejects.toThrow('Invalid credentials');
    });
});
