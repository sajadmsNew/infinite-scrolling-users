import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import InfiniteTable from "./InfiniteTable";
import Navbar from "./Navbar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      fetching: false
    };
  }

  componentDidMount() {
    // Request initial user batch
    this.getRowsFromServer(1);
  }

  /**
   * Return a promise that gets resolved when the user GET request has completed
   * @param {number} pageNumber The page number for the next user request
   */
  loadNextPage = pageNumber => {
    console.log("Loading next page # " + pageNumber);

    return new Promise((resolve, reject) => {
      this.getRowsFromServer(pageNumber).then(() => {
        resolve();
      });
    });
  };

  /**
   * Fetch user data from API for appropiate page and add to our existing data in our state.
   * @param {number} pageNumber The page number for the next user request
   */
  getRowsFromServer = pageNumber => {
    return new Promise((resolve, reject) => {
      fetch(`https://randomuser.me/api/?page=${pageNumber}&results=20&seed=abc`)
        .then(response => response.json())
        .then(data =>
          this.setState(prevState => ({
            list: prevState.list.concat(data.results)
          }))
        )
        .then(() => {
          resolve();
        });
    });
  };

  render() {
    return (
      <div>
        <Navbar/>
        <div class="tableContainer">
          <InfiniteTable
            hasNextPage={true}
            isNextPageLoading={false}
            list={this.state.list}
            loadNextPage={this.loadNextPage}
          />
        </div>
      </div>
    );
  }
}

export default App;
