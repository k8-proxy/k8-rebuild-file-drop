import React, { useRef, useEffect, useCallback } from "react";

export interface ClickHandlerProps { onClickInside: Function, onClickOutside: Function, children: React.ReactNode}

const ClickHandler = (props: ClickHandlerProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const onClick = useCallback((event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            props.onClickOutside(event);
        }
        else {
            props.onClickInside(event);
        }
    }, [props]);

    useEffect(() => {
        document.body.addEventListener("mousedown", onClick, false);

        return () => {
            document.body.removeEventListener("mousedown", onClick, false);
        };
    }, [onClick]);

    return <div ref={ref}>{props.children}</div>;
}

ClickHandler.defaultProps = {
    onClickInside: () => { },
    onClickOutside: () => { }
};

export default ClickHandler;