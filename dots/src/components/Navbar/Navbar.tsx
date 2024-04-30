import React from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <div className={styles.container}>
            <img className={styles.logo} src={"threedots.png"} alt={""}/>
            <h3>Миха лох</h3>
        </div>
    );
};

export default Navbar;