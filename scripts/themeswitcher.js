/**
 * Sets a given theme
 */
function setTheme(themeName) {
  localStorage.setItem('theme', themeName)
  document.documentElement.className = themeName
}
/**
 * Toggles between light and dark theme
 */
function toggleTheme() {
  if (localStorage.getItem('theme') === 'theme-dark') {
    setTheme('theme-light')
  } else {
    setTheme('theme-dark')
  }
}

// Sets the theme on initial load
if (localStorage.getItem('theme') === 'theme-light') {
  setTheme('theme-light')
} else {
  setTheme('theme-dark')
}
