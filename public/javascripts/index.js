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
