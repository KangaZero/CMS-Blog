const createPost = async (event) => {
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

            const titleEl = document.querySelector('#title');
            const contentEl = document.querySelector('#content');

            titleEl.value = "";
            contentEl.value = "";
            
            //Toast disappears after 8 seconds
            setTimeout(() => {
                toast.classList.add('hidden')
            }, 8000)
        }
    };
};



document
    .querySelector('#post-form')
    .addEventListener('submit', createPost)