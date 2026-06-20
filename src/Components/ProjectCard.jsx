// ProjectCard.jsx

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <h3>{project.title}</h3>
      <p>{project.description}</p>

      <div className="project-links">
        <a href={project.live}>Live</a>
        <a href={project.github}>GitHub</a>
      </div>
    </div>
  );
};

export default ProjectCard;