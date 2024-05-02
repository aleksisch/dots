import React, {useState} from 'react';
import styles from './Navbar.module.css';
import {NavLink} from "react-router-dom";

const Navbar = () => {
    const [isOpen, setOpen] = useState(false);
    return (
        <nav
            className={styles.container}
            role="navigation"
            aria-label="main navigation"
        >
            <img className={styles.logo} src={"threedots.png"} alt={""}/>
            <h3>Миха лох</h3>
            <div>
                <div className="navbar-brand">
                    <a
                        role="button"
                        className={`navbar-burger burger ${isOpen && "is-active"}`}
                        aria-label="menu"
                        aria-expanded="false"
                        onClick={() => setOpen(!isOpen)}
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div className={`navbar-menu ${isOpen && "is-active"}`} style={{ margin: "10px" }}>
                    <div className="navbar-start">
                        <NavLink className="navbar-item" to="/">
                            Home
                        </NavLink>

                        <NavLink className={styles.menuLink}
                            to="/about"
                        >
                            About
                        </NavLink>
                    </div>

                </div>
            </div>
        </nav>
    )
        ;
};

export default Navbar;