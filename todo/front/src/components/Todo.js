import React from "react";

const TodotItem = ({ todo, delete_todo }) => {
    return (
        <tr>
            <td>{todo.id}</td>
            <td>{todo.text}</td>
            <td>{todo.project}</td>
            <td>{todo.users}</td>
            <td>{String(todo.is_active)}</td>
            <td><button onClick={()=>delete_todo(todo.id)} type='button'>Delete</button></td>
        </tr>
    )
}

const TodoList = ({ todos, delete_todo }) => {
    return (
        <table>
            <tr>
                <th>Id</th>
                <th>Text</th>
                <th>Project</th>
                <th>Users</th>
                <th>Active</th>
                <th></th>
            </tr>
            {todos.map((todo) => <TodotItem todo={todo} delete_todo={delete_todo}/> )}
        </table>
    )
}

export default TodoList