export const fetchTeamsData = () => {
	return fetch(`${import.meta.env.VITE_BACKEND_URL}/teams`)
		.then((response) => response.json())
		.catch((error) => {
			console.error('Error:', error);
			throw error;
		});
};

export const fetchMatchesData = () => {
	return fetch(`${import.meta.env.VITE_BACKEND_URL}/matches`)
		.then((response) => response.json())
		.catch((error) => {
			console.error('Error:', error);
			throw error;
		});
};

export const fetchNextMatchId = () => {
	return fetch(`${import.meta.env.VITE_BACKEND_URL}/matches`)
		.then((response) => response.json())
		.then((data) => {
			const lastId = data?.length > 0 ? data[data?.length - 1]?.id : 0;
			return lastId + 1;
		})
		.catch((error) => {
			console.error('Error:', error);
			throw error;
		});
};

export const fetchMatchDetails = (matchId: string) => {
	return fetch(`${import.meta.env.VITE_BACKEND_URL}/matches/${matchId}`)
		.then((response) => response.json())
		.catch((error) => {
			console.error('Error:', error);
			throw error;
		});
};
