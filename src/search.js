 const search = qvery => {
    const BASE_URL = 'https://pixabay.com';
    const END_POINT = '/api/';
    const searchParams = new URLSearchParams({
        key: '35439381-dc6c31f5e4218074de9a0ab23',
        q : qvery,
        image_type:  'photo',
        orientation : 'horizontal',
        safesearch :  true,
    });
    const url = `${BASE_URL}${END_POINT}?${searchParams}`

    return fetch(url).then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    })
}

export default search;