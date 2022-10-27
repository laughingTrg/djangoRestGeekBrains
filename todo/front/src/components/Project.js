import React from "react";
import {Link} from "react-router-dom";

const ProjectItem = ({ project, delete_project }) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td>
                <Link to={`/projects/${project.name}`}>{project.name}</Link>
            </td>
            <td>{project.link}</td>
            <td>{project.users}</td>
            <td><button onClick={()=>delete_project(project.id)} type='button'>Delete</button></td>
        </tr>
    )
}

const ProjectList = ({ projects, delete_project }) => {
    return (
        <table>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Link</th>
                <th>Users</th>
                <th></th>
            </tr>
            {projects.map((project) => <ProjectItem project={project} delete_project={delete_project} /> )}
        </table>
    )
}

export default ProjectList