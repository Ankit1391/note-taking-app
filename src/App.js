import React, { Component } from 'react';
import './App.css';
import AppBar from './components/app-bar.component';
import CreateNote from './components/create-note.component';
import ShowNotes from './components/show-notes.component';

export default class App extends Component {

  state = {
    showCreateNote: false,
    editableNote: null,
    searchTerm: '',
  }

  constructor(props) {
    super(props);
    let categories = ['Shopping List', 'Bills', 'Weekend Work', 'Travel Plan'];
    localStorage.setItem('cat', JSON.stringify(categories));
  }

  toggleCreateNote = (toggle) => {
    this.setState({
      showCreateNote: toggle,
      editableNote: false
    })
  }

  editNote = (note) => {
    this.setState({ editableNote: note, showCreateNote: true });
  }

  handleSearch = (e) => {
    this.setState({ searchTerm: e.target.value });
  }

  render() {
    const { showCreateNote, editableNote, searchTerm } = this.state;
    return (
      <>
        <AppBar createNote={this.toggleCreateNote} onChange={this.handleSearch} />
        <br />
        {!showCreateNote && <ShowNotes editNote={this.editNote} searchTerm={searchTerm} />}
        {showCreateNote && <CreateNote toggleCreateNote={this.toggleCreateNote} note={editableNote} />}
      </>
    )
  }
}
