import React from "react";
import styles from "./GlasswallModal.module.scss";

export interface CloseButtonProps { closeAction: Function };

function CloseButton(props: CloseButtonProps) {
    return <button onClick={() => props.closeAction()} tabIndex={-1} type="button" className={styles.close}></button>;
}

export default CloseButton;