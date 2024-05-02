import React from 'react';
import styles from "./Dot.module.css"

enum State {
    Clear,
    Process1,
    Process2,
    Used1,
    Used2,
    Dead1,
    Dead2,
}

interface IDot {
    x: number;
    y: number;
    state: State;
    next_x: number|undefined;
    next_y: number|undefined;
}

interface DotProps {
    dot: IDot,
    onClick: (a: IDot)=>void
}

const Dot: React.FC<DotProps> = (props) => {
    const width = 50;
    const getColor = () => {
        const state = props.dot.state
        if (state === State.Clear) {
            return "red";
        } else if (state === State.Process1) {
            return "blue";
        } else if (state === State.Process2) {
            return "green";
        } else if (state === State.Used1) {
            return "blue";
        } else if (state === State.Used2) {
            return "green";
        } else if (state === State.Dead1) {
            return "purple";
        } else if (state === State.Dead2) {
            return "gray";
        }
    }
    const onUpdate = () => {
        props.onClick(props.dot)
    }
    return (
        <div style={{left: props.dot.x * width, top:
                props.dot.y * width, alignItems: 'center', justifyContent: 'center',
                    backgroundColor: getColor()}}
             className={styles.dot}
            onClick={onUpdate}/>
    )
};

export {Dot, State};
export type {IDot};