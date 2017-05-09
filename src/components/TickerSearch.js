import React, { Component } from 'react';
import TickerSearchEntry from './TickerSearchEntry';
import './css/TickerSearch.css';

class TickerSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: '',
      searchResults: {
        ticker: '',
        securities: [],
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const companyName = e.target.value;
    this.setState({ companyName });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(`${this.state.companyName} Submitted`);

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ company: this.state.companyName }),
    };

    fetch('/company/search', options)
      .then(data => data.json())
      .then(results => {
        console.log(results);
        this.setState({ searchResults: results });
      })
      .catch(err => console.warn(err));
  }

  render() {
    return (
      <div>
        <table className="table-header">
          <tbody>
            <tr>
              <td><input
                type="text" className="text-input" onChange={this.handleChange}
                placeholder="Enter company name" value={this.state.companyName}
              /></td>
              <td><button className="button" onClick={this.handleSubmit}>Search</button></td>
            </tr>
            {(this.state.searchResults.ticker !== '') ?
              <tr>
                <td className="label">Results: </td>
                <td className="ticker">{this.state.searchResults.ticker}</td>
              </tr>
              : null}
          </tbody>
        </table>

        {this.state.searchResults.securities.map((security, index) => (
          <TickerSearchEntry
            key={index}
            symbol={security.symbol}
            name={security.name}
            exchange={security.exchange}
          />
        ))}

      </div>
    );
  }
}

export default TickerSearch;
