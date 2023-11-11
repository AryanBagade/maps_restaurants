import axios from 'axios';


// const options = {
// 	params: {
// 		bl_latitude: '11.847676',
// 		tr_latitude: '12.838442',
// 		bl_longitude: '109.095887',
// 		tr_longitude: '109.149359',
// 	},
// 	headers: {
// 		'X-RapidAPI-Key': '3de10f21f6msh960f87c22e7314cp1b154ejsn392238d8659 d',
// 		'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
// 	}
// };


export const getPlacesData = async (type, sw, ne) => {
	try {
		const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
			params: {
				bl_latitude: sw.lat,
				bl_longitude: sw.lng,
				tr_longitude: ne.lng,
				tr_latitude: ne.lat,
			},
			headers: {
				'X-RapidAPI-Key': 'c54d633b11msh48f2dd5d257b911p12f331jsn8aae1285376c',
				'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
			}
		});
		// console.log(bounds)
		return data;
	} catch (error) {
		console.log(error)
	}
}