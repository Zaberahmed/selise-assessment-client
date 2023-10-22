import { useEffect, useState } from 'react';
import { IMatch } from '../interfaces/match.interface';
import { IoIosCloseCircle } from 'react-icons/io';

const MatchesPage = () => {
	const [matches, setMatches] = useState<IMatch[]>([]);

	useEffect(() => {
		const fetchMatchesData = () => {
			fetch(`${import.meta.env.VITE_BACKEND_URL}/matches`)
				.then((response) => response.json())
				.then((data) => setMatches(data))
				.catch((error) => console.error('Error:', error));
		};
		fetchMatchesData();
	}, []);

	const handleDeleteMatch = (id: number) => {
		try {
			fetch(`${import.meta.env.VITE_BACKEND_URL}/matches/${id}`, {
				method: 'DELETE',
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error('Network response was not ok');
					}

					setMatches((prevMatches) => prevMatches.filter((match) => match.id !== id));
				})
				.catch((error) => {
					console.error('Error:', error);
				});
		} catch (error) {
			console.error('Error', error);
		}
	};

	return (
		<div className="text-black p-8">
			{matches && matches.length > 0 ? (
				<div className="max-w-lg mx-auto bg-white rounded shadow p-4">
					<h1 className="text-2xl font-bold mb-4">All Matches</h1>
					<ol className="list-disc pl-4">
						{matches?.map((match) => (
							<div
								key={match?.id}
								className="flex justify-between items-center gap-10 mb-2">
								<li className="text-lg flex items-center gap-5">
									<a href={`/match/${match?.id}`}>
										{match?.team_One?.name} vs {match?.team_Two?.name}
									</a>
									<IoIosCloseCircle
										size={'30px'}
										onClick={() => handleDeleteMatch(match.id)}
									/>
								</li>
							</div>
						))}
					</ol>
				</div>
			) : (
				<p className="text-xl">No data available!</p>
			)}
		</div>
	);
};

export default MatchesPage;
