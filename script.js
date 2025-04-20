document.addEventListener('DOMContentLoaded', function () {
  const postForm = document.getElementById('postForm');
  const titleInput = document.getElementById('title');
  const contentInput = document.getElementById('content');
  const postsContainer = document.getElementById('postsContainer');

  let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];

  function renderPosts() {
    postsContainer.innerHTML = '';
    posts.forEach((post, index) => {
      const postDiv = document.createElement('div');
      postDiv.classList.add('post');
      postDiv.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <div class="post-actions">
          <button class="btn edit-btn" data-index="${index}">Edit</button>
          <button class="btn delete-btn" data-index="${index}">Delete</button>
        </div>
      `;
      postsContainer.appendChild(postDiv);
    });
  }

  function savePosts() {
    localStorage.setItem('blogPosts', JSON.stringify(posts));
  }

  postForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (title && content) {
      posts.push({ title, content });
      savePosts();
      renderPosts();
      postForm.reset();
    }
  });

  postsContainer.addEventListener('click', function (e) {
    const index = e.target.getAttribute('data-index');
    if (e.target.classList.contains('delete-btn')) {
      posts.splice(index, 1);
      savePosts();
      renderPosts();
    }

    if (e.target.classList.contains('edit-btn')) {
      const post = posts[index];
      titleInput.value = post.title;
      contentInput.value = post.content;
      posts.splice(index, 1); // Remove old post while editing
      savePosts();
      renderPosts();
    }
  });

  renderPosts();
});

