import React from "react";
import {Link} from "react-router-dom";

const ProjectItem = ({ project }) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td>
                <Link to={`/projects/${project.name}`}>{project.name}</Link>
            </td>
            <td>{project.link}</td>
            <td>{project.users}</td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <table>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Link</th>
                <th>Users</th>
            </tr>
            {projects.map((project) => <ProjectItem project={project} /> )}
        </table>
    )
}

export default ProjectList