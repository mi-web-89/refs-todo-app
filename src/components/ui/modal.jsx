import { forwardRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";
import { useRef } from "react";

const Modal = forwardRef(function Modal({ children, className }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    // return must object
    return {
      open() {
        dialog.current.showModal();
      }
    }
  });
  return createPortal(<dialog ref={dialog} className={className}>{children}</dialog>, document.getElementById('modal-root'));
})

export default Modal
