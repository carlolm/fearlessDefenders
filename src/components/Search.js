import React from 'react';

import './css/Search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let searchValue = e.target.value;
    searchValue = searchValue.toUpperCase();
    this.setState({ searchValue });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { fetchData } = this.props;
    const { searchValue } = this.state;
    fetchData(searchValue);
    console.log(searchValue + ' Submitted')
  }

  render() {
    return (
      <form className="search" onSubmit={this.handleSubmit}>
        <input
          type="text"
          onChange={this.handleChange}
          placeholder="Enter Symbols"
        />
      </form>
    );
  }

}

export default Search;
