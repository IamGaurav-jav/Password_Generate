document.getElementById("darkMode").addEventListener("change", function () {
    document.body.classList.toggle("dark", this.checked);
});

document.getElementById("generate").addEventListener("click", function () {
    const length = parseInt(document.getElementById("length").value);
    const includeLetters = document.getElementById("includeLetters").checked;
    const includeNumbers = document.getElementById("includeNumbers").checked;
    const includeSpecial = document.getElementById("includeSpecial").checked;

    const errorDiv = document.getElementById("error");
    const strengthDiv = document.getElementById("strength");
    const copyButton = document.getElementById("copy");
    const resultDiv = document.getElementById("result");

    errorDiv.style.display = "none";
    strengthDiv.innerText = "";
    copyButton.disabled = true;

    if (isNaN(length) || length < 4) {
        errorDiv.innerText = "Password length must be at least 4 characters!";
        errorDiv.style.display = "block";
        resultDiv.innerText = "";
        return;
    }

    if (!includeLetters && !includeNumbers && !includeSpecial) {
        errorDiv.innerText = "Please select at least one character type!";
        errorDiv.style.display = "block";
        resultDiv.innerText = "";
        return;
    }

    let chars = "";
    let password = "";

    // Only include selected character types
    if (includeNumbers) {
        chars += "0123456789";
        // Ensure at least one number if selected
        password += "0123456789".charAt(Math.floor(Math.random() * 10));
    }
    if (includeSpecial) {
        const specials = "!@#$%^&*()_-+=<>?/{}[]";
        chars += specials;
        // Ensure at least one special if selected
        password += specials.charAt(Math.floor(Math.random() * specials.length));
    }
    if (includeLetters) {
        const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        chars += letters;
        // Ensure at least one letter if selected
        password += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    // Fill the rest of the password
    for (let i = password.length; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    password = password.split("").sort(() => Math.random() - 0.5).join('');

    resultDiv.innerText = password;
    resultDiv.style.animation = "none";
    void resultDiv.offsetWidth;
    resultDiv.style.animation = "fadeIn 0.5s ease";

    // ✅ Enable Copy Button
    copyButton.disabled = false;

    // ✅ Show Password Strength
    let strengthText = "";
    let color = "";

    if (length === 4) {
        strengthText = "Weak";
        color = "red";
    } else if (length <= 8) {
        strengthText = "Strong";
        color = "orange";
    } else {
        strengthText = "Very Strong";
        color = "green";
    }

    strengthDiv.innerText = "Strength: " + strengthText;
    strengthDiv.style.color = color;
});

document.getElementById("copy").addEventListener("click", function () {
    const password = document.getElementById("result").innerText;
    if (password) {
        navigator.clipboard.writeText(password).then(() => {
            alert("Password copied to clipboard!");
        });
    }
});
