import React, { useEffect } from 'react'
import Button from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { setModalContentAction, setModalTitle, toggleModalAction } from '../../store';

interface ModalProps {
    children?: React.ReactNode;
    isOpen?: boolean;
    title?: string;
}

const Modal = ({ children, title }: ModalProps) => {
    const dispatch = useDispatch();

    const isOpenModal = useSelector((state: any) => state.isOpenModal);
    const isModalContent = useSelector((state: any) => state.modalContent);
    const modalTitle = useSelector((state: any) => state.modalTitle);

    const handleModalControl = () => {
        dispatch(toggleModalAction());
        dispatch(setModalContentAction(null));
        dispatch(setModalTitle(''));
    };

    return (
        <div className={`modal ${isOpenModal ? 'open' : 'close'}`}>
            <div className='modalBackdrop' onClick={() => handleModalControl()}></div>
            <div className='modalContent'>
                <div className='modalContentHeadline'>
                    <h2 className='title'>{title ? title : modalTitle}</h2>
                    <Button theme={'icon'} onClick={() => handleModalControl()}>
                        X
                    </Button>
                </div>
                <div className='modalContentBody'>
                 {children ? children : isModalContent}
                </div>
            </div>
        </div>
    )
}

export default Modal;