window.addEventListener('DOMContentLoaded', () => {
  // Création du conteneur
  const container = document.createElement('div');
  container.id = 'mascotte-container';
  Object.assign(container.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '200px',
    zIndex: '1000',
    pointerEvents: 'none',
    transition: 'transform 0.2s ease'
  });

  const mascotImg = document.createElement('img');
  mascotImg.id = 'mascotte';
  mascotImg.alt = 'Mascotte';
  mascotImg.style.width = '100%';

  mascotImg.src = "../ressource/img/mascptte.png";

  mascotImg.onerror = () => {
    mascotImg.src = "ressource/img/mascptte.png";
  };

  container.appendChild(mascotImg);
  document.body.appendChild(container);

  let lastScroll = window.scrollY;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    container.style.transform = currentScroll > lastScroll
      ? 'translateY(5px)'
      : 'translateY(-5px)';
    lastScroll = currentScroll;
  });

  // en cours de dessin
  const sectionImageMap = {
    home: 'mascptte.png',
    about: 'mascptte.png',
    projects: 'mascptte.png',
    contact: 'mascptte.png'
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        const imageName = sectionImageMap[id];
        if (imageName) {
          mascotImg.src = `../ressource/img/${imageName}`;
          mascotImg.onerror = () => {
            mascotImg.src = `ressource/img/${imageName}`;
          };
        }
      }
    });
  }, { threshold: 0.5 });

  Object.keys(sectionImageMap).forEach(id => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });
});
