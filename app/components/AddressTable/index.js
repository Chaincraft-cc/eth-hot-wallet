/**
*
* AddressTable
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Table, Card, Row, Col } from 'antd';

import QRCode from 'qrcode.react';

import CurrencyDropdown from 'components/CurrencyDropdown';
import TokenIcon from 'components/TokenIcon';

const { Column } = Table;
// import { LocaleProvider } from 'antd';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const AddrTable = styled(Table)`
  max-width: 860px;
  margin-left: auto;
  margin-right: auto;
  tbody{
    background: white;
  }
  .ant-table{
    font-size: 13px !important;
  }
  th.columnCenter,
  td.columnCenter{
    text-align: center;
  }
`;


/**
 * Create list of rows, one row per token for given address
 * @param  {object} tokenDecimalsMap
 * @param  {object} tokenMapIN
 * @param  {string} address current address
 * @param  {number} startKey the first key of the given address
 *
 * @return {object[]} array as rows, one row per token/address
 * row:
{
  key: '1',
  index: '1',
  token: 'eth',
  address: '13c...9d06',
  balance: '3',
  convert: '',
} */
const splitAddrToRows = (tokenDecimalsMap, tokenMapIN, address, startKey) => {
  let key = startKey;
  const tokenMap = tokenMapIN;
  const index = tokenMap.index;
  delete tokenMap.index;

  return Object.keys(tokenMap).map((token) => {
    const sameAddressRow = {};
    sameAddressRow.index = index;
    sameAddressRow.key = key;
    key += 1;
    sameAddressRow.token = token;
    sameAddressRow.address = address;
    const balance = tokenMap[token].balance;
    const decimals = tokenDecimalsMap[token];
    sameAddressRow.balance = balance ? balance.div((10 ** decimals).toString()).toString(10) : 'n/a';
    // sameAddressRow.convert = '';
    return sameAddressRow;
  });
};

/**
 * Transforms addressMap into Array of rows
 * @param  {object} addressMap
 * @param  {object} tokenDecimalsMap number of decimal for each currency
 * @param  {boolean} showTokens should show token in the table
 * return example: addressArray =
  [{{
    key: '1',
    index: '1',
    token: 'eth',
    address: '13c...9d06',
    balance: '3',
    convert: '200 USD',
  },
    key: '2',
    index: '1',
    token: 'eos',
    address: '13c...9d06',
    balance: '3',
    convert: '15 USD',
  }, {
    key: '3',
    index: '1',
    token: 'ppt',
    address: '13c...9d06',
    balance: '3',
    convert: '13 USD',
  },
] */
const transformList = (addressMap, tokenDecimalsMap, showTokens) => { //eslint-disable-line
  // const showTokens = true;
  let iKey = 1;
  const list = Object.keys(addressMap).map((address) => {
    const tokenMap = addressMap[address];
    const sameAddressList = splitAddrToRows(tokenDecimalsMap, tokenMap, address, iKey);

    iKey += sameAddressList.length;
    return sameAddressList;
  });
  return [].concat(...list); // flaten array
};

/**
 * return conversion rate from given token
 * @param  {object} exchangeRates available exchange rates
 * @param  {string} from symbol to convert from: 'eth' / 'usd' / ..
 * @param  {string} to the convertion pair to use: ie "eth_usd"
 *
 * @return {Array} array as data for table, see example above
 */
const getConvertRate = (exchangeRates, from, to) => {
  const fromKey = `eth_${from}`;
  // convert token to eth by invert(eth_token)
  const toEthRate = exchangeRates[fromKey].rate.toPower(-1);
  const toTokenRate = exchangeRates[to].rate;
  return toEthRate && toTokenRate && toEthRate.times(toTokenRate);
};

/**
 * Add converted rates to all rows
 * adds nothing if exchange rate not found
 * @param  {object[]} rowList table rows contains balance
 * @param  {object} exchangeRates all available exchange rates
 * @param  {string} convertTo the convertion pair to use: ie "eth_usd"
 *
 * @return {Array} array as data for table, see example above
 */
const addConvertRates = (rowList, exchangeRates, convertTo) =>
  rowList.map((row) => {
    try {
      // const convertToSymbol = convertTo.slice(4).toUpperCase();
      if (`eth_${row.token}` === convertTo) {
        row.convert = row.balance; // eslint-disable-line
      } else {
        const convertRate = getConvertRate(exchangeRates, row.token, convertTo);
        row.convert = convertRate.times(row.balance).round(5).toString(10); // eslint-disable-line
      }
      return row;
    } catch (err) {
      // no rates found
      return row;
    }
  });

function AddressTable(props) {
  const {
    addressMap,
    tokenDecimalsMap,
    onShowSendToken,
    exchangeRates,
    onSelectCurrency,
    convertTo,
  } = props;

  const currencyDropdownProps = { exchangeRates, onSelectCurrency, convertTo };

  const rowList = transformList(addressMap, tokenDecimalsMap, true);
  const completeRowList = addConvertRates(rowList, exchangeRates, convertTo);
  const walletCards = completeRowList.map((row, index) => {
    let token = row.token == 'eth' ? 'tnk' : row.token;
    return (
      <Card
        style={{ width: '100%', marginBottom: '20px' }}
        key={index}
      >
        <Row>
          <Col span={12} xs={24} sm={10} md={7}>
            <QRCode style={{marginBottom: '20px'}} value={row.address} level={'H'} />
          </Col>
          <Col span={12} xs={24} sm={14} md={17}>
            <h3 style={{wordBreak: 'break-all'}}>{row.address}</h3>
            <h2>{row.balance} {token.toUpperCase()}</h2>
            <button className="ant-btn ant-btn-primary"
              onClick={(ev) => {ev.preventDefault();onShowSendToken(row.address, row.token)}}>Send {token.toUpperCase()}</button>
          </Col>
        </Row>
      </Card>
    );
  });


  return (
    <div>
    {walletCards}
    {/*}
    <AddrTable
      dataSource={completeRowList}
      bordered
      scroll={{ x: 340 }}
      pagination={false}
      locale={{
        filterTitle: null,
        filterConfirm: 'Ok',
        filterReset: 'Reset',
        emptyText: 'No Data',
      }}

    >
      <Column
        title="Address"
        dataIndex="address"
        key="address"
        width="100px"
        className="columnCenter"
        colSpan="1"
        rowSpan="3"
        render={(text, record) => {
          const obj = {
            children: text,
            props: {},
          };
          if (record.token !== 'eth') {
            // obj.props.rowSpan = 0;
            obj.props.rowSpan = 0;
            // obj.children = '~';
          } else {
            obj.props.rowSpan = Object.keys(tokenDecimalsMap).length || 2;
          }
          return obj;
        }}
      />
       <Column
        title="#"
        dataIndex="key"
        key="key"
        width="10px"
        sorter={(a, b) => parseInt(a.key, 10) - parseInt(b.key, 10)}
        sortOrder="ascend"
        className="columnCenter"
      />
      <Column
        title="Icon"
        key="Icon"
        width="12px"
        render={(text, record) => (
          <TokenIcon tokenSymbol={record.token} />
        )}
        className="columnCenter"
      />
      
      <Column
        title="Token"
        dataIndex="token"
        key="token"
        width="25px"
        className="columnCenter"
        render={(text, record) => (
          record.token.toUpperCase()
        )}
      />
      <Column
        title="Balance"
        dataIndex="balance"
        key="balance"
        width="25px"
        filters={[{
          text: 'Remove empty',
          value: '0',
        }]}
        onFilter={(value, record) => record.balance !== value}
      />
      
      <Column
        title={<CurrencyDropdown {...currencyDropdownProps} />}
        dataIndex="convert"
        key="convert"
        width="80px"
      />
      
      <Column
        width="25px"
        title="Action"
        key="action"
        render={(text, record) => (
          <span>
            <a onClick={() => onShowSendToken(record.address, record.token)}>Send</a>
          </span>
        )}
      />
    </AddrTable >
  */}
    </div>
  );
}

AddressTable.propTypes = {
  addressMap: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  tokenDecimalsMap: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  onShowSendToken: PropTypes.func,
  exchangeRates: PropTypes.object,
  onSelectCurrency: PropTypes.func,
  convertTo: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default AddressTable;
