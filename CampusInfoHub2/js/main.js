document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('resources-container');
    const tagFilter = document.getElementById('tagFilter');
    let resources = [];

    fetch('data/resources.json')
        .then(res => res.json())
        .then(data => {
            resources = data;
            populateTags(resources);
            displayResources(resources);
        });

    function displayResources(list) {
        container.innerHTML = '';
        list.forEach(r => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${r.name}</h3>
                <p><strong>Tip:</strong> ${r.type}</p>
                <p><strong>Locatie:</strong> ${r.location}</p>
                <p><strong>Program:</strong> ${r.program}</p>
                <p><strong>Tags:</strong> ${r.tags.join(', ')}</p>
            `;
            container.appendChild(card);
        });
    }

    function populateTags(list) {
        const allTags = [...new Set(list.flatMap(r => r.tags))];
        allTags.forEach(tag => {
            const option = document.createElement('option');
            option.value = tag;
            option.textContent = tag;
            tagFilter.appendChild(option);
        });

        tagFilter.addEventListener('change', () => {
            const selected = tagFilter.value;
            if (selected === 'all') displayResources(resources);
            else displayResources(resources.filter(r => r.tags.includes(selected)));
        });
    }
});