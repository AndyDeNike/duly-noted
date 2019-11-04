import React from 'react';
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
    return(<div>Hello World</div>);
  }

  //when app comp is loaded success in dom this will be called
  componentDidMount = () => {
    firebase
      .firestore()
      //table in database
      .collection('notes')
      //automatically called when notes is updated in fb
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data['id'] =  _doc.id;
          return data;
        });
        console.log(notes);
        this.setState({ notes: notes });
      });
  }

}

export default App;
