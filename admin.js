const webhookURL = "https://discord.com/api/webhooks/1485052312048107641/tOTwdxvBXJv5YJTTo3XPR_oK_rcXca54w_DnJir95dh4lD1uELihGf-UPJJJyryVz1ze";

function postUpdate(){

const title =
document.getElementById("title").value;

const text =
document.getElementById("text").value;

const category =
document.getElementById("category").value;

const date =
new Date().toISOString().split("T")[0];


/* Discord Nachricht */

fetch(webhookURL,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({

embeds:[

{

title: title,

description:

"Category: " + category +

"\nDate: " + date +

"\n\n" + text,

color: 5763719

}

]

})

});


alert("Update sent to Discord!");

}
