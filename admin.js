// admin.js

// Discord Webhook URL hier einfügen:
const webhookURL = "https://discord.com/api/webhooks/1485052312048107641/tOTwdxvBXJv5YJTTo3XPR_oK_rcXca54w_DnJir95dh4lD1uELihGf-UPJJJyryVz1ze"; // <-- echte URL einsetzen

function postUpdate() {
    const title = document.getElementById("title").value.trim();
    const text = document.getElementById("text").value.trim();
    const category = document.getElementById("category").value.trim();
    const date = new Date().toISOString().split("T")[0];

    // Prüfen, ob alle Felder ausgefüllt sind
    if (!title || !text || !category) {
        alert("Bitte alle Felder ausfüllen!");
        return;
    }

    // Payload für Discord
    const payload = {
        embeds: [
            {
                title: title,
                description: `Category: ${category}\nDate: ${date}\n\n${text}`,
                color: 5763719 // Blau-ish
            }
        ]
    };

    // Nachricht an Discord senden
    fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
            alert("Update erfolgreich an Discord gesendet!");
            // Optional: Felder zurücksetzen
            document.getElementById("title").value = "";
            document.getElementById("text").value = "";
            document.getElementById("category").value = "Update";
            document.getElementById("previewText").innerText = "Your update preview appears here...";
        } else {
            alert("Fehler beim Senden: " + response.status);
        }
    })
    .catch(error => {
        console.error("Fehler:", error);
        alert("Fehler beim Senden. Prüfe die Konsole.");
    });
}

// Optional: Live Preview (falls du es nicht schon im HTML hast)
document.getElementById("text").addEventListener("input", function() {
    document.getElementById("previewText").innerText = this.value;
});
