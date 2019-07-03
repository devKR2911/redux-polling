const FLICKR_API_KEY = 'a46a979f39c49975dbdd23b378e6d3d5';
const ENDPOINT = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&text=';

export const httpGet = (searchQuery) => {
  const FLICKR_API_ENDPOINT = `${ENDPOINT}${searchQuery}&api_key=${FLICKR_API_KEY}&format=json&nojsoncallback=1&per_page=10`;
  return fetch(FLICKR_API_ENDPOINT)
    .then(response => {
      return response.json()
    })
    .then(json => {
      return json.photos.photo.map(({ farm, server, id, secret, title }) => ({
        id,
        title,
        mediaUrl: `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
      }));
    });
};
