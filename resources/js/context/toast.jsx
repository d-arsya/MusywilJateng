import { Toast } from 'primereact/toast';
import { createContext, useCallback, useContext, useRef } from 'react';

const ToastContext = createContext();

export const PrimeToastProvider = ({ children }) => {
    const toastRef = useRef(null);
    const showToast = useCallback((severity, summary, detail) => {
        if (toastRef.current) {
            toastRef.current.show({
                severity: severity,
                summary: summary,
                detail: detail,
                life: 1000, // Default duration
            });
        }
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {/* 3. Render the PrimeReact Toast component */}
            <Toast ref={toastRef} />
        </ToastContext.Provider>
    );
};

// Custom hook to access the showToast function globally
export const useToast = () => {
    return useContext(ToastContext);
};
