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

                // Logs speichern
                let logs = JSON.parse(localStorage.getItem("logs") || "[]");
                logs.push({ title, text, category, date });
                localStorage.setItem("logs", JSON.stringify(logs));

                // Felder zurücksetzen
                document.getElementById("title").value = "";
                document.getElementById("text").value = "";
                document.getElementById("category").value = "Update";
                document.getElementById("previewText").innerText = "Your update preview appears here...";

                renderLogs();
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
document.getElementById("text").addEventListener("input", function () {
    document.getElementById("previewText").innerText = this.value;
});

// Logs rendern
function renderLogs() {
    const logList = document.getElementById("logList");
    let logs = JSON.parse(localStorage.getItem("logs") || "[]");
    logList.innerHTML = "";

    logs.slice().reverse().forEach((log, index) => {
        const div = document.createElement("div");
        div.classList.add("log-card");
        div.setAttribute("data-index", logs.length - 1 - index);
        div.innerHTML = `
            <strong>${log.date} - ${log.category}</strong><br>
            ${log.title}<br>
            ${log.text}<br>
            <button class="delete-btn">Löschen</button>
            <hr>
        `;
        logList.appendChild(div);

        div.querySelector(".delete-btn").addEventListener("click", () => {
            let idx = parseInt(div.getAttribute("data-index"));
            logs.splice(idx, 1);
            localStorage.setItem("logs", JSON.stringify(logs));
            renderLogs();
        });
    });
}

// Alle Logs löschen
document.getElementById("clearAllBtn").addEventListener("click", () => {
    if (confirm("Alle Logs wirklich löschen?")) {
        localStorage.removeItem("logs");
        renderLogs();
    }
});

// Logs beim Laden rendern
document.addEventListener("DOMContentLoaded", renderLogs);
