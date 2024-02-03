import { Component } from 'react';
import MyContacts from './MyContacts/MyContacts';

export class App extends Component {
  render() {
    return (
      <div
        style={
          {
            // height: '100vh',
            // display: 'flex',
            // justifyContent: 'center',
            // alignItems: 'center',
            // fontSize: 40,
            // // color: '#010101',
          }
        }
      >
        {/* React homework template */}
        <MyContacts />
      </div>
    );
  }
}

export default App;
