// Function to confirm switch of article
function confirmDelete(articleId) {
    console.log("Article being switched: ", articleId)
    // Fetch the router in care.js to update the database
    fetch(`/care/${articleId}`, {
        method: 'DELETE'
    })
}