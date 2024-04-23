/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable react/display-name */
const React = require('react');
const Container = require('../component/container.jsx');

module.exports = function (reactData) {
  return <Container columns={reactData} filt={() => {}} sort={() => {}} />;
};
