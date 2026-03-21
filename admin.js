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

    // Farben pro Kategorie für Discord Embed
    const categoryColors = {
        "Update": 5763719,
        "Construction": 16753920,
        "Bugfix": 16711680,
        "Improvement": 65280
    };

    // Emojis für Kategorien (optional für Discord Embed)
    const categoryEmojis = {
        "Update": "✨",
        "Construction": "🛠️",
        "Bugfix": "🐛",
        "Improvement": "⚡"
    };

    const payload = {
        embeds: [
            {
                title: `${categoryEmojis[category] || ""} ${title}`,
                color: categoryColors[category] || 5763719,
                fields: [
                    { name: "Kategorie", value: category, inline: true },
                    { name: "Datum", value: date, inline: true },
                    { name: "Beschreibung", value: text }
                ],
                author: {
                    name: "Admin Changelog",
                    icon_url: "https://i.imgur.com/0PjQXzU.png"
                },
                footer: {
                    text: "Powered by Admin Panel",
                    icon_url: "https://i.imgur.com/0PjQXzU.png"
                },
                timestamp: new Date()
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

            // Log in localStorage speichern (für changelog.html)
            let logs = JSON.parse(localStorage.getItem("logs")) || [];
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
    .catch(error => {
        console.error("Fehler:", error);
        alert("Fehler beim Senden. Prüfe die Konsole.");
    });
}

// Live Preview
document.getElementById("text").addEventListener("input", function() {
    document.getElementById("previewText").innerText = this.value;
});
