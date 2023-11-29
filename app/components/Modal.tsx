import React, { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from '../page.module.css'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    // Function to handle click event
    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return ReactDOM.createPortal(
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modalContent}>
                {children}
                <button onClick={onClose}>Close</button>
            </div>
        </div>,
        document.body
    );
};

export default Modal;

