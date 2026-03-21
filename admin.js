const webhookURL = "https://discord.com/api/webhooks/1485052312048107641/tOTwdxvBXJv5YJTTo3XPR_oK_rcXca54w_DnJir95dh4lD1uELihGf-UPJJJyryVz1ze";

function addUpdate(){

const title = document.getElementById("title").value;
const text = document.getElementById("text").value;

const update = {

date: new Date().toLocaleDateString(),
title: title,
text: text

};

/* speichern im Browser */
let logs = JSON.parse(localStorage.getItem("logs")) || [];

logs.push(update);

localStorage.setItem("logs", JSON.stringify(logs));

/* discord senden */

fetch(webhookURL,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({

embeds:[
{
title:title,
description:text,
color: 5763719
}
]

})

});

alert("Update posted!");

}