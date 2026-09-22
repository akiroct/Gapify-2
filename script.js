const $ = (s) => document.querySelector(s);

// Anima os blocos conforme eles entram na tela.
const observer = new IntersectionObserver((items) => {
  items.forEach((item) => item.isIntersecting && item.target.classList.add('visible'));
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Comparador antes/depois.
const compare = $('#compare');
const slider = compare.querySelector('input');
const before = compare.querySelector('.compare-before');
const line = compare.querySelector('.compare-line');
slider.addEventListener('input', () => {
  before.style.width = `${slider.value}%`;
  line.style.left = `${slider.value}%`;
});

// Depoimentos.
let quoteIndex = 0;
const quotes = document.querySelectorAll('.quote');
const track = $('#quoteTrack');
function moveQuote(direction) {
  quoteIndex = (quoteIndex + direction + quotes.length) % quotes.length;
  track.style.transform = `translateX(-${quoteIndex * 100}%)`;
}
$('#prev').addEventListener('click', () => moveQuote(-1));
$('#next').addEventListener('click', () => moveQuote(1));

// Menu mobile.
const nav = $('.nav');
$('.menu-toggle').addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  $('.menu-toggle').setAttribute('aria-expanded', open);
});
document.querySelectorAll('nav a').forEach((link) => link.addEventListener('click', () => nav.classList.remove('open')));

// Brilho sutil que acompanha o ponteiro.
const glow = $('.cursor-glow');
window.addEventListener('pointermove', (event) => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

// Envia o briefing já estruturado ao WhatsApp. Troque o número abaixo pelo seu.
$('#briefingForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const message = `Olá! Meu nome é ${data.get('nome')}.%0A%0AQuero falar sobre: ${data.get('fase')}.%0A%0AE-mail: ${data.get('email')}%0A%0ADetalhes: ${data.get('mensagem')}`;
  const whatsappNumber = '5511999999999';
  window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank', 'noopener');
});
