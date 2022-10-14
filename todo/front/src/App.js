// import logo from './logo.svg';
import './App.css';
import React from 'react';
import UserList from './components/User.js';
import axios from 'axios';
import ProjectList from "./components/Project.js";
import TodoList from "./components/Todo";
import {BrowserRouter, Link, Navigate, Route, Routes} from "react-router-dom";
import NotFound404 from "./components/NotFound404";
import ProjectDetail from "./components/ProjectDetail";
import LoginForm from "./components/Auth.js";
import Cookies from "universal-cookie/es6";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'token': '',
        }
    }

    get_token(username, password) {

        const data = {username: username, password: password}
        axios.post('http://127.0.0.1:8000/api-token-auth/', data).then(response => {
            this.set_token(response.data['token'])
        }).catch(error => alert('Неверный логин или пароль'))
    }

    set_token(token) {
        // localStorage.setItem('login', 'test')
        // let item = localStorage.getItem('login')
        console.log(token)
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }

    is_auth() {
        return !!this.state.token
    }

    logout() {
        this.set_token('')
        this.setState({'users': []}, () => this.load_data())
        this.setState({'projects': []}, () => this.load_data())
        this.setState({'todos': []}, () => this.load_data())
    }

    get_headers() {
        let headers = {
            'Content-Type': 'applications/json'
        }
        if (this.is_auth()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users', {headers})
            .then(responce => {
                const users = responce.data
                this.setState(
                    {
                        'users': users,
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects', {headers})
            .then(responce => {
                const projects = responce.data

                this.setState(
                    {
                        'projects': projects,
                    }
                )

            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todos', {headers})
            .then(responce => {
                const todos = responce.data

                this.setState(
                    {
                        'todos': todos,
                    }
                )

            }).catch(error => console.log(error))
    }

    componentDidMount() {
        this.get_token_from_storage()
    }

    render() {
        return (

            <div className="App">
                <BrowserRouter>
                    <nav>
                        <li>
                            <Link to='/users'>Users</Link>
                        </li>
                        <li>
                            <Link to='/projects'>Projects</Link>
                        </li>
                        <li>
                            <Link to='/todos'>Todos</Link>
                        </li>
                        <li>
                            {this.is_auth() ? <button onClick={() => this.logout()}>Logout</button> :
                                <Link to='/login'>Login</Link>}
                        </li>
                    </nav>

                    <Routes>

                        <Route exact path='/' element={<Navigate to='/projects'/>}/>
                        <Route path='/projects'>
                            <Route index element={<ProjectList projects={this.state.projects}/>}/>
                            <Route path=':projectId' element={<ProjectDetail projects={this.state.projects}/>}/>

                        </Route>

                        <Route exact path='/users' element={<UserList users={this.state.users}/>}/>
                        {/*<Route exact path='/projects' element={<ProjectList projects={this.state.projects}/>}/>*/}
                        <Route exact path='/todos' element={<TodoList todos={this.state.todos}/>}/>
                        <Route exact path='/login' element={<LoginForm
                            get_token={(username, password) => this.get_token(username, password)}/>}/>
                        <Route path='*' element={<NotFound404/>}/>


                    </Routes>
                </BrowserRouter>
            </div>

        )
    }
}

export default App;
