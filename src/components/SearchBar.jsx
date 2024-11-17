import { Component } from "react";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
    };
  }

  //handle change event of input
  handleChange = (event) => {
    const newValue = event.target.value;
    this.setState({ keyword: event.target.value }, () => {
      // Call the optional onSearchChange prop if it exists
      if (this.props.onSearchChange) {
        this.props.onSearchChange(newValue);
      }
    });
  };

  render() {
    return (
      <div className="flex flex-row gap-2">
        <input
          className="p-2 rounded-md min-w-[350px] mt-5 mb-2"
          type="text"
          placeholder="Search notes"
          value={this.state.keyword}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default SearchBar;
