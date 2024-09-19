document.addEventListener('DOMContentLoaded', () => {
  feather.replace();

  const menuIcon = document.getElementById("menu-icon");
  const xIcon = document.getElementById("x");
  const mobileMenu = document.querySelector(".mobile-menu");

  // Toggle mobile menu display
  [menuIcon, xIcon].forEach(icon => icon.addEventListener("click", () => {
    const isMenuOpen = mobileMenu.classList.toggle("show");
    menuIcon.style.display = isMenuOpen ? "none" : "block";
    xIcon.style.display = isMenuOpen ? "block" : "none";
  }));

  // Close mobile menu if click outside
  document.addEventListener("click", (e) => {
    if (![menuIcon, xIcon, mobileMenu].some(el => el.contains(e.target))) {
      mobileMenu.classList.remove("show");
      menuIcon.style.display = "block";
      xIcon.style.display = "none";
    }
  });

  // Smooth scroll on navigation item click
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function () {
      const target = document.querySelector(this.dataset.target);
      const offsetPosition = target.offsetTop - 50;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    });
  });

  // Typing effect
  const texts = ["BRAIN", "STUDENT", "DEVELOPER"];
  let textIndex = 0, charIndex = 0, speed = 100;
  const textElement = document.querySelector(".writer");

  function typeWriter() {
    if (charIndex < texts[textIndex].length) {
      textElement.innerHTML += texts[textIndex].charAt(charIndex++);
      setTimeout(typeWriter, speed);
    } else {
      setTimeout(eraseText, 1000);
    }
  }

  function eraseText() {
    if (textElement.innerHTML.length) {
      textElement.innerHTML = textElement.innerHTML.slice(0, -1);
      setTimeout(eraseText, 50);
    } else {
      textIndex = (textIndex + 1) % texts.length;
      charIndex = 0;
      setTimeout(typeWriter, 500);
    }
  }

  typeWriter();
});

function sendWhatsAppMessage() {
  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;
  
  if (!name || !message) return alert("Please fill out all fields before sending your message.");

  const whatsappURL = `https://wa.me/6282120259592?text=${encodeURIComponent(`Hi, my name is ${name}\n${message}`)}`;
  window.open(whatsappURL, "_blank");
}

window.addEventListener('load', () => {
  const loaderContainer = document.querySelector('.container');
  const mainContent = document.querySelector('.maincontent');

  if (loaderContainer && mainContent) {
    loaderContainer.style.transition = 'opacity 0.6s ease'; // Transisi opacity
    mainContent.style.transition = 'opacity 0.6s ease'; // Transisi opacity mainContent

    setTimeout(() => {
      loaderContainer.style.opacity = '0'; // Mulai fade-out loader
      setTimeout(() => {
        loaderContainer.style.display = 'none'; // Sembunyikan loader setelah fade-out selesai
        mainContent.style.display = 'block'; // Tampilkan mainContent setelah loader hilang
        setTimeout(() => mainContent.style.opacity = '1', 50); // Fade-in mainContent
      }, 600); // Tunggu 0.6 detik hingga fade-out loader selesai
    }, 2300); // Waktu tampilan awal loader (2.5 detik)
  }
});

const socialLinks = {
  linkedin: "https://www.linkedin.com/in/zaky-mubarok-469128328",
  instagram: "https://www.instagram.com/mueheheheehh_",
  github: "https://github.com/ZakyMubarok-code"
};

Object.keys(socialLinks).forEach(platform => {
  document.querySelector(`.${platform}`).onclick = () => {
    window.location.href = socialLinks[platform];
  };
});

const emailElement = document.getElementById('email');
const messageElement = document.getElementById('message');
let emailCopyTimer = null; // Pastikan timer hanya satu

function copyEmail() {
  const emailToCopy = emailElement.innerText;
  navigator.clipboard.writeText(emailToCopy).then(() => {
    messageElement.innerText = 'Email copied!';
    setTimeout(() => messageElement.innerText = '', 2000);
  }).catch(() => {
    messageElement.innerText = 'Failed to copy email';
  });
}

// Event listeners untuk penyalinan email
['mousedown', 'contextmenu'].forEach(event => {
  emailElement.addEventListener(event, (e) => {
    if (event === 'contextmenu') e.preventDefault();
    if (event === 'mousedown') {
      emailCopyTimer = setTimeout(copyEmail, 1500); // Mulai timer pada mousedown
    } else {
      copyEmail(); // Salin email pada klik kanan (contextmenu)
    }
  });
});

emailElement.addEventListener('mouseup', () => clearTimeout(emailCopyTimer)); // Batalkan timer jika mouse dilepas
emailElement.addEventListener('mouseleave', () => clearTimeout(emailCopyTimer)); // Batalkan timer jika mouse meninggalkan elemen