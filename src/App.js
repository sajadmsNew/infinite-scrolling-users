import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.scss";
import InfiniteTable from "./InfiniteTable";
import Navbar from "./Navbar";
import Modal from "./Modal";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      fetching: false,
      show: false,
      focusedUserData: {},
      modalContent: null,
      modalTitle: null
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

          console.log(this.state.list);
          resolve();
        });
    });
  };

  showModal = (userData) => {
    const modalContent = (
      <div className="row">
        <div className="column modalContentDetails px-4">
          <div className="modalContentDetailsItem">
            <span className="label">Email <a href={`mailto:${userData.email}`}>&#10697;</a></span>
            
            <span>{userData.email}</span>
          </div>
          <div className="modalContentDetailsItem">
            <span className="label">Phone</span>
            <span>{userData.phone}</span>
          </div>
          <div className="modalContentDetailsItem">
            <span className="label">Age</span>
            <span>{userData.dob.age}</span>
          </div>
        </div>
        <div className="column modalContentDetails px-4">
          <div className="modalContentDetailsItem">
            <span className="label">Address <a href={`http://www.google.com/maps/place/${userData.location.coordinates.latitude},${userData.location.coordinates.longitude}`} target="_blank">&#10697;</a></span>
            <span>{userData.location.street},</span>
            <span>{userData.location.city},</span>
            <span>{userData.location.state}</span>
          </div>
          <div className="modalContentDetailsItem">
            <span className="label">User for</span>
            <span>{userData.registered.age} years</span>
          </div>
        </div>
      </div>
    )

    // Quick (and slightly dirty way) to uppercase first and last name before setting modal title
    const uppercaseFirst = userData.name.first.charAt(0).toUpperCase() + userData.name.first.slice(1);
    const uppercaseSecond = userData.name.last.charAt(0).toUpperCase() + userData.name.last.slice(1);
    const modalTitle = uppercaseFirst + ' ' + uppercaseSecond;
    this.setState({ show: true, focusedUserData: userData, modalContent: modalContent, modalTitle: modalTitle });
  };

  hideModal = () => {
    this.setState({ show: false, focusedUserData: {}, modalContent: null });
  };
  

  render() {
    return (
      <div>
        <Navbar />
        <Modal show={this.state.show} handleClose={this.hideModal} profileTitle={this.state.modalTitle} profileImage={this.state.focusedUserData}>
          {this.state.modalContent}
        </Modal>
        <div className="tableContainer">
          <InfiniteTable
            hasNextPage={true}
            isNextPageLoading={false}
            list={this.state.list}
            loadNextPage={this.loadNextPage}
            onRowClickCallback={this.showModal}
          />
        </div>
      </div>
    );
  }
}

export default App;
