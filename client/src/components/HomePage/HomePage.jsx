import React from 'react';
import styles from './HomePage.module.css';
import NavBar from '../NavBar/NavBar';
import DogsCards from '../DogsCards/DogsCards';

const HomePage = () => {
    return(
        <div className={styles.containerHome}>
            <NavBar />
            <DogsCards />
        </div>
    )
}

export default HomePage;