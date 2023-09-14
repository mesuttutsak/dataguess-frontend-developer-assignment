import React from 'react'
import Button from '../Button';
import { useDispatch } from 'react-redux';
import { setModalContentAction, setModalTitle, toggleModalAction } from '../../store';

interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    title: string;
}

const Modal = ({ children, title, isOpen }: ModalProps) => {
    const dispatch = useDispatch();

    const handleModalControl = () => {
        dispatch(toggleModalAction());
        dispatch(setModalContentAction(null));
        dispatch(setModalTitle(''));
    };
    return (
        <div className={`modal ${isOpen ? 'open' : 'close'}`}>
            <div className='modalBackdrop' onClick={() => handleModalControl()}></div>
            <div className='modalContent'>
                <div className='modalContentHeadline'>
                    <h2 className='title'>{title}</h2>
                    <Button theme={'icon'} onClick={() => handleModalControl()}>
                        X
                    </Button>
                </div>
                <div className='modalContentBody'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal;