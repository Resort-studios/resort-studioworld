// admin.js

// Discord Webhook URL hier einfügen:
const webhookURL = "https://discord.com/api/webhooks/1485052312048107641/tOTwdxvBXJv5YJTTo3XPR_oK_rcXca54w_DnJir95dh4lD1uELihGf-UPJJJyryVz1ze"; // <-- echte URL einsetzen

function postUpdate() {
    const title = document.getElementById("title").value.trim();
    const text = document.getElementById("text").value.trim();
    const category = document.getElementById("category").value.trim();
    const date = new Date().toISOString().split("T")[0];

    if (!title || !text || !category) {
        alert("Bitte alle Felder ausfüllen!");
        return;
    }

    const payload = {
        embeds: [
            {
                title: title,
                description: `Category: ${category}\nDate: ${date}\n\n${text}`,
                color: 5763719
            }
        ]
    };

    fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
            alert("Update erfolgreich an Discord gesendet!");

            // --- Hier speichern wir die Logs sauber ---
            let logs = JSON.parse(localStorage.getItem("logs") || "[]");
            logs.push({
                title: title,
                text: text,
                category: category,
                date: date
            });
            localStorage.setItem("logs", JSON.stringify(logs));

            // Felder zurücksetzen
            document.getElementById("title").value = "";
            document.getElementById("text").value = "";
            document.getElementById("category").value = "Update";
            document.getElementById("previewText").innerText = "Your update preview appears here...";
        } else {
            alert("Fehler beim Senden: " + response.status);
        }
    })
    .catch(err => {
        console.error(err);
        alert("Fehler beim Senden.");
    });
}

// Live Preview
document.getElementById("text").addEventListener("input", function() {
    document.getElementById("previewText").innerText = this.value;
});
