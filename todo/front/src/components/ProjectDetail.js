import React from "react";
import {useParams} from "react-router-dom";

const ProjectItem = ({ project }) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.link}</td>
            <td>{project.users}</td>
        </tr>
    )
}

const ProjectDetail = ({ projects }) => {
    console.log('projects=', projects)
    let { projectId } = useParams()
    console.log('useParams=', projectId, typeof(projectId))
    let project_filter = projects.filter((project) => project.name.includes(projectId))
    console.log('project_filter=', project_filter)
    return (
        <table>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>LINK</th>
                <th>USERS</th>
            </tr>
            {project_filter.map((project) => <ProjectItem project={project} /> )}
        </table>
    )
}

export default ProjectDetail