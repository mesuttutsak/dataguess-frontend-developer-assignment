import React from 'react'
import Button from '../Button';
import { useDispatch } from 'react-redux';
import { toggleModalAction } from '../../store';

interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
}

const Modal = ({ children, isOpen }: ModalProps) => {
    const dispatch = useDispatch();

    const handleModalControl = () => {
      dispatch(toggleModalAction());
    };
    return (
        <div className={`modal ${isOpen ? 'open' : 'close'}`}>
            <div className='modalBackdrop'></div>
            <div className='modalContent'>
                <div className='modalContentHeadline'>
                    <h2 className='title'>Deneme</h2>
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