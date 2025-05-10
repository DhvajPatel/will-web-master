import React, { createContext, useContext, ReactNode, useState } from 'react';

// Define the context type
interface ApiFlowContextType {
    loading: boolean;
    error: string | null;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    resetError: () => void; // Add resetError to the context
}

// Create the context
const ApiFlowContext = createContext<ApiFlowContextType | undefined>(undefined);

// Define the provider props
interface ApiFlowProviderProps {
    children: ReactNode;
}

// ApiFlowProvider component that provides context to children
export const ApiFlowProvider: React.FC<ApiFlowProviderProps> = ({ children }) => {
    // Initialize the state for loading and error
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Function to reset error
    const resetError = () => setError(null);

    return (
        <ApiFlowContext.Provider value={{ loading, error, setLoading, setError, resetError }}>
            {children}
        </ApiFlowContext.Provider>
    );
};

// Custom hook to use the ApiFlowContext
export const useApiFlow = (): ApiFlowContextType => {
    const context = useContext(ApiFlowContext);
    if (!context) {
        throw new Error('useApiFlow must be used within an ApiFlowProvider');
    }
    return context;
};
