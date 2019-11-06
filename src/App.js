import React from 'react';
import SidebarComponent from './sidebar/sidebar';
import EditorComponent from './editor/editor';
import './App.css';


const firebase = require('firebase');

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

class App extends React.Component {

  constructor(){
    super();
    //default values assigned
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null, 
      notes: null
    };
  }

  render() {
    return(
      <div className="app-container">
        <SidebarComponent 
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          deleteNote={this.deleteNote}
          selectNote={this.selectNote}
          newNote={this.newNote}></SidebarComponent>
        {
          this.state.selectedNote ?
          <EditorComponent selectedNote={this.state.selectedNote}
          selectedNoteIndex={this.state.selectedNoteIndex}
          note={this.state.notes}></EditorComponent> :
          null
        }
      </div>
    );
  }

  //when app comp is loaded success in dom this will be called
  componentDidMount = () => {
    firebase
      .firestore()
      //table in database
      .collection('notes')
      //automatically called when notes is updated in fb
      .onSnapshot(serverUpdate => {
        //for each doc, apply the map
        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data['id'] =  _doc.id;
          return data;
        });
        console.log(notes);
        this.setState({ notes: notes });
      });
  }

  selectNote = (note, index) => this.setState({ selectedNoteIndex: index, selectedNote: note });

}

export default App;
