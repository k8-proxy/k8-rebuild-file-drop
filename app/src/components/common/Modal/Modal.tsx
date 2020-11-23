import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import ClickHandler from "../Events/ClickHandler";
import { ExitHandler } from "react-transition-group/Transition";

import styles from "./Modal.module.scss";

export interface ModalContentsProps {
    onClickInside: Function, onClickOutside: Function, children: React.ReactNode
}

const ModalContents = (props: ModalContentsProps) => {
    return (
        <div className={styles.overlay}>
            <ClickHandler onClickInside={props.onClickInside} onClickOutside={props.onClickOutside}>
                <section className={styles.container}>{props.children}</section>
            </ClickHandler>
        </div>);
}


export interface ModalProps {
    onClickInside: Function,
    onClickOutside: Function,
    isOpen: boolean,
    transitionTimeout: number,
    onExitCallback: ExitHandler<HTMLElement>,
    children: React.ReactNode
}

const Modal = (props: ModalProps) => {
    const modalRoot = document.querySelector("#modalRoot");

    return ReactDOM.createPortal(
        <CSSTransition
            in={props.isOpen}
            classNames="modal"
            timeout={props.transitionTimeout}
            unmountOnExit
            onExited={props.onExitCallback}>

            <React.Fragment>
                {<ModalContents
                    {...props}
                    onClickInside={props.onClickInside}
                    onClickOutside={props.onClickOutside} />}
            </React.Fragment>

        </CSSTransition>,
        modalRoot);
}

Modal.defaultProps = {
    onClickInside: () => { },
    onClickOutside: () => { },
    onExitCallback: () => { },
    transitionTimeout: 300
};

export default Modal;