// Accessing the DOM
const registerBtn = document.getElementById("register-btn");
const loginBtn = document.getElementById("login-btn");
const closeBtns = document.querySelectorAll(".popup-close");

// Sidebar DOM
const sideToggle = document.querySelector('.head__sidebar-toggle')
const closeBtn = document.querySelector('.close-btn');
const aside = document.querySelector('.aside');
const toggleBtn = document.querySelector(".sidebar__toggle")
const pops = document.querySelector(".pops")
const popup = document.querySelector(".popup")

// Modal
popup.style.display = "none";
pops.style.display = "none";

registerBtn.addEventListener("click", () => {
    document.body.classList.add("showRegisterForm");
    popup.style.display = "block";
});

loginBtn.addEventListener("click", () => {
    document.body.classList.add("showLoginForm");
    pops.style.display = "block";
})

closeBtns.forEach(closeBtn => {
    closeBtn.addEventListener("click", () => {
        document.body.classList.remove("showLoginForm");
        document.body.classList.remove("showRegisterForm");
        popup.style.display = "none";
        pops.style.display = "none";
    })
})

// Sidebar
sideToggle.addEventListener('click', () => {
    aside.classList.toggle('show-sidebar');
    toggleBtn.classList.add("show")
  })
  
  closeBtn.addEventListener('click', () => {
    aside.classList.remove('show-sidebar');
    toggleBtn.classList.remove("show")
  })


// Preloader
const preloader = document.querySelector(".preloader");
window.addEventListener("load", () => {
  preloader.classList.add("hide-preloader");
});


// Select Change
const select = document.getElementById('select')

//Credentials
function logout() {
  localStorage.clear();
}