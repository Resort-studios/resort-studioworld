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

    // Farben je Kategorie (Discord Farben in Dezimal)
    const categoryColors = {
        "Update": 5763719,       // Blau
        "Construction": 16753920, // Orange
        "Bugfix": 16711680,      // Rot
        "Improvement": 65280      // Grün
    };

    const payload = {
        embeds: [
            {
                title: title,
                color: categoryColors[category] || 5763719,
                fields: [
                    { name: "Category", value: category, inline: true },
                    { name: "Date", value: date, inline: true },
                    { name: "Description", value: text }
                ],
                author: {
                    name: "Admin Changelog",
                    icon_url: "https://i.imgur.com/0PjQXzU.png" // kleines Symbol
                },
                footer: {
                    text: "Powered by Admin Panel",
                    icon_url: "https://i.imgur.com/0PjQXzU.png"
                },
                timestamp: new Date()
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

// Live Preview
document.getElementById("text").addEventListener("input", function() {
    document.getElementById("previewText").innerText = this.value;
});
