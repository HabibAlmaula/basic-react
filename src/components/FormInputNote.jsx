import { Component } from "react";
import AppButton from "./AppButton";

class FormInputNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      maxLength: 60,
    };
  }

  handleOnchangeTitle = (event) => {
    const title = event.target.value;
    if (title.length > this.state.maxLength) {
      return;
    }
    this.setState({ title });
  };

  handleOnSave = () => {
    //add validation
    if (!this.state.title.trim() || !this.state.body.trim()) {
      alert("Title and body are required");
      return;
    }
    this.props.onSave({ title: this.state.title, body: this.state.body });
    //clear the form
    this.setState({ title: "", body: "" });
  };

  render() {
    return (
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Title"
          value={this.state.title}
          onChange={this.handleOnchangeTitle}
          className="p-2 rounded-md"
        />
        <p className="text-lg font-semibold self-end mb-2">
          {this.state.title.length}/{this.state.maxLength}
        </p>

        <textarea
          className="p-2 mb-2 min-h-[200px] rounded-md"
          placeholder="Content"
          value={this.state.body}
          onChange={(event) => this.setState({ body: event.target.value })}
        />
        <AppButton
          className={"self-end"}
          label="Save"
          onClick={this.handleOnSave}
        />
      </div>
    );
  }
}

export default FormInputNote;
