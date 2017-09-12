/**
*
* SendAmount
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

function SendAmount({ amount, onChangeAmount }) {
  return (
    <div>
      <FormattedMessage {...messages.header} />
      <input
        type="number"
        pattern="[0-9]*"
        inputMode="numeric"
        min="0"
        step="0.01"
        value={amount}
        onChange={(evt) => onChangeAmount(parseFloat(evt.target.value))}
      />
    </div>
  );
}

SendAmount.propTypes = {
  amount: PropTypes.number,
  onChangeAmount: PropTypes.func,
};

export default SendAmount;