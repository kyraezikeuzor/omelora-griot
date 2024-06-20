'use client'
import React, {useState, useEffect} from 'react'
import Icon from './Icon'

type ModalProps = {
  children:React.ReactNode;
  className:string;
  modalTrigger:React.ReactNode;
}

export default function Modal({children, className, modalTrigger}:ModalProps) {

    const [isOpen, setIsOpen] = useState(false);

    const handleToggleModal = () => {
      setIsOpen(!isOpen);
    };
  
    const handleCloseModal = (e:any) => {
      if (isOpen && !e.target.closest('.modal-content')) {
        setIsOpen(false);
      }
    };
  
    useEffect(() => {
      if (isOpen) {
        document.addEventListener('mousedown', handleCloseModal);
      } else {
        document.removeEventListener('mousedown', handleCloseModal);
      }
      return () => {
        document.removeEventListener('mousedown', handleCloseModal);
      };
    }, [isOpen]);

    return (
    
    <div className='w-fit'>

        <div className={`cursor-pointer`}>
            <div className='w-full py-1' onClick={handleToggleModal}>
              {modalTrigger}
            </div>
        </div>
        
        
        {isOpen && (
          <div className={`${className} p-5 border-base bg-[--clr-base] rounded-lg shadow-lg`}>
            <div onClick={handleToggleModal} className='flex flex-col items-center absolute top-2 right-2 bg-[--clr-grey-light] rounded-full p-1 cursor-pointer'>
                <Icon icon='X' size='sm' className='block fill-[--clr-grey-extradark]' />
            </div>

            <div className="flex flex-col modal-content mt-5">
              {children}
            </div>

            <div className="modal-overlay"></div>
          </div>
        )}
    
    </div>
        
    )
}