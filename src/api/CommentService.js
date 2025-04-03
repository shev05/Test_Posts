const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const getComments = async (id) => {
  const response = await fetch(`${API_URL}/${id}/comments`);
  return response.json();
};

export const createComment = async (id,postData) => {
  const response = await fetch(`${API_URL}/${id}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });
  return response;
};