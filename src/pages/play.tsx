import { useEffect, useRef, useState } from 'react';
import { ITeam } from '../interfaces/team.interface';
import { useNavigate, useParams } from 'react-router-dom';
import Scoreboard from '../components/scoreboard';

const PlayPage = () => {
	const id = useParams();
	const navigate = useNavigate();
	const [selectedTeams, setSelectedTeams] = useState<ITeam[]>([]);
	const [tossWinner, setTossWinner] = useState<ITeam>();
	const [scoreboard, setScoreboard] = useState<Array<{ overs: number; runs: number }>>([]);
	const [overs, setOvers] = useState(0);
	const [matchStarted, setMatchStarted] = useState<boolean>(false);
	const oversRef = useRef(overs);
	const [matchWinnerTeam, setMatchWinnerTeam] = useState<ITeam>();
	const [teamRuns, setTeamRuns] = useState<[number, number]>();
	const [teamOneScoreboard, setTeamOneScoreboard] = useState<Array<{ overs: number; runs: number }>>([]);
	const [teamTwoScoreboard, setTeamTwoScoreboard] = useState<Array<{ overs: number; runs: number }>>([]);

	useEffect(() => {
		oversRef.current = overs;
		if (overs === 2 && scoreboard?.length === 12) {
			const teamOneruns = scoreboard?.slice(0, 6).reduce((acc, curr) => acc + curr.runs, 0);
			const teamTworuns = scoreboard?.slice(6).reduce((acc, curr) => acc + curr.runs, 0);

			setTeamRuns([teamOneruns, teamTworuns]);

			const matchWinner = teamOneruns > teamTworuns ? selectedTeams[0] : selectedTeams[1];
			setMatchWinnerTeam(matchWinner);
			setTeamOneScoreboard(scoreboard?.slice(0, 6));
			setTeamTwoScoreboard(scoreboard?.slice(6));
		}
	}, [overs]);

	useEffect(() => {
		const teamsSelected = localStorage.getItem('selectedTeams');
		const bowlingTeam = localStorage.getItem('bowlingTeam');
		if (teamsSelected && bowlingTeam) {
			const parsedSelectedTeams = JSON.parse(teamsSelected);
			const parsedBowlingTeam = JSON.parse(bowlingTeam);

			if (parsedSelectedTeams[1] !== parsedBowlingTeam) {
				const newSelectedTeams = [parsedBowlingTeam, parsedSelectedTeams[0]];
				setSelectedTeams(newSelectedTeams);
				localStorage.setItem('selectedTeams', JSON.stringify(newSelectedTeams));
			} else setSelectedTeams(parsedSelectedTeams);

			setTossWinner(parsedBowlingTeam);
		}
	}, []);

	const handleStartMatch = () => {
		setMatchStarted(true);
		const interval = setInterval(() => {
			const randomRun = Math.floor(Math.random() * 7);

			let currentOvers = (oversRef.current + 0.1).toFixed(1);

			if (parseFloat(currentOvers) === 0.6) {
				currentOvers = '1.0';
			} else if (parseFloat(currentOvers) === 1.6) {
				currentOvers = '2.0';
			}

			setOvers(Number(currentOvers));

			if (randomRun !== 5) {
				setScoreboard((prevScoreboard) => [...prevScoreboard, { overs: parseFloat(currentOvers), runs: randomRun }]);
			} else {
				setScoreboard((prevScoreboard) => [...prevScoreboard, { overs: parseFloat(currentOvers), runs: 0 }]);
			}

			if (parseFloat(currentOvers) >= 2) {
				clearInterval(interval);
			}
		}, 1000);
	};

	const handleEndMatch = () => {
		const matchDetails = {
			team_One: selectedTeams[0],
			team_Two: selectedTeams[1],
			tossWinner: tossWinner,
			teamOneRuns: teamRuns && teamRuns[0],
			teamTwoRuns: teamRuns && teamRuns[1],
			teamOneScoreboard: teamOneScoreboard,
			teamTwoScoreboard: teamTwoScoreboard,
			matchWinnerTeam: matchWinnerTeam,
			id: id?.id,
		};

		fetch(`${import.meta.env.VITE_BACKEND_URL}/matches`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(matchDetails),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data) localStorage.clear();
				navigate('/matches');
			})
			.catch((error) => {
				console.error('Error posting match details:', error);
			});
	};

	return (
		<div className=" text-black ">
			<div className="flex gap-5 text-2xl justify-center">
				<p className="font-bold">{selectedTeams[0]?.name}</p>
				<p>vs</p>
				<p className="font-bold">{selectedTeams[1]?.name}</p>
			</div>
			<div className=" text-lg mt-2">
				<p>{tossWinner?.name} won the toss and choose to bowl</p>
			</div>
			{tossWinner && (
				<button
					className=" mt-5 bg-slate-200 cursor-pointer"
					onClick={handleStartMatch}
					disabled={matchStarted}>
					Start Match
				</button>
			)}
			{scoreboard && scoreboard.length > 0 ? <Scoreboard scoreboard={scoreboard} /> : <p className=" mt-10">Match has not started yet!</p>}

			{scoreboard && scoreboard.length >= 12 && matchWinnerTeam && (
				<div className="mt-5 text-center">
					<h2 className="text-2xl font-bold mb-2">Match Over</h2>
					<p>
						{selectedTeams[0]?.name} has scored {teamRuns && teamRuns[0]}
					</p>
					<p>
						{selectedTeams[1]?.name} has scored {teamRuns && teamRuns[1]}
					</p>
					<p className=" text-purple-600 text-lg font-medium mt-2">{matchWinnerTeam?.name} won the match!</p>
					<button
						onClick={handleEndMatch}
						className=" bg-slate-200 mt-5">
						End Match
					</button>
				</div>
			)}
		</div>
	);
};

export default PlayPage;
