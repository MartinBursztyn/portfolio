// Menú mobile
const btn = document.querySelector('.nav-toggle');
const list = document.querySelector('.nav-list');
btn?.addEventListener('click', () => list.classList.toggle('open'));

const links = document.querySelectorAll('.nav-link');
links.forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const id = a.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
    list.classList.remove('open');
  });
});

// Resalta el link actual al hacer scroll
const sections = [...document.querySelectorAll('section[id]')];
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (!link) return;
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 });
sections.forEach(s => io.observe(s));
// Envío por mail con asunto y cuerpo
document.getElementById('contact-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const nombre = (data.get('nombre') || '').toString().trim();
  const apellido = (data.get('apellido') || '').toString().trim();
  const msj = (data.get('mensaje') || '').toString().trim();

  const to = 'martinburs07@gmail.com';
  const subject = encodeURIComponent(`Contacto desde portfolio — ${nombre} ${apellido}`);
  const body = encodeURIComponent(msj);

  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
});
