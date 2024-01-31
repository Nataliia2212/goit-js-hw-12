import axios from "axios";

const search = async (qvery, page) => {
    try {
        const request = await axios.get("https://pixabay.com/api/", {
            params: {
                key: '35439381-dc6c31f5e4218074de9a0ab23',
                q: qvery,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                per_page: 40,
                page,
            }
        })
        return request.data
    } catch (error) {
		return error.message
	}    
}

export default search;