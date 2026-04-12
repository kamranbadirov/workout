function openContact() {
  document.getElementById('contact-overlay').classList.add('open');
}

function closeContact(e) {
  if (!e || e.target === document.getElementById('contact-overlay') || !e.currentTarget || e.currentTarget.classList.contains('contact-close')) {
    document.getElementById('contact-overlay').classList.remove('open');
  }
}

async function submitContact(e) {
  e.preventDefault();
  var form = document.getElementById('contact-form');
  var btn  = form.querySelector('.contact-submit');
  btn.textContent = 'sending...';
  btn.disabled = true;
  var res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: new FormData(form),
  });
  if (res.ok) {
    form.style.display = 'none';
    document.getElementById('contact-success').style.display = 'block';
  } else {
    btn.textContent = 'try again';
    btn.disabled = false;
  }
}
