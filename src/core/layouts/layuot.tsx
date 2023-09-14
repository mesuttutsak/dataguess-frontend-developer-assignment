import React from 'react';

import Modal from '../components/Modal';

const Layout = ({ children }: { children: React.ReactNode }) => {

    return (
        <>
            <main>
                {children}
            </main>

            <Modal />
        </>
    )
}
export default Layout