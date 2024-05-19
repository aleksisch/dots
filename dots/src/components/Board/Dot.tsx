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
    next_x: number[];
    next_y: number[];
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

    const drawLine = (x1: number, y1: number, x2s: number[], y2s: number[]) => {
        if (x2s.length === 0 || y2s.length === 0) {
            return;
        }
        const lines: React.ReactNode[] = [];
        x2s.forEach((x2, index) => {
            let y2 = y2s[index];
            if (Math.abs(y2 - y1) + Math.abs(x2 - x1) < 2) {
                return;
            }
            if (x1 > x2) {
                const x3 = x1;
                const y3 = y1;
                x1 = x2;
                y1 = y2;
                x2 = x3;
                y2 = y3;
            }
            let angle = "-45";
            if (y1 < y2) {
                angle = "45";
            }
            lines.push(<div style={{position: 'absolute', height: '2px', backgroundColor: getColor(),
                    top: y1*width+5, left: x1*width+5, width: width*Math.sqrt(2),
                    transform: `rotate(${angle}deg)`, transformOrigin: 'left'}}></div>)
        });
        return lines;
    }

    return (
        <>
            <div style={{
                left: props.dot.x * width, top:
                    props.dot.y * width, alignItems: 'center', justifyContent: 'center',
                backgroundColor: getColor()
            }}
                 className={styles.dot}
                 onClick={onUpdate}/>
            {drawLine(props.dot.x, props.dot.y, props.dot.next_x, props.dot.next_y)}
        </>
    )
};

export {
    Dot, State
};
export type {IDot};