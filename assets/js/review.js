const form = document.getElementById("reviewForm");
const container = document.querySelector(".reviews-container");

// Functie om sterren te maken
function createStars(rating) {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
}

// Laden van goedgekeurde reviews
async function loadReviews() {
    try {
        const res = await fetch('/api/reviews');
        const reviews = await res.json();

        container.innerHTML = "";

        reviews
            .filter(r => r.approved) // alleen goedgekeurde reviews tonen
            .reverse()
            .forEach(r => {
                const div = document.createElement("div");
                div.className = "review-card";

                div.innerHTML = `
                    <div class="review-stars">${createStars(r.rating)}</div>
                    <p>"${r.message}"</p>
                    <span>- ${r.name} (${r.date})</span>
                `;

                container.appendChild(div);
            });
    } catch (err) {
        console.error("Kan reviews niet laden:", err);
        container.innerHTML = "<p>Reviews konden niet geladen worden.</p>";
    }
}

// Versturen van een review
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const data = {
        name: formData.get("name"),
        email: formData.get("email"),  // email toegevoegd voor 1 review per gebruiker
        rating: parseInt(formData.get("rating")),
        message: formData.get("message")
    };

    try {
        const res = await fetch('/api/reviews', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (res.ok) {
            alert("Bedankt voor je review! Wacht op goedkeuring.");
            localStorage.setItem("reviewed", "true"); // voorkom herhaalde reviews
            form.style.display = "none";
        } else {
            alert(result.message || "Je hebt al een review geplaatst!");
        }

        loadReviews();
    } catch (err) {
        console.error(err);
        alert("Er is iets misgegaan. Probeer het later opnieuw.");
    }
});

// Check localStorage bij laden
if (localStorage.getItem("reviewed")) {
    form.style.display = "none";

    const msg = document.createElement("p");
    msg.innerText = "Je hebt al een review geplaatst!";
    msg.style.textAlign = "center";
    msg.style.marginTop = "20px";

    form.parentElement.appendChild(msg);
}

// Initial load van reviews
loadReviews();