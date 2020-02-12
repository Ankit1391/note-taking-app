import React, { Component } from 'react';
import NoteThumbnail from './note-thumbnail.component';
import NoteComplete from './note-complete.component';

class ShowNotes extends Component {

  state = {
    noteList: [],
    selectedNote: null
  }

  componentDidMount() {
    const noteList = (JSON.parse(localStorage.getItem("notes")) || []).sort((a, b) => new Date(b.date) - new Date(a.date));
    this.setState({
      noteList,
      selectedNote: noteList[0]
    });
  }

  deleteNote = (guid) => {
    var { noteList } = this.state;
    noteList = noteList.filter(n => n.guid !== guid);
    localStorage.setItem("notes", JSON.stringify(noteList));
    this.setState({ noteList });
    if (guid === (this.state.selectedNote || {}).guid) {
      this.setState({ selectedNote: noteList[0] });
    }
  }

  filteredNotes = () => {
    if (!this.props.searchTerm) return this.state.noteList;
    var re = new RegExp(this.props.searchTerm, "i");
    return (this.state.noteList || []).filter(n =>
      (n.title || '').match(re) ||
      (n.category || '').match(re) ||
      (n.description || '').match(re)
    );
  }

  render() {
    const { selectedNote } = this.state;

    return (
      <>
        {!selectedNote &&
            <div className='center'>THERE ARE NO NOTES TO DISPLAY PLEASE CREATE A NOTE</div>
        }
        {selectedNote && <div className='notes-main'>
          <div className='notes-list'>
            {this.filteredNotes().map((note, index) => (
              <NoteThumbnail key={index} title={note.title} category={note.category}
                deleteNote={() => this.deleteNote(note.guid)}
                editNote={() => this.props.editNote(note)}
                onSelect={() => this.setState({ selectedNote: note })} />
            ))}
          </div>
          <div className='notes-details'>
            {selectedNote && <NoteComplete note={selectedNote} />}
          </div>
        </div>}
      </>
    )
  }
}

export default ShowNotes;