import React from 'react';

import './css/Search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSumbit = this.handleSumbit.bind(this);
  }

  handleChange(e) {
    let searchValue = e.target.value;
    searchValue = searchValue.toUpperCase();
    this.setState({ searchValue });
  }

  handleSumbit(e) {
    e.preventDefault();
    console.log(this.state.searchValue + ' Submitted')
  }

  render() {
    return (
      <form className="search" onSubmit={this.handleSumbit}>
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
