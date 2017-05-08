import React, { Component } from 'react';

class TickerSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: '',
      searchResults: [],
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
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        mode: 'cors',
        'Access-Control-Allow-Origin': '*',
      },
    };

    fetch(`http://d.yimg.com/aq/autoc?query=${this.state.companyName}&region=US&lang=en-US`, options)
    .then(data => console.log(data))
    .catch(err => console.warn(err));
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td><input
                type="text" onChange={this.handleChange}
                placeholder="Enter company name" value={this.state.companyName}
              /></td>
              <td><button onClick={this.handleSubmit}>Search</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default TickerSearch;
