const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const getPosts = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${API_URL}?${query}`);
  return response.json();
};

export const getPost = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
};

export const createPost = async (postData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });
  return response;
};

export const deletePost = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  
  return response; 
};

export const updatePost = async (id, updatedPost) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedPost),
  });

  return response;
};