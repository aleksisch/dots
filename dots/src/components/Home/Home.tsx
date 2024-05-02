import React, {useState} from 'react';
import styles from "../Home/Home.module.css";
import {Navigate} from "react-router-dom";

function Home() {
    const [inputs, setInputs] = useState({player1: "", player2: "", submit: false});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        alert(inputs);
        if (inputs.player1 !== "" && inputs.player2 !== "") {
            setInputs(values=>({...values, ["submit"]: true}))
        } else {
            alert("Имя не должно быть пустым")
        }
    }

    if (inputs.submit) {
        return <Navigate to={`/play/${inputs.player1}/${inputs.player2}`} />
    }

    return (
        <form onSubmit={handleSubmit}>
            <label className={styles.form}>Введите имя первого игрока:
                <input
                    type="text"
                    name="player1"
                    placeholder="Игрок1"
                    value={inputs.player1 || ""}
                    onChange={handleChange}
                />
            </label>
            <label className={styles.form}>Введите имя второго игрока:
                <input
                    type="text"
                    name="player2"
                    placeholder="Игрок2"
                    value={inputs.player2 || ""}
                    onChange={handleChange}
                />
            </label>
            <input className={styles.form} type="submit" value="Начать игру" />
        </form>
    )
}

export default Home;
