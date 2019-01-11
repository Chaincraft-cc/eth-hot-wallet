/**
*
* PageFooter
*
*/

import React from 'react';
import { github } from 'utils/constants';
import { Row, Col } from 'antd';
import styled from 'styled-components';

import { StickyFooter } from './sticky';


const Footer = StickyFooter.extend`
  textAlign: center;
  background: #efeeee;
  color: #5a5a5a;
  padding: 10px;
  font-size: 14px;
`;

const Span = styled.span`
  color: #b9b9b9;
  margin-top:3px;
`;

function PageFooter() {
  return (
    <Footer>
      <Row>
        <Col sm={24} xs={24}>
          © 2019 <a href="https://tinkereum.org">Tinkereum</a> / <a href="https://chaincraft.cc" target="_blank">Chaincraft.cc</a> | Forked
          with &#x2764; from <a href="https://github.com/PaulLaux/eth-hot-wallet" target="_blank">ETH Hot Wallet</a> | <a href="https://github.com/Chaincraft-cc/eth-hot-wallet" target="_blank">Check source on GitHub</a>
        </Col>
      </Row>
    </Footer>
  );
}

PageFooter.propTypes = {

};

export default PageFooter;
