// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  
    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  
    // Update icon visibility based on current theme
    updateThemeIcons()
  }
  
  function updateThemeIcons() {
    const isDark = document.documentElement.classList.contains("dark")
    const sunIcons = document.querySelectorAll('[data-lucide="sun"]')
    const moonIcons = document.querySelectorAll('[data-lucide="moon"]')
  
    sunIcons.forEach((icon) => {
      icon.parentElement.classList.toggle("dark:hidden", true)
      icon.parentElement.classList.toggle("hidden", isDark)
    })
  
    moonIcons.forEach((icon) => {
      icon.parentElement.classList.toggle("hidden", !isDark)
      icon.parentElement.classList.toggle("dark:block", true)
    })
  }
  
  function toggleTheme() {
    const isDark = document.documentElement.classList.contains("dark")
  
    if (isDark) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    }
  
    // Update icon visibility
    updateThemeIcons()
  }
  
  // Mobile Menu
  function toggleMobileMenu() {
    const mobileMenu = document.getElementById("mobile-menu")
    const menuBtn = document.getElementById("mobile-menu-btn")
  
    if (mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.remove("hidden")
      menuBtn.innerHTML = '<i data-lucide="x" class="h-6 w-6"></i>'
    } else {
      mobileMenu.classList.add("hidden")
      menuBtn.innerHTML = '<i data-lucide="menu" class="h-6 w-6"></i>'
    }
  
    // Re-initialize icons
    if (typeof lucide !== "undefined") {
      lucide.createIcons()
    }
  }
  
  // Modal Functions
  function openNovelsModal() {
    document.getElementById("novels-modal").classList.remove("hidden")
    document.body.style.overflow = "hidden"
  }
  
  function closeNovelsModal() {
    document.getElementById("novels-modal").classList.add("hidden")
    document.body.style.overflow = "auto"
  }
  
  function openLanguagesModal() {
    document.getElementById("languages-modal").classList.remove("hidden")
    document.body.style.overflow = "hidden"
  }
  
  function closeLanguagesModal() {
    document.getElementById("languages-modal").classList.add("hidden")
    document.body.style.overflow = "auto"
  }
  
  // Close modals when clicking outside
  document.addEventListener("click", (event) => {
    const novelsModal = document.getElementById("novels-modal")
    const languagesModal = document.getElementById("languages-modal")
  
    if (event.target === novelsModal) {
      closeNovelsModal()
    }
  
    if (event.target === languagesModal) {
      closeLanguagesModal()
    }
  })
  
  // Close modals with Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNovelsModal()
      closeLanguagesModal()
    }
  })
  
  // Back Button Functionality
  function goBack() {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      window.location.href = "index.html"
    }
  }
  
  // Smooth Scrolling for Anchor Links
  document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll('a[href^="#"]')
  
    links.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        const targetSection = document.querySelector(targetId)
  
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: "smooth",
          })
        }
      })
    })
  
    // Initialize theme on page load
    initializeTheme()
  
    // Re-initialize Lucide icons
    if (typeof lucide !== "undefined") {
      lucide.createIcons()
    }
  
    // Listen for system theme changes
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        if (e.matches) {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
        updateThemeIcons()
      }
    })
  
    // Theme toggle button event listener
    const themeToggleButton = document.getElementById("theme-toggle")
    if (themeToggleButton) {
      themeToggleButton.addEventListener("click", toggleTheme)
    }
  })
  
  // Animation on Scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll(".animate-slideIn")
  
    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = 150
  
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("animate-slideIn")
      }
    })
  }
  
  // Initialize everything when DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    initializeTheme()
    animateOnScroll()
  
    // Re-initialize Lucide icons after any dynamic content changes
    if (typeof lucide !== "undefined") {
      lucide.createIcons()
    }
  
    // Listen for scroll events
    window.addEventListener("scroll", animateOnScroll)
  })
  