import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IMatch } from '../interfaces/match.interface';
import Scoreboard from '../components/scoreboard';

const MatchDetailsPage = () => {
	const id = useParams();
	const navigate = useNavigate();
	const [match, setMatch] = useState<IMatch>();

	useEffect(() => {
		const fetchMatchDetails = () => {
			fetch(`${import.meta.env.VITE_BACKEND_URL}/matches/${id?.id}`)
				.then((response) => response.json())
				.then((data) => setMatch(data))
				.catch((error) => console.error('Error:', error));
		};
		fetchMatchDetails();
	}, [id]);

	return (
		<div className=" text-black">
			<h1>Match details</h1>
			{match && match?.matchWinnerTeam ? (
				<>
					<div className=" my-2 flex justify-center items-center gap-5">
						<p className=" text-xl font-bold">{match?.team_One?.name}</p>
						<p className=" text-lg">vs</p>
						<p className=" text-xl font-bold">{match?.team_Two?.name}</p>
					</div>
					<p>{match?.tossWinner?.name} has won the toss and chose to bowl</p>
					<p className="mt-8">
						{match?.team_One?.name} scored {match?.teamOneRuns} runs
					</p>
					{match?.teamOneScoreboard && match?.teamOneScoreboard.length > 0 ? <Scoreboard scoreboard={match?.teamOneScoreboard} /> : <p className=" mt-10">No scorebaord available!</p>}
					<p className=" mt-8">
						{match?.team_Two?.name} scored {match?.teamTwoRuns} runs
					</p>

					{match?.teamTwoScoreboard && match?.teamTwoScoreboard.length > 0 ? <Scoreboard scoreboard={match?.teamTwoScoreboard} /> : <p className=" mt-10">No scorebaord available!</p>}

					{match?.matchWinnerTeam === null ? <p className=" mt-8 text-xl font-bold text-green-700"> Match drawn</p> : <p className=" mt-8 text-xl font-bold text-green-700">Winner: {match?.matchWinnerTeam?.name}</p>}
				</>
			) : (
				<p> No details available!</p>
			)}

			<button
				onClick={() => navigate('/')}
				className=" bg-slate-200 mt-5">
				Play another
			</button>
		</div>
	);
};

export default MatchDetailsPage;
