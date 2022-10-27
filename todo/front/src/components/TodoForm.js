import React from "react";

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', projects: [], users: []}
    }

    handleChange(event) {
        this.setState({
                [event.target.name]: event.target.value
            }
        );
    }

    handleUsersChange(event) {
        if (!event.target.selectedOptions) {
            this.setState({
                'users': []
            })
            return;
        }
        let users = []
        users.push(event.target.selectedOptions.item(0).value)
        this.setState({
            'users': users
        })
    }

    handleProjectsChange(event) {
        if (!event.target.selectedOptions) {
            this.setState({
                'projects': []
            })
            return;
        }
        let projects = []
        projects.push(event.target.selectedOptions.item(0).value)
        this.setState({
            'projects': projects
        })
    }

    handleSubmit(event) {

        this.props.create_todo(this.state.text, this.state.projects, this.state.users)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>

                <div className="form-group">
                    <label htmlFor="text"></label>
                    <input type="text" name="text" placeholder="text"
                           value={this.state.text} onChange={(event) => this.handleChange(event)}/>

                </div>

                <div className="form-group">
                    <select name="users" onChange={(event) => this.handleUsersChange(event)}>
                        {this.props.users.map((item) => <option value={item.id}>{item.username}</option>)}

                    </select>

                    <select name="projects" onChange={(event) => this.handleProjectsChange(event)}>
                        {this.props.projects.map((item) => <option value={item.id}>{item.name}</option>)}

                    </select>
                </div>

                <input type="submit" value="Save"/>
            </form>
        )
    }
}

export default TodoForm