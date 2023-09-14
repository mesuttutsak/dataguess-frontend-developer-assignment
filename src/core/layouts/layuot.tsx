import React from 'react';

import Modal from '../components/Modal';

import { useSelector } from 'react-redux';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const isOpenModal = useSelector((state: any) => state.isOpenModal);
    const isModalContent = useSelector((state: any) => state.isOpenCıontent);

    return (
        <>

            <main>
                {children}
            </main>

            <Modal isOpen = {isOpenModal}>
                Deneme
            </Modal>
        </>
    )
}
export default Layout