// src/services/ServiceRegistryImpl.ts
import { ServiceRegistry } from './ServiceRegistry';
import { LoginService } from './login/LoginService';
import { LoginServiceFactory } from './login/LoginServiceFactory';

export class ServiceRegistryImpl implements ServiceRegistry {
    private readonly loginService: LoginService;

    constructor() {
        this.loginService = LoginServiceFactory();
        // Add more service factories here
    }

    getLoginService(): LoginService {
        return this.loginService;
    }

    // Add more getters as needed
}
