import React, { memo } from 'react';
import Slider from '../../../shared/Slider';
import { useStore } from '../../store';
import { useLogging } from '../../../../utils/logging';
import { MIN_RETIREMENT_AGE, MAX_RETIREMENT_AGE } from '../data/financial';
import css from './RetirementAgeSlider.module.css';

const RetirementAgeSlider = () => {
  const retirementAge = useStore((state) => state.answers.retirementAge);
  const { trackEvent } = useLogging();
  const setState = useStore((state) => state.setState);

  const setRetirementAge = (value) => {
    trackEvent({
      type: 'slider-change',
      variable: 'retirement-age',
      value
    });
    setState((state) => {
      state.answers.retirementAge = value;
    });
  };

  return (
    <>
      <p className={css.bigNumber}>
        {retirementAge !== -1 ? retirementAge : '-'}
      </p>
      <Slider
        value={retirementAge ?? MIN_RETIREMENT_AGE}
        min={MIN_RETIREMENT_AGE}
        max={MAX_RETIREMENT_AGE}
        step={1}
        onChange={setRetirementAge}
        autoLabels
      />
    </>
  );
};

export default memo(RetirementAgeSlider);
