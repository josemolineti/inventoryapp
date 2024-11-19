import React, { createContext, useContext, useState } from 'react';

interface ISupplierContext {
    objectId: string | null;
    setObjectId: React.Dispatch<React.SetStateAction<string | null>>;
}

const SupplierContext = createContext<ISupplierContext | undefined>(undefined);

export const SupplierProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [objectId, setObjectId] = useState<string | null>(null);

    return (
        <SupplierContext.Provider value={{ objectId, setObjectId }}>
            {children}
        </SupplierContext.Provider>
    );
};

export const useSupplier = () => {
    const context = useContext(SupplierContext);
    if (!context) {
        throw new Error('useSupplier deve ser usado dentro de um SupplierProvider');
    }
    return context;
};
