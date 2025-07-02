document.getElementById("generate").addEventListener("click", function() {
    const length = parseInt(document.getElementById("length").value);
    const includeLetters = document.getElementById("includeLetters").checked;
    const includeNumbers = document.getElementById("includeNumbers").checked;
    const includeSpecial = document.getElementById("includeSpecial").checked;

    let chars = "";

    if (includeLetters) {
        chars += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (includeNumbers) {
        chars += "0123456789";
    }
    if (includeSpecial) {
        chars += "!@#$%^&*()_-+=<>?/{}[]";
    }

    if (chars.length === 0) {
        alert("Please select at least one character type!");
        return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const resultDiv = document.getElementById("result");
    resultDiv.innerText = password;
    resultDiv.style.animation = "none";
    void resultDiv.offsetWidth; // restart animation
    resultDiv.style.animation = "fadeIn 0.5s ease";
});

document.getElementById("copy").addEventListener("click", function() {
    const password = document.getElementById("result").innerText;
    if (password) {
        navigator.clipboard.writeText(password).then(() => {
            alert("Password copied to clipboard!");
        });
    } else {
        alert("Nothing to copy!");
    }
});

document.getElementById("darkMode").addEventListener("change", function() {
    document.body.classList.toggle("dark", this.checked);
});
