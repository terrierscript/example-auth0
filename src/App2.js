import React, { useCallback, useEffect } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import './App.css';

// class App extends Component {
//   goTo(route) {
//     this.props.history.replace(`/${route}`)
//   }

//   login() {
//     this.props.auth.login()
//   }

//   logout() {
//     this.props.auth.logout()
//   }

//   componentDidMount() {
//     const { renewSession } = this.props.auth

//     if (localStorage.getItem("isLoggedIn") === "true") {
//       renewSession()
//     }
//   }

//   render() {
//     const { isAuthenticated } = this.props.auth

//     return (
//       <div>
//         <Navbar fluid>
//           <Navbar.Header>
//             <Navbar.Brand>
//               <a href="#">Auth0 - React</a>
//             </Navbar.Brand>
//             <Button
//               bsStyle="primary"
//               className="btn-margin"
//               onClick={this.goTo.bind(this, "home")}
//             >
//               Home
//             </Button>
//             {!isAuthenticated() && (
//               <Button
//                 id="qsLoginBtn"
//                 bsStyle="primary"
//                 className="btn-margin"
//                 onClick={this.login.bind(this)}
//               >
//                 Log In
//               </Button>
//             )}
//             {isAuthenticated() && (
//               <Button
//                 id="qsLogoutBtn"
//                 bsStyle="primary"
//                 className="btn-margin"
//                 onClick={this.logout.bind(this)}
//               >
//                 Log Out
//               </Button>
//             )}
//           </Navbar.Header>
//         </Navbar>
//       </div>
//     )
//   }
// }

const useAuth = auth => {
  useEffect(() => {
    const { renewSession } = auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }, []);
};

const useGoHistory = history => {
  return useCallback(route => {
    history.replace(`/${route}`);
  });
};
const useLogin = auth => {
  return useCallback(() => {
    auth.login();
  });
};

const useLogout = auth => {
  return useCallback(() => {
    auth.login();
  });
};

const App = ({ auth, history }) => {
  console.log(auth);
  useAuth(auth);
  const goTo = useGoHistory(history);
  const login = useLogin(auth);
  const logout = useLogout(auth);
  const { isAuthenticated } = auth;

  return (
    <div>
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Auth0 - React</a>
          </Navbar.Brand>
          <Button
            bsStyle="primary"
            className="btn-margin"
            onClick={goTo('home')}
          >
            Home
          </Button>
          {!isAuthenticated() && (
            <Button
              id="qsLoginBtn"
              bsStyle="primary"
              className="btn-margin"
              onClick={login()}
            >
              Log In
            </Button>
          )}
          {isAuthenticated() && (
            <Button
              id="qsLogoutBtn"
              bsStyle="primary"
              className="btn-margin"
              onClick={logout()}
            >
              Log Out
            </Button>
          )}
        </Navbar.Header>
      </Navbar>
    </div>
  );
};
export default App;
