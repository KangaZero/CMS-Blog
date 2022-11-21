const deletePost = (event) => {
  // event.target.value for imgs results in undefined
  // Using id as it can be read for both imgs and buttons, as event.target can result in either img or button el
  const postId = event.target.id;

  const popupEl = document.querySelector('#popup');
  const mainEl = document.querySelector('#main');
  const deleteBtn = document.querySelector('.delete-post-btn');

  const openPopup = () => {

    //need to remove the posts cards as a temporary solution to:
    // 1. If the user clicks other post's delete btn/img, deletion cascades to those as well
    // 2. popup card will shift the whole content down when visibile
    mainEl.classList.add('hidden');
    // To prevent a cascading delete of post if multiple delete btns are clicked
    deleteBtn.classList.add('hidden');
    // Shows popup upon clicking delete-btn/img
    popupEl.classList.remove('hidden');
    popupEl.classList.add('open-popup');
  };

  openPopup();

  //These buttons are on the popup
  const yesBtnEl = document.querySelector('#yes');
  const noBtnEl = document.querySelector('#no');

  const closePopup = () => {
    // Not responsive, but this prevents cascading deletes
    document.location.replace('/dashboard');

    // mainEl.classList.remove('hidden')

    // popupEl.classList.add('hidden')
    // popupEl.classList.remove('open-popup');
  };

  // No button closes popup
  noBtnEl.addEventListener('click', closePopup);

  const confirmDelete = async () => {
    const response = await fetch(`/api/posts/${postId}`,{
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if(response.ok) {
      document.location.replace('/dashboard');
    } else {
      // current test shows post being deleted regardless of response
      document.location.replace('/dashboard');
    }
  };

  // Yes button from popup DELETES current post
  yesBtnEl.addEventListener('click', confirmDelete);
};

// Nope doesn't seem to work as well
// const postTitleEl = document.querySelectorAll('#title-card')

// const postBtnsEl = document.createElement()

// const renderPostBtns = ` <div id="buttons" class="container text-end">
// <a href='/updatepost/{{post.id}}' id="edit-post-btn" class="inline-block text-gray-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5">
//     <img src="https://img.icons8.com/sf-regular-filled/36/null/edit-property.png"/>
// </a>
// {{!-- Using id as it can be read for both imgs and buttons as event.target can result in either img or button el --}}
// <button id="{{post.id}}" onclick="deletePost(event)" class="delete-post-btn inline-block text-gray-500 -translate-y-2 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5">
//     <img id="{{post.id}}" src="https://img.icons8.com/fluency-systems-filled/34/null/delete-forever.png"/>
// </button>
// </div>`

// postBtnsEl.innerHTML = renderPostBtns

// postTitleEl.prepend(postBtnsEl)






