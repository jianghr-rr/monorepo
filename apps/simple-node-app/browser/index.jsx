/* eslint-disable react/no-deprecated */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
const React = require('react');
const ReactDOM = require('react-dom');
const Container = require('../component/container.jsx');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      columns: reactInitData,
      filtType: reactInitFiltType,
      sortType: reactInitSortType,
    };
  }

  render() {
    return (
      <Container
        columns={this.state.columns}
        filt={(filtType) => {
          fetch(`./data?sort=${this.state.sortType}&filt=${filtType}`)
            .then((res) => res.json())
            .then((json) => {
              this.setState({
                columns: json,
                filtType: filtType,
              });
            });
        }}
        sort={(sortType) => {
          fetch(`./data?sort=${sortType}&filt=${this.state.filtType}`)
            .then((res) => res.json())
            .then((json) => {
              this.setState({
                columns: json,
                sortType: sortType,
              });
            });
        }}
      />
    );
  }
}
ReactDOM.render(<App />, document.getElementById('reactapp'));
