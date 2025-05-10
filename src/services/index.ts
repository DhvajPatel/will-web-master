// src/services/index.ts
import { ServiceRegistry } from './ServiceRegistry';
import { ServiceRegistryImpl } from './ServiceRegistryImpl';

export const serviceRegistry: ServiceRegistry = new ServiceRegistryImpl();
