function toggleArticle(checkbox) {
    const articleId = checkbox.parentElement.dataset.articleId;
    const action = checkbox.checked ? 'Cared' : 'Not Cared';
    console.log(`Article ${articleId}: ${action}`);
    
    fetch('/updateArticleStatus', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ articleId, action })
    })
    .then(response => {
        if (response.ok) {
            const articleElement = checkbox.closest('.card');
            if (!checkbox.checked) {
                articleElement.remove();
            }
        }
    })
    .catch(error => console.error('Error updating article status:', error));
}

function confirmDelete(articleId) {
    const modal = document.getElementById('confirmationModal');
    modal.style.display = 'block';

    const yesButton = document.getElementById('modalYesButton');
    yesButton.onclick = function() {
        fetch(`/care/${articleId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                console.log('Article deleted successfully');
                const card = document.querySelector(`.card[data-article-id="${articleId}"]`);
                if (card) {
                    card.remove();
                }
            } else {
                console.error('Error deleting article:', response.statusText);
            }
            modal.style.display = 'none';
        })
        .catch(error => {
            console.error('Error deleting article:', error);
            modal.style.display = 'none';
        });        
    };

    const noButton = document.getElementById('modalNoButton');
    noButton.onclick = function() {
        modal.style.display = 'none';
        this.onclick = location.reload()
    };
}