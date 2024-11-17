import { Component } from "react";

class HeaderApp extends Component {
  render() {
    return (
      <>
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl font-semibold">Simple Note App</h1>
          <h1 className="text-2xl font-semibold">Dicoding Submission</h1>
        </div>
        <hr className="my-5" />
      </>
    );
  }
}

export default HeaderApp;
