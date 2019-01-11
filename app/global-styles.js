import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #f8f8f8;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  body {
    text-align: center;
  }
  hr {
    width: 200px;
    text-align:center !important;
    margin: 0 auto !important;
  }

  body {
    overflow-x: hidden;
  }

  a {
    color: #4caf50;
  }

  a:hover, a:focus {
    color: #66bb6a;
  }

  .ant-btn.ant-btn-primary {
    background-color: #4caf50 !important;
    border-color: #4caf50 !important;
  }

  .ant-btn.ant-btn-primary:hover, .ant-btn.ant-btn-primary:focus {
    border-color: #4caf50 !important;
    background-color: #2e7d32 !important;
    color: #FFF !important;
  }

  .ant-btn {
    border-color: rgba(0, 0, 0, 0.65) !important;
  }

  .ant-btn:hover, .ant-btn:focus {
    color: #4caf50 !important;
    background-color: #fff !important;
    border-color: #4caf50 !important;
  }

  .ant-dropdown-menu-item-selected, .ant-dropdown-menu-submenu-title-selected,
  .ant-dropdown-menu-item-selected > a, .ant-dropdown-menu-submenu-title-selected > a {
    color: #4caf50 !important;
    background-color: #c8e6c9 !important;
  }

  .ant-dropdown-menu-item:hover, .ant-dropdown-menu-submenu-title:hover {
    background-color: #c8e6c9 !important;
  }

  .ant-spin {
    color: #4caf50 !important;
  }

  .ant-spin-dot i {
    background-color: #4caf50 !important;
  }
`;
