document.addEventListener('DOMContentLoaded', () => {
    fetch('projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(projects => {
            const projectsContainer = document.getElementById('projects-container');
            const showMoreContainer = document.getElementById('show-more-container');
            const projectsToShowInitially = 4;
            let projectsAreExpanded = false;

            // Function to render a batch of projects
            const renderProjects = (start, end) => {
                for (let i = start; i < end && i < projects.length; i++) {
                    const project = projects[i];
                    const projectSection = document.createElement('div');
                    projectSection.className = 'col-6 col-12-narrower';
                    
                    let projectHTML = `
                        <section>
                            <a href="${project.link}" class="image featured" target="_blank"><img src="${project.image}" alt="${project.title}" /></a>
                            <header>
                                <h3>${project.title}</h3>
                            </header>
                            <p>${project.description}</p>
                            <p><b>Languages:</b> ${project.languages}</p>
                    `;

                    if (project.technologies) {
                        projectHTML += `<p><b>Technologies/frameworks:</b> ${project.technologies}</p>`;
                    }
                    
                    projectHTML += `</section>`;
                    
                    projectSection.innerHTML = projectHTML;
                    projectsContainer.appendChild(projectSection);
                }
            };
            
            // Function to handle the button click
            const toggleProjects = (button) => {
                if (projectsAreExpanded) {
                    projectsContainer.innerHTML = ''; 
                    renderProjects(0, projectsToShowInitially);
                    button.textContent = "Show More";
                } else {
                    renderProjects(projectsToShowInitially, projects.length);
                    button.textContent = "Show Less";
                }
                projectsAreExpanded = !projectsAreExpanded;
            };

            renderProjects(0, projectsToShowInitially);

            // If there are more than 4 projects, show the button
            if (projects.length > projectsToShowInitially) {
                const showMoreButton = document.createElement('a');
                showMoreButton.href = "#";
                showMoreButton.className = "button large";
                showMoreButton.textContent = "Show More";
                
                showMoreButton.addEventListener('click', (event) => {
                    event.preventDefault(); 
                    toggleProjects(showMoreButton);
                });

                showMoreContainer.appendChild(showMoreButton);
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
});