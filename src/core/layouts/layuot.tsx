import React, { useEffect } from 'react';

import Modal from '../components/Modal';

import { useSelector } from 'react-redux';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const isOpenModal = useSelector((state: any) => state.isOpenModal);
    const isModalContent = useSelector((state: any) => state.modalContent);

    return (
        <>
            <main>
                {children}
            </main>

            <Modal isOpen = {isOpenModal}>
                {isModalContent}
            </Modal>
        </>
    )
}
export default Layout