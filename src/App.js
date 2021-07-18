import { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonList from './PokemonList';

function App() {
	const [Pokemon, setPokemon] = useState([]);
	const [CurrentPageUrl, setCurrentPageUrl] = useState(
		'https://pokeapi.co/api/v2/pokemon/'
	);
	const [PreviousPageUrl, setPreviousPageUrl] = useState();
	const [NextPageUrl, setNextPageUrl] = useState();
	const [Loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		let cancel;
		axios
			.get(CurrentPageUrl, {
				cancelToken: new axios.cancelToken((c) => (cancel = c)),
			})
			.then((response) => {
				setLoading(false);
				setPreviousPageUrl(response.data.previous);
				setNextPageUrl(response.data.next);
				setPokemon(response.data.results.map((p) => p.name));
			});

		// cleanup function
		return () => cancel();
	}, [CurrentPageUrl]);

	if (Loading) return 'Loading...';

	return <PokemonList pokemon={Pokemon} />;
}

export default App;
