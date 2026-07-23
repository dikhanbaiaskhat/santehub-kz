// SantehHUB — shared behaviour

document.addEventListener('DOMContentLoaded', function () {
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      nav.classList.toggle('nav--open');
      burger.classList.toggle('is-active');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('nav--open');
      });
    });
  }

  // Header background on scroll
  var header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.style.boxShadow = window.scrollY > 10 ? '0 8px 30px rgba(20,20,30,0.08)' : 'none';
    });
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  // Callback form -> pre-filled WhatsApp message
  var form = document.getElementById('callback-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('[name="name"]').value.trim();
      var phone = form.querySelector('[name="phone"]').value.trim();
      var message = form.querySelector('[name="message"]').value.trim();
      var lang = document.documentElement.lang === 'kk';

      var text = lang
        ? 'Сәлем! Менің атым ' + name + '. Телефон: ' + phone + (message ? '. Сұрақ: ' + message : '') + '. Кері байланыс сұраймын.'
        : 'Здравствуйте! Меня зовут ' + name + '. Телефон: ' + phone + (message ? '. Вопрос: ' + message : '') + '. Прошу перезвонить.';

      var waNumber = form.getAttribute('data-whatsapp') || '77476840177';
      var url = 'https://wa.me/' + waNumber + '?text=' + encodeURIComponent(text);
      window.open(url, '_blank');
    });
  }
});
