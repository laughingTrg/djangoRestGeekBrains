import logo from './logo.svg';
import './App.css';
import React from 'react';
import UserList from './components/User.js';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
        }
    }

    componentDidMount() {
        const users = [
            {
                'username': 'jason',
                'firstname': 'Артем',
                'lastname': 'Селиванов',
                'email': 'selivanov@mail.com',
            },
            {
                'username': 'n1ro',
                'firstname': 'Сергей',
                'lastname': 'Кондрашов',
                'email': 'kondrat@mail.com',
            },
            {
                'username': 'yeahBoy',
                'firstname': 'Ринат',
                'lastname': 'Каридов',
                'email': 'yeahboy@mail.com',
            },
        ]
        this.setState(
            {
                'users': users
            }
        )
    }

    render() {
        return (
            <div>
                <UserList users={this.state.users} />
            </div>
        )
    }
}

export default App;
