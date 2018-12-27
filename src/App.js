import React, { Component } from 'react';
import NavigationBar from './components/NavigationBar.js'
import Home from './components/Home.js'
import Blackjack from './components/Blackjack'
import About from './components/About'
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
          <NavigationBar/>
            <Route exact path="/" component={Home} />
            <Route exact path="/blackjack" component={Blackjack} />
            <Route exact path="/about" component={About} />
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;


// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }

// export default App;
