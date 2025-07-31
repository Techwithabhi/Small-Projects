function generatePassword() {
    const length = parseInt(document.getElementById("lengthInput").value);
    const output = document.getElementById("passwordOutput");
    const strengthBar = document.getElementById("strengthBar");

    if (isNaN(length) || length <= 0) {
        output.textContent = "⚠ Please enter a valid number greater than 0.";
        strengthBar.style.backgroundColor = "transparent";
        return;
    }

    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const digits = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;':,./<>?`~";

    let allChars = lower + upper + digits + symbols;
    let password = "";

    for (let i = 0; i < length; i++) {
        password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    output.textContent = `🔐 ${password}`;
    updateStrength(length);
}

function copyPassword() {
    const text = document.getElementById("passwordOutput").textContent.replace("🔐 ", "");
    if (!text || text.trim() === "") return;

    navigator.clipboard.writeText(text).then(() => {
        showToast("✅ Password copied to clipboard!");
    });
}

function updateStrength(length) {
    const strengthBar = document.getElementById("strengthBar");
    let strengthColor = "#ccc";

    if (length < 6) {
        strengthColor = "#e74c3c"; // weak - red
    } else if (length < 10) {
        strengthColor = "#f1c40f"; // medium - yellow
    } else if (length < 16) {
        strengthColor = "#27ae60"; // strong - green
    } else {
        strengthColor = "#2980b9"; // very strong - blue
    }

    strengthBar.style.backgroundColor = strengthColor;
    strengthBar.style.width = Math.min(length * 6, 100) + "%";
}

function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.position = "fixed";
    toast.style.bottom = "30px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.backgroundColor = "#333";
    toast.style.color = "#fff";
    toast.style.padding = "12px 20px";
    toast.style.borderRadius = "8px";
    toast.style.boxShadow = "0 6px 16px rgba(0,0,0,0.2)";
    toast.style.zIndex = 9999;
    toast.style.opacity = 0;
    toast.style.transition = "opacity 0.4s ease";

    document.body.appendChild(toast);
    setTimeout(() => toast.style.opacity = 1, 100);
    setTimeout(() => {
        toast.style.opacity = 0;
        setTimeout(() => document.body.removeChild(toast), 500);
    }, 2000);
}
