const form = document.getElementById("resetForm");
const alertContainer = document.getElementById("alert-container");

const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');
const email = urlParams.get('email'); // or use id if that's how you track users

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newPassword = document.getElementById("newPassword").value;

    if (!token || !email) {
        showAlert("Missing token or email in URL.", "danger");
        return;
    }

    const payload = {
        token: token,
        email: email,
        newPassword: newPassword
    };

    try {
        const res = await fetch("https://backend.tidibe.xyz/api/rp/reset-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (res.ok) {
            showAlert(data.message || "Password reset successful. Please Login to the app with new password", "success");
            form.reset();
            form.style.display = "none";
        } else {
            showAlert(data.message || "Something went wrong.", "danger");
        }
    } catch (err) {
        showAlert("Something went wrong. Please try again later.", "danger");
        console.error(err);
    }
});

function showAlert(message, type = "success") {
    alertContainer.innerHTML = `
          <div class="alert alert-${type}" role="alert">
            ${message}
          </div>
        `;
}