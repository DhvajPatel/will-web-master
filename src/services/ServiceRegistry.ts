// src/services/ServiceRegistry.ts
import { LoginService } from './login/LoginService';

export interface ServiceRegistry {
    getLoginService(): LoginService;
    // Add future methods like:
    // getUserService(): UserService;
    // getLegalPartnerService(): LegalPartnerService;
}
