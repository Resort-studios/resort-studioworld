const serverIP = "studioworld.mcsh.io"; 

async function updateServerStatus(){

    try{

        const response = await fetch(
            "https://api.mcsrvstat.us/2/" + serverIP
        );

        const data = await response.json();

        if(data.online){

            document.getElementById("status").textContent = "Online";
            document.getElementById("status").style.color = "lime";

            document.getElementById("players").textContent =
                data.players.online + " / " + data.players.max;

            document.getElementById("version").textContent =
                data.version;

        } else {

            document.getElementById("status").textContent = "Offline";
            document.getElementById("status").style.color = "red";

            document.getElementById("players").textContent = "0";
            document.getElementById("version").textContent = "-";

        }

    }
    catch(err){

        document.getElementById("status").textContent = "Error";

        console.log(err);

    }

}

/* sofort laden */
updateServerStatus();

/* alle 20 Sekunden neu laden */
setInterval(updateServerStatus, 10000);

// Logs aus localStorage laden und anzeigen
let logs = JSON.parse(localStorage.getItem("logs")) || [];
let container = document.getElementById("logContainer");

// Neueste zuerst anzeigen, Layout bleibt wie vorher
logs.slice().reverse().forEach(log => {
    container.innerHTML += `
    <div class="log-card">
        <h3>${log.date} - ${log.category}</h3>
        <ul>
            <li><strong>${log.title}</strong></li>
            <li>${log.text}</li>
        </ul>
    </div>
    `;
});
