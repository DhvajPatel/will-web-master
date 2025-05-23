import { LoginServiceImpl } from './LoginServiceImpl'; // Real service
import {LoginServiceMockImpl} from './LoginServiceMockImpl';
import { LoginService } from './LoginService'; // Interface

export const LoginServiceFactory = (): LoginService => {
    console.log('Using service:', import.meta.env.VITE_USE_MOCK); // Log the environment value
    console.log('import.meta.env.VITE_USE_MOCK:', import.meta.env.VITE_USE_MOCK); // Log the environment value
    if (import.meta.env.VITE_USE_MOCK === 'true') {
        console.log('Using Mock Service');
        return new LoginServiceMockImpl(); // Mock service
    } else {
        console.log('Using Real Service');
        return new LoginServiceImpl(); // Real service
    }
};
