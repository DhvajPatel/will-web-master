import { serviceRegistry } from '../src/services'; // ✅ Import the shared instance

describe('ServiceRegistry', () => {
    it('should correctly provide the login service with expected methods', () => {
        const loginService = serviceRegistry.getLoginService(); // ✅ Use the singleton

        expect(loginService).toBeDefined();
        expect(typeof loginService.login).toBe('function'); // core method check

        // Optional: Add more if your LoginService has other functions
        // expect(typeof loginService.logout).toBe('function');
        // expect(typeof loginService.getCurrentUser).toBe('function');
    });
});
