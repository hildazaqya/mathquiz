import React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {
  render() {
    return (
      <div className="flex items-center justify-center h-screen">
        <Link to="/quiz/0">
          <button className="bg-secondary rounded-md p-2 text-base font-bold w-[200px] text-neutral">
            Start The Quiz
          </button>
        </Link>
      </div>
    );
  }
}

export default Home;
