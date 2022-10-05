import React from "react";

const TodotItem = ({ todo }) => {
    return (
        <tr>
            <td>{todo.id}</td>
            <td>{todo.text}</td>
            <td>{todo.project}</td>
            <td>{todo.users}</td>
            <td>{todo.is_active}</td>
        </tr>
    )
}

const TodoList = ({ todos }) => {
    return (
        <table>
            <tr>
                <th>Id</th>
                <th>Text</th>
                <th>Project</th>
                <th>Users</th>
                <th>Active</th>
            </tr>
            {todos.map((todo) => <TodotItem todo={todo} /> )}
        </table>
    )
}

export default TodoList