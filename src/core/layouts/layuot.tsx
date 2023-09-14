import React, { useEffect } from 'react';

import Modal from '../components/Modal';

import { useSelector } from 'react-redux';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const isOpenModal = useSelector((state: any) => state.isOpenModal);
    const isModalContent = useSelector((state: any) => state.modalContent);
    const modalTitle = useSelector((state: any) => state.modalTitle);

    return (
        <>
            <main>
                {children}
            </main>

            <Modal title={modalTitle} isOpen = {isOpenModal}>
                {isModalContent}
            </Modal>
        </>
    )
}
export default Layout