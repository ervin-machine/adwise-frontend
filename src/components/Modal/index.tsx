import React from 'react'

type Props = {
    isOpen: boolean,
    onClose: () => void,
    children: any
}

const Modal = (props: Props) => {
  const { isOpen, onClose, children } = props
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-black">&times;</button>
        {children}
      </div>
    </div>
  )
}

export default Modal