import { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
// import styles from '../styles/components/Modal.module.scss';

const Modal = ({ children, title, show, closeModal, modalRef }) => {
    const modalContainerRef = useRef();

    // useEffect to detect a click outside of the modalContainer
    useEffect(() => {
        function handleClickOutside(event) {
            if (modalContainerRef.current && 
                !modalContainerRef.current.contains(event.target)) {
                closeModal && closeModal();
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        // Unbind the event listener on clean up
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [modalRef, modalContainerRef]);

    if (show) {
        return (
            <div className={'z-[100] bg-[rbga(0,0,0,0.825) w-full absolute h-screen top-0 left-0'} ref={modalRef}>
                <div className={'absolute z-[101] left-[50%] top-[50%] translate-y-2/4 translate-x-2/4 bg-neutral-900 p-10 m-auto max-w-[660px] w-full flex flex-col gap-y-5'} ref={modalContainerRef} >
                    <div className={'w-full flex flex-row self-end'}>
                        <div className={'text-3xl text-white max-w-[400px] text-center leading-[1.4] m-auto pb-5 font-light'}>{title}</div>
                        <FaTimes onClick={() => { closeModal && closeModal() }} className='text=[rgb(215,215,215)] text-4xl cursor-pointer transition duration-500 hover:brightness-125' />
                    </div>
                    {/* MODAL BODY */}
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        )
    } else return null
};

export default Modal;