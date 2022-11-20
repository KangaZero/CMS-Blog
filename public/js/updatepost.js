const updatePost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim()
    const content = document.querySelector('#content').value.trim()

    if (title && content) {
        const response = await fetch(`/api/posts`, {
            method: 'PUT',
            body: JSON.stringify({ title, content}),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/dashboard')
        }
    } else {
        const toast = document.querySelector('#post-toast')
        toast.classList.remove('hidden')
        
        //Toast disappears after 8 seconds
        setTimeout(() => {
            toast.classList.add('hidden')
        }, 8000)
    };
};

document
    .querySelector('#update-post-form')
    .addEventListener('submit', updatePost);
