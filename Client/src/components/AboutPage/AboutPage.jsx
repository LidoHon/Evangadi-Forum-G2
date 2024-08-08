import React from 'react';
import styles from './AboutPage.module.css';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
	const navigate = useNavigate();

	const handleHowItWorks = () => {
		navigate('/howItWorks');
	};

	return (
    <div className={`${styles.container}`}>
      <h1 className="text-orange-800 font-semibold">About</h1>
      <h2 className={styles.subtitle}>Evangadi Networks</h2>
      <p className={styles.paragraph}>
        No matter what stage of life you are in, whether you're just starting
        elementary school or being promoted to CEO of a Fortune 500 company, you
        have much to offer to those who are trying to follow in your footsteps.
      </p>
      <p className={styles.paragraph}>
        Whether you are willing to share your knowledge or you are just looking
        to meet mentors of your own, please start by joining the network here.
      </p>
      <button onClick={handleHowItWorks} className={`${styles.button} bg-orange-800 hover:bg-orange-700`}>
        HOW IT WORKS
      </button>
    </div>
  );
};

export default AboutPage;
