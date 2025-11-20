const projectGrid = document.getElementById("projectsGrid");
const projectTemplate = document.getElementById("projectCardTemplate");

const buildDemoLink = (folder, file = "index.html") =>
  encodeURI(`projects/${folder}/${file}`);

const projects = [
  {
    title: "Whack A Mole",
    badge: "Game Dev",
    year: "2024",
    
    tags: ["JavaScript", "Canvas", "Game Loop"],
    github: "https://github.com/kartikeykamal",
    demo: buildDemoLink("whack a mole"),
  },
  {
    title: "Countdown Timer",
    badge: "Productivity",
    year: "2024",
    
    tags: ["UX", "Accessibility", "State"],
    github: "https://github.com/kartikeykamal",
    demo: buildDemoLink("Countdown Timer"),
  },
  {
    title: "Click & Drag Gallery",
    badge: "Interaction",
    year: "2024",
    
    tags: ["Pointer Events", "Inertia", "UX"],
    github: "https://github.com/kartikeykamal",
    demo: buildDemoLink("Click and drag"),
  },
  {
    title: "CSS Variables Playground",
    badge: "Design System",
    year: "2024",
    
    tags: ["CSS", "Variables", "Theme"],
    github: "https://github.com/kartikeykamal",
    demo: buildDemoLink("CSS variable"),
  },
  {
    title: "Flex Gallery Panels",
    badge: "CSS Craft",
    year: "2023",
    
    tags: ["CSS", "Flexbox", "Animation"],
    github: "https://github.com/kartikeykamal",
    demo: buildDemoLink("Flex panel"),
  },
  {
    title: "HFCMC Landing",
    badge: "Brand",
    year: "2023",
    
    tags: ["Landing", "Branding", "Responsive"],
    github: "https://github.com/kartikeykamal",
    demo: buildDemoLink("HFCMC"),
  },
  {
    title: "Canvas Particle Lab",
    badge: "Graphics",
    year: "2023",
    
    tags: ["Canvas", "Particles", "Animation"],
    github: "https://github.com/kartikeykamal",
    demo: buildDemoLink("HTMcanvas"),
  },
  {
    title: "HTML Video Player",
    badge: "Media",
    year: "2023",
    
    tags: ["Media", "Keyboard", "ARIA"],
    github: "https://github.com/kartikeykamal",
    demo: buildDemoLink("HTML video player"),
  },
  {
    title: "Analog Clock",
    badge: "Utility",
    year: "2023",
    
    tags: ["SVG", "Date API", "Motion"],
    github: "https://github.com/kartikeykamal",
    demo: buildDemoLink("JS Clock"),
  },
  {
    title: "KSD Showcase",
    badge: "Story",
    year: "2023",
    
    tags: ["Storytelling", "Video", "Layout"],
    github: "https://github.com/kartikeykamal",
    demo: buildDemoLink("KSD"),
  },
  {
    title: "Mouse Shadow Text",
    badge: "Micro-Interaction",
    year: "2023",
    
    tags: ["CSS", "Mouse", "Transforms"],
    github: "https://github.com/kartikeykamal",
    demo: buildDemoLink("Mouse Move Shadow"),
  },
  {
    title: "SFAN Scroll Story",
    badge: "Editorial",
    year: "2023",
    
    tags: ["Scroll", "Editorial", "Layout"],
    github: "https://github.com/kartikeykamal",
    demo: buildDemoLink("SFAN"),
  },
  {
    title: "Slide-in on Scroll",
    badge: "Motion",
    year: "2022",
    
    tags: ["Scroll", "Animation", "Performance"],
    github: "https://github.com/kartikeykamal",
    demo: buildDemoLink("Slide in on scroll"),
  },
  {
    title: "Sort Without Articles",
    badge: "Data",
    year: "2022",
    
    tags: ["Array", "Strings", "Sorting"],
    github: "https://github.com/kartikeykamal",
    demo: buildDemoLink("Sort Without Articles"),
  },
  {
    title: "Sticky Smart Nav",
    badge: "UI Pattern",
    year: "2022",
    
    tags: ["IntersectionObserver", "UX", "CSS"],
    github: "https://github.com/kartikeykamal",
    demo: buildDemoLink("Sticky nav"),
  },
  {
    title: "Type Ahead Search",
    badge: "Data",
    year: "2022",
    
    tags: ["APIs", "Regex", "Performance"],
    github: "https://github.com/kartikeykamal",
    demo: buildDemoLink("type ahead"),
  },
  {
    title: "Video Speed Controller",
    badge: "Experiment",
    year: "2022",
    
    tags: ["Canvas", "Video", "Pointer"],
    github: "https://github.com/kartikeykamal",
    demo: buildDemoLink("Video Speed Controller"),
  },
];

const createProjectCard = (project) => {
  if (!projectTemplate || !("content" in projectTemplate)) return null;

  const clone = projectTemplate.content.cloneNode(true);
  const card = clone.querySelector(".project-card");
  const badge = card.querySelector(".project-card__badge");
  const year = card.querySelector(".project-card__year");
  const title = card.querySelector(".project-card__title");
  const description = card.querySelector(".project-card__description");
  const tagsContainer = card.querySelector(".project-card__tags");
  const githubLink = card.querySelector('[data-type="github"]');
  const demoLink = card.querySelector('[data-type="demo"]');

  badge.textContent = project.badge || project.tags?.[0] || "Featured";
  year.textContent = project.year;
  title.textContent = project.title;
  description.textContent = project.description;

  tagsContainer.innerHTML = "";
  project.tags.forEach((tag) => {
    const li = document.createElement("li");
    li.textContent = tag;
    tagsContainer.appendChild(li);
  });

  githubLink.href = project.github;
  demoLink.href = project.demo;

  const gradientSeed = project.title.length * project.year.charCodeAt(0);
  card.style.setProperty(
    "--card-accent",
    `hsl(${gradientSeed % 360} 70% 50%)`
  );

  return clone;
};

if (projectGrid && projectTemplate) {
  projectGrid.innerHTML = "";
  projects.forEach((project) => {
    const cardFragment = createProjectCard(project);
    if (cardFragment) {
      projectGrid.appendChild(cardFragment);
    }
  });
}

const projectsScrollButtons = document.querySelectorAll(".projects-scroll-btn");

const getVisibleCardCount = () => {
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 900) return 2;
  return 3;
};

const computeScrollByAmount = () => {
  if (!projectGrid) return 0;
  const firstCard = projectGrid.querySelector(".project-card");
  const cardWidth = firstCard
    ? firstCard.getBoundingClientRect().width
    : projectGrid.clientWidth / getVisibleCardCount();
  const styles = getComputedStyle(projectGrid);
  const gap = parseFloat(styles.columnGap || styles.gap || "0");
  const visible = getVisibleCardCount();
  return cardWidth * visible + gap * Math.max(0, visible - 1);
};

let cachedScrollAmount = computeScrollByAmount();

window.addEventListener("resize", () => {
  cachedScrollAmount = computeScrollByAmount();
});

if (projectGrid && projectsScrollButtons.length) {
  projectsScrollButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = Number(button.dataset.scroll) || 1;
      projectGrid.scrollBy({
        left: cachedScrollAmount * direction,
        behavior: "smooth",
      });
    });
  });
}

