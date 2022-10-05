import React from "react";

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td>{project.name}</td>
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
                <th>NAME</th>
                <th>LINK</th>
                <th>USERS</th>
            </tr>
            {projects.map((project) => <ProjectItem project={project} /> )}
        </table>
    )
}

export default ProjectList