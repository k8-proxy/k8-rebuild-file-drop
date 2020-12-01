import React from "react";
import Modal from "../common/Modal/Modal";

import Header from "./Header";
import Body from "./Body";
import CloseButton from "./CloseButton";

export interface GlasswallModalProps { isOpen: boolean, onClickInside?: Function, onCloseAction: Function };

const GlasswallModal = (props: GlasswallModalProps) => {
    return (
        <Modal
            isOpen={props.isOpen}
            onClickInside={() => { }}
            onClickOutside={props.onCloseAction}>

            <Header />
            <Body />
            
            <CloseButton closeAction={props.onCloseAction}/>                        
        </Modal>
    );
};

export default GlasswallModal;