import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      location: '',
      sortBy: 'best_match'
    };
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);

    this.getSortByClass = this.getSortByClass.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleEnterPress = this.handleEnterPress.bind(this);
    this.sortByOptions = {
        'Best Match': 'best_match',
        'Highest Rated': 'rating',
        'Most Reviewed': 'review_count',
        'Distance': 'distance'
      }
  }


  getSortByClass(sortByOption) {
    if (sortByOption === this.state.sortBy) {
      return 'active';
    }
    else {
      return '';
  }
}

  handleSortByChange(sortByOption) {
    this.setState({sortBy: sortByOption})
    this.handleSearch();
  }

  handleTermChange(event) {
    this.setState({term: event.target.value});
  }

  handleLocationChange(event) {
    this.setState({location: event.target.value});
  }

  handleSearch(event) {
    this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
  }

  renderSortByOptions() {
    return (
    Object.keys(this.sortByOptions).map(sortByOption => {
      let sortByOptionValue = this.sortByOptions[sortByOption];
      return (
        <li
        key={sortByOptionValue}
        className={this.getSortByClass(sortByOptionValue)}
        onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>
        {sortByOption}</li>
      );
    })
  )
  }

  handleEnterPress(event) {
    if(event.key === 'Enter') {
      return this.handleSearch()
    }
  }

  render() {
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>
            {this.renderSortByOptions()}
          </ul>
        </div>
        <div className="SearchBar-fields">
          <input placeholder="Search Businesses" onChange={this.handleTermChange} onKeyPress={this.handleEnterPress}/>
          <input type="text" placeholder="Where?" onChange={this.handleLocationChange} onKeyPress={this.handleEnterPress}/>
        </div>
        <div className="SearchBar-submit">
          <a onClick={this.handleSearch}>Lets Go</a>
        </div>
      </div>
    )
  }
}

export default SearchBar;
