document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");
  let index = 0;

  function generateWallet() {
    output.textContent += `\n[${new Date().toLocaleTimeString()}] Checked m/44'/0'/0'/0/${index}`;
    index++;
  }

  generateWallet();
  setInterval(generateWallet, 3000);
});