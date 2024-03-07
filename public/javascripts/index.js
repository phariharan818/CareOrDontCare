document.addEventListener('DOMContentLoaded', async () => {
    // WHEN PAGE IS LOADED AND HOMEPAGE.JS is called, 
    // it needs to auth with the current page
    // maybe a new router is needed, which loads but doesn't add to the database

    
    // one that the user has not seen before if they are signed in...
    // const response = await fetch('/articles');
    // const data = await response.json();
    // const topicHeading = document.getElementById('topicHeading');
    // const topicDescription = document.getElementById('topicDescription');

    // topicHeading.textContent = `Topic: ${data.topic}`;
    // topicDescription.textContent = data.description;
    // document.getElementById('topicDescription').setAttribute('data-id', data._id);
    // console.log("Press to load content");
    // fetch('/dontcare', { method: 'POST' })
    // .then(response => response.json())
    // .then(data => {
    // console.log("New topic received:", data);
    // document.getElementById('topicHeading').innerText = data[0].title;
    // document.getElementById('topicDescription').innerText = data[0].description;
    // document.getElementById('topicDescription').setAttribute('data-id', data[0]._id);
    // })
    // .catch(error => console.error('Error fetching new topic:', error));
});

document.getElementById('careButton').onclick = function() {
    console.log("Care button clicked");
    const dataId = document.getElementById('topicDescription').getAttribute('data-id');
    console.log("Topic ID:", dataId);
    fetch('/care', {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({idT: dataId}),
        method: 'POST' 
    })
    .then(response => response.json())
    .then(data => {
        console.log("New topic received:", data);
        document.getElementById('topicHeading').innerText = data[0].title;
        document.getElementById('topicDescription').innerText = data[0].description;
        document.getElementById('topicDescription').setAttribute('data-id', data[0]._id);    
    })
    .catch(error => console.error('Error fetching new topic:', error));
};

document.getElementById('dontCareButton').onclick = function() {
    console.log("Don't Care button clicked");
    const dataId = document.getElementById('topicDescription').getAttribute('data-id');
    console.log("Topic ID:", dataId);
    fetch('/dontcare', {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({idT: dataId}),
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        console.log("New topic received:", data);
        document.getElementById('topicHeading').innerText = data[0].title;
        document.getElementById('topicDescription').innerText = data[0].description;
        document.getElementById('topicDescription').setAttribute('data-id', data[0]._id);
    })
    .catch(error => console.error('Error fetching new topic:', error));
};


// async function updateTopicAndDescription() {
//     try {
//         const response = await fetch('/articles');
//         const data = await response.json();
//         const topicHeading = document.getElementById('topicHeading');
//         const topicDescription = document.getElementById('topicDescription');
//         topicHeading.textContent = `Topic: ${data.title}`;
//         topicDescription.textContent = data.description;
//     } catch (error) {
//         console.error('Error fetching topic and description:', error);
//     }
// }
