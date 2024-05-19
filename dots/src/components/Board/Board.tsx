import React, {useState} from 'react';
import {Dot, IDot, State} from "./Dot";
import styles from './Board.module.css';
import {useParams} from 'react-router-dom';

interface IBoardState {
    dotBoard: IDot[][],
    player: number
    score1: number
    score2: number
}

function dfs(used: Map<number, Set<number>>, x: number, y: number, parentx: number, parenty: number, initx: number, inity: number, board: IDot[][], player: number): number[][] {
    if (!used.has(x)) {
        used.set(x, new Set<number>());
    }
    used.get(x)?.add(y);
    const check = (x1: number, y1: number): number[][] => {
        if (x1 < 0 || y1 < 0 ||
            x1 >= board.length || y1 >= board.length ||
            (x1 === parentx && y1 === parenty)) {
            return []
        }
        const dot = board[x1][y1];
        if (dot.state !== ((player % 2 === 0) ? State.Used2 : State.Used1) &&
            dot.state !== ((player % 2 === 0) ? State.Process2 : State.Process1)) {
            return [];
        } else if (used.has(x1) && used.get(x1)?.has(y1)) {
            if (x1 === initx && y1 === inity) {
                return [[x1, y1]]
            } else {
                return []
            }
        } else {
            let prev = dfs(used, x1, y1, x, y, initx, inity, board, player)
            if (prev.length !== 0) {
                prev.push([x1, y1])
            }
            return prev;
        }
    }
    let res: number[][] = [];
    res = res.concat(check(x - 1, y));
    res = res.concat(check(x + 1, y));
    res = res.concat(check(x, y - 1));
    res = res.concat(check(x, y + 1));
    res = res.concat(check(x + 1, y + 1));
    res = res.concat(check(x - 1, y + 1));
    res = res.concat(check(x + 1, y - 1));
    res = res.concat(check(x - 1, y - 1));
    return res;
}

function countScore(points: number[][], board: IDot[][], player: number) {
    let orderedPoints: Map<number, number[]> = new Map();
    for (let point of points) {
        if (!orderedPoints.has(point[0])) {
            orderedPoints.set(point[0], [])
        }
        orderedPoints.get(point[0])?.push(point[1])
    }
    orderedPoints = new Map([...orderedPoints].sort());
    for (let [point, val] of orderedPoints) {
        val = val.sort()
    }
    let diff = 0;
    let lookState = (player % 2 === 0) ? State.Process1 : State.Process2;
    let nextState = (player % 2 === 0) ? State.Dead1 : State.Dead2;
    for (let [x, point] of orderedPoints) {
        for (let i = 0; i < point.length - 1; i++) {
            for (let iter = point[i] + 1; iter < point[i + 1]; iter++) {
                if (board[x][iter].state === lookState) {
                    diff += 1;
                    board[x][iter].state = nextState;
                }
            }
        }
    }
    return diff;
}

function find_loops(dot: IDot, prev: IDot[][], player: number) {
    return dfs(new Map<number, Set<number>>(), dot.x, dot.y, -1, -1, dot.x, dot.y, prev, player);
}

function updateState(state: State, player: number) {
    if (state === State.Clear) {
        if (player % 2 === 0) {
            return State.Process2
        } else {
            return State.Process1
        }
    }
    if (state === State.Process2 || state === State.Used2) {
        if (player % 2 === 0) {
            return State.Used2
        } else {
            return undefined;
        }
    } else if (state === State.Process1 || state === State.Used1) {
        if (player % 2 === 1) {
            return State.Used1
        } else {
            return undefined;
        }
    }
}

function paint(dot: IDot, prev: IBoardState, cb: (dor:IDot)=>void): IBoardState {
    let copy = {
        dotBoard: prev.dotBoard.map((x, id) => {return x.map((y, i) => { return {x: y.x, next_x: y.next_x, y: y.y, next_y: y.next_y, state: y.state}})}),
        player: prev.player + 1,
        score1: prev.score1,
        score2: prev.score2,
    }
    let state = updateState(copy.dotBoard[dot.x][dot.y].state, copy.player);
    if (state === undefined) {
        return copy;
    }
    copy.dotBoard[dot.x][dot.y].state = state;

    const newLoop = find_loops(dot, copy.dotBoard, copy.player);
    let prev_dot = newLoop[newLoop.length - 1];
    for (let edge of newLoop) {
        let dot = copy.dotBoard[prev_dot[0]][prev_dot[1]];
        dot.next_x.push(edge[0]);
        dot.next_y.push(edge[1]);
        dot.state = updateState(dot.state, copy.player)!;
        prev_dot = edge;
    }
    let diff = countScore(newLoop, copy.dotBoard, copy.player);
    if (copy.player % 2 === 0) {
        copy.score2 += diff
    } else {
        copy.score1 += diff;
    }
    return copy
}

const Board = () => {
    const height = 30;
    const width = 15;
    const {player1, player2} = useParams();
    const genBoard = () => {
        let board: IDot[][] = [];
        for (let i = 0; i < height; i++) {
            let line: IDot[] = []
            for (let j = 0; j < width; j++) {
                line.push({x:i, y:j, state:State.Clear, next_x:[], next_y:[]})
            }
            board.push(line)
        }
        return board
    }

    const [board, setBoard] = useState<IBoardState>({dotBoard:genBoard(), player:1, score1: 0, score2: 0})

    const updateDot = (dot: IDot) => {
        setBoard(prev => {
            if (dot.state === State.Clear) {
                return paint(dot, prev, updateDot);
            } else {
                return prev
            }
        });
    };

    const renderBoard = () => {
        const render: React.ReactNode[][] = []
        for (let i = 0; i < height; i++) {
            let line = []
            for (let j = 0; j < width; j++) {
                let prevDot = board.dotBoard[i][j];
                let dot = {x:i, y:j, state:prevDot.state, next_x:prevDot.next_x, next_y:prevDot.next_y}
                line.push(<Dot dot={dot} onClick={updateDot}/>)
            }
            render.push(line)
        }
        return render;
    }

    const renderScore = (name: string, score: number) => {
        return <div className={styles.score}> Player {name} score = {score} </div>
    }

    return (
        <div style={{alignItems: 'center', justifyContent: 'center'}}>
            <div>{renderScore(player1!, board.score1)}</div>
            <div>{renderScore(player2!, board.score2)}</div>
            <div className={styles.score}> Ходит игрок {board.player % 2 === 0 ? player1! : player2!}</div>
            <a className={styles.score} href="/">
                <button>Сдаться</button>
            </a>
            <div className={styles.board}>{renderBoard()}</div>
        </div>
    );
};

export default Board;