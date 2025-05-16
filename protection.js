// Disable right-click
document.addEventListener("contextmenu", e => e.preventDefault());

// Block keys for DevTools: F12, Ctrl+Shift+I/J/C, Ctrl+U
document.addEventListener("keydown", function (e) {
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && ["I", "J", "C", "U"].includes(e.key))
  ) {
    e.preventDefault();
  }
});

// Console Warning
console.log("%cStop!", "color: red; font-size: 30px; font-weight: bold;");
console.log("%cThis area is for developers only.", "color: gray; font-size: 16px;");
