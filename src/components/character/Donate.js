import React, { useState, useEffect } from 'react';

import Character from './Character';
import Button from '../Button';

import css from './Donate.module.css';

const Donate = () => {
  const newVersion = () => Math.floor(Math.random() * 3);
  const [version, setVersion] = useState(newVersion);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVersion(newVersion);
    }, 20 * 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={css.root}>
      <h3>
        We need
        <br />
        your help!
      </h3>
      <Character num={version} />
      <h4>Our software can only continue with your generosity!</h4>
      <Button
        href="https://processingfoundation.org/donate"
        className={css.donate}>
        Donate
      </Button>
    </div>
  );
};

export default Donate;
