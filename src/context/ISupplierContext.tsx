// SupplierContext.tsx
import React, { createContext, useContext, useState } from 'react';

// Interface para o contexto
interface ISupplierContext {
    objectId: string | null;
    setObjectId: React.Dispatch<React.SetStateAction<string | null>>;
}

// Cria o contexto com valor inicial
const SupplierContext = createContext<ISupplierContext | undefined>(undefined);

// Componente Provider para o Contexto
export const SupplierProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [objectId, setObjectId] = useState<string | null>(null);

    return (
        <SupplierContext.Provider value={{ objectId, setObjectId }}>
            {children}
        </SupplierContext.Provider>
    );
};

// Hook para usar o contexto
export const useSupplier = () => {
    const context = useContext(SupplierContext);
    if (!context) {
        throw new Error('useSupplier deve ser usado dentro de um SupplierProvider');
    }
    return context;
};
