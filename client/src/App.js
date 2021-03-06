import React from 'react';
import { Provider } from 'react-redux';
import { Container } from 'reactstrap';
import AppNavbar from "./components/AppNavbar";
import MainList from "./components/MainList";
import ItemModal from "./components/ItemModal";
import store from './store';

import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

import { loadUser } from "./actions/authActionCreators";

class App extends React.Component {
    componentDidMount(){
        store.dispatch(loadUser());
    };

    render(){
        return (
            <Provider store={store}>
                <div className="App">
                    <AppNavbar />
                    <Container>
                        <ItemModal />
                        <MainList />
                    </Container>
                </div>
            </Provider>
        )
    }
}

export default App;
