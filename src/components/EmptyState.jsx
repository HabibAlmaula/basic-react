import { Component } from "react";
import Nodata from "../assets/no-data.svg";

class EmptyState extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="flex flex-col w-full items-center p-10">
        {/* svg icon */}
        <img src={Nodata} alt="No data" className="max-w-32" />
        <p className="text-center text-xl font-semibold mt-5">
          {this.props.message || "Tidak ada data yang tersedia"}
        </p>
      </div>
    );
  }
}

export default EmptyState;
