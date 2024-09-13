const passwordBox = document.getElementById("password");
const length = 50;

const upperCase = "ABCEFGHIJKLMNOPQRTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const number = "0123456789";
const symbol = "@#%()_+~!}{[]><-=";
const allChars = upperCase + lowerCase + number + symbol;

function createPassword() {
  let password = "";
  password += upperCase[Math.floor(Math.random() * upperCase.length)];
  password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
  password += number[Math.floor(Math.random() * number.length)];
  password += symbol[Math.floor(Math.random() * symbol.length)];

  while (length > password.length) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  password = password.split('').sort(() => 0.5 - Math.random()).join('');

  passwordBox.value = password;
}

document.querySelector("button").addEventListener("click", function () {
  createPassword();
});
document.getElementById("copyPassword").addEventListener("click", function () {
  passwordBox.select();
  passwordBox.setSelectionRange(0, 99999);
  document.execCommand("copy");

  // optionaly, Provide feedback to the user
  alert("Password copied to clipoard!");
});
