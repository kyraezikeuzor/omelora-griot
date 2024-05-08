'use client'
import React, {useState, useEffect} from 'react'
import Icon from './Icon'

type ModalProps = {
  children:React.ReactNode;
  modalClassName:string;
  toggleElement:React.ReactNode;
}

export default function Modal({children, modalClassName, toggleElement}:ModalProps) {

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
              {toggleElement}
            </div>
        </div>
        
        
        {isOpen && (
          <div className={`${modalClassName} p-5 border-[1px] border-[--clr-grey-light] bg-[--clr-base] rounded-lg shadow-lg`}>
            <div onClick={handleToggleModal} className='flex flex-col items-center absolute top-2 right-2 bg-[--clr-base-accent] rounded-full p-1 cursor-pointer'>
                <Icon icon='X' size='sm' className='block fill-[--clr-grey-dark]' />
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