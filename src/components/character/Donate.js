import React from 'react';

import Character from './Character';
import Button from '../Button';

import css from './Donate.module.css';

const Donate = () => {
  return (
    <div className={css.root}>
      <h3>
        We need
        <br />
        your help!
      </h3>
      <Character num={Math.floor(Math.random() * 3)} />
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
