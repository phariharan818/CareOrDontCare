document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/articles');
        const data = await response.json();
        const topicHeading = document.getElementById('topicHeading');
        const topicDescription = document.getElementById('topicDescription');

        topicHeading.textContent = `Topic: ${data.topic}`;
        topicDescription.textContent = data.description;
    } catch (error) {
        console.error('Error fetching topic and description:', error);
    }
});

document.getElementById('careButton').onclick = function() {
    console.log("Care button clicked");
    fetch('/care', { method: 'POST' })
    .then(response => response.json())
    .then(data => {
        console.log("New topic received:", data);
        document.getElementById('topicHeading').innerText = data[0].title;
        document.getElementById('topicDescription').innerText = data[0].description;
    })
    .catch(error => console.error('Error fetching new topic:', error));
};

document.getElementById('dontCareButton').onclick = function() {
    console.log("Don't Care button clicked");
    fetch('/dontcare', { method: 'POST' })
    .then(response => response.json())
    .then(data => {
        console.log("New topic received:", data);
        document.getElementById('topicHeading').innerText = data[0].title;
        document.getElementById('topicDescription').innerText = data[0].description;
    })
    .catch(error => console.error('Error fetching new topic:', error));
};


async function updateTopicAndDescription() {
    try {
        const response = await fetch('/articles');
        const data = await response.json();
        const topicHeading = document.getElementById('topicHeading');
        const topicDescription = document.getElementById('topicDescription');
        topicHeading.textContent = `Topic: ${data.title}`;
        topicDescription.textContent = data.description;
    } catch (error) {
        console.error('Error fetching topic and description:', error);
    }
}
