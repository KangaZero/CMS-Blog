const postForm = async (event) => {
event.preventDefault();

    const title = document.querySelector('#title').value.trim()
    const content = document.querySelector('#content').value.trim()


    if (title && content) {

        const response = await fetch(`/api/posts`, {
            method: 'POST',
            body: JSON.stringify({ title, content}),
            headers: { 'Content-Type': 'application/json'},
        });

        if(response.ok) {
            const toast = document.querySelector('#post-toast')
            toast.classList.remove('hidden')
        }
    }
}



document
    .querySelector('#post-form')
    .addEventListener('submit', postForm)