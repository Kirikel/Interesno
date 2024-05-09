import React, {
    FC,
    PropsWithChildren,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
} from 'react';
//style
import style from './modal.module.css';
//shared
import { createPortal } from 'react-dom';
import CloseIcon from '../SvgIcons/CloseIcon';

type Props = {
    isOpen: boolean;
    toggleModal: () => void;
    title?: string | ReactNode;
    contentClassName?: string;
};

export const Modal: FC<PropsWithChildren<Props>> = ({
    isOpen = false,
    toggleModal,
    title = '',
    contentClassName,
    children,
}) => {
    const ref = useRef<Element | null>(null);

    const modalClassName = isOpen ? `${style.modal} ${style.open}` : style.modal;

    const handleClose = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            toggleModal();
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }

        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [isOpen]);

    useEffect(() => {
        ref.current = document.getElementById('myportal');
    }, []);

    return ref.current
        ? createPortal(
            <div className={modalClassName} onClick={handleClose}>
                <div className={style.modal__dialog}>
                    <div className={`${style.modal__content} ${contentClassName}`}>
                        <button
                            data-close
                            className={style.modal__close}
                            onClick={toggleModal}
                        >
                            <CloseIcon className={style.modal__closeIcon} />
                        </button>

                        <div
                            className={style.modal__title}
                        >
                            {title}
                        </div>
                        <div className={style.modal__children}>{children}</div>
                    </div>
                </div>
            </div>,
            ref.current,
        )
        : null;
};
