import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import { getPlacesData } from './api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';


const App = () => {
	const [places, setPlaces] = useState([]);
	const [childClicked, setChildClicked] = useState(null);
	const [coords, setCoords] = useState({});
	const [bounds, setBounds] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [type, setType] = useState('restaurants');
	const [rating, setRating] = useState(0);
	const [filteredPlaces, setFilteredPlaces] = useState([]);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
			setCoords({ lat: latitude, lng: longitude });
		});
	}, []);

	useEffect(() => {
		const filteredPlaces = places.filter((place) => place.rating > rating);
		setFilteredPlaces(filteredPlaces);
	}, [rating]);

	useEffect(() => {
		setIsLoading(true)
		console.log(bounds);
		getPlacesData(type, bounds.sw, bounds.ne)
			.then((data) => {
				console.log(data);
				setPlaces(data);
				setFilteredPlaces([]);
				setIsLoading(false)
			})
	}, [type, coords, bounds])



	return (
		<>
			<CssBaseline />
			<Header setCoords={setCoords} />
			<Grid container spacing={3} style={{ width: '100%' }}>
				<Grid item xs={12} md={4}>
					<List
						places={filteredPlaces.length ? filteredPlaces : places}
						childClicked={childClicked}
						isLoading={isLoading}
						type={type}
						setType={setType}
						rating={rating}
						setRating={setRating}
					/>
				</Grid>
				<Grid item xs={12} md={4}>
					<Map
						setCoords={setCoords}
						setBounds={setBounds}
						coordinates={coords}
						places={filteredPlaces.length ? filteredPlaces : places}
						setChildClicked={setChildClicked}
					/>
				</Grid>
			</Grid>
		</>
	);
}
export default App;
