"use client"
import { useEffect, useState } from 'react';
interface Project {
    name: string;
    description: string;
    html_url: string;
  }
  async function fetchProjects() {
    const response = await fetch('https://api.github.com/jocscriptch/repo', {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      },
    });
    const projects = await response.json();
    return projects;
  }
  function ProjectList() {
    const [projects, setProjects] = useState<Project[]>([]);
    useEffect(() => {
      async function fetchData() {
        const data = await fetchProjects();
        setProjects(data);
      }
      fetchData();
    }, []);
    return (
      <ul>
        {projects.map((project) => (
          <li key={project.name}>
            <a href={project.html_url} target="_blank" rel="noreferrer">
              <h3>{project.name}</h3>
            </a>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    );
  }
  export default ProjectList;