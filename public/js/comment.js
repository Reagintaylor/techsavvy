const commentHandler = async function (event) {
    event.preventDefault();

    const button = event.target
    const commentText = $(button).prev().val()
    const postId = $(button).siblings().eq(1).children().eq(0).val().trim();

    if (commentText) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                commentText,
                postId,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            document.location.reload();
        }
    };
}


document
    .querySelector('.post-container')
    .addEventListener('submit', commentHandler);
//$('.postContainer').on('click', commentHandler);