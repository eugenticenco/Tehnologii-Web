let resourcesData = [];

fetch("data/resources.json")
.then(response => response.json())
.then(data => {

resourcesData = data;

displayResources(data);

});

function displayResources(resources){

let container = document.getElementById("resources-container");

container.innerHTML = "";

resources.forEach(resource => {

let card = document.createElement("div");

card.classList.add("card");

let tagsHTML = "";

resource.tags.forEach(tag => {

tagsHTML += `<span class="tag">${tag}</span>`;

});

card.innerHTML = `
<h3>${resource.name}</h3>
<p><b>Tip:</b> ${resource.type}</p>
<p><b>Locatie:</b> ${resource.location}</p>
<p><b>Program:</b> ${resource.program}</p>
<div>${tagsHTML}</div>
`;

container.appendChild(card);

});

}

function filterResources(tag){

if(tag === "all"){

displayResources(resourcesData);

return;

}

let filtered = resourcesData.filter(r => r.tags.includes(tag));

displayResources(filtered);

}


