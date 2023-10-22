import { useEffect, useState } from 'react';
import { ITeam } from '../interfaces/team.interface';
import { useNavigate } from 'react-router-dom';
import TeamFlag from '../components/teamflag';
import { fetchNextMatchId } from '../services/api';

const TossPage = () => {
	const navigate = useNavigate();
	const [selectedTeams, setSelectedTeams] = useState<ITeam[]>([]);
	const [id, setId] = useState<number>();
	const [teamSelectedForBowling, setTeamSelectedForBowling] = useState<ITeam>();

	useEffect(() => {
		const teamSelected = localStorage.getItem('selectedTeams');
		if (teamSelected) {
			setSelectedTeams(JSON.parse(teamSelected));
		}
		try {
			fetchNextMatchId()
				.then((nextId) => setId(nextId))
				.catch((error) => console.error('Error:', error));
		} catch (error) {
			console.log('Error', error);
		}
	}, []);

	const handleBowlingTeamSelect = (team: ITeam) => {
		setTeamSelectedForBowling(team);
	};

	const handleStartPlay = () => {
		localStorage.setItem('bowlingTeam', JSON.stringify(teamSelectedForBowling));
		navigate(`/play/${id}`);
	};
	return (
		<div className=" text-black">
			{selectedTeams && selectedTeams?.length > 0 ? (
				<>
					<p className=" text-xl font-bold">Select who will bowl first</p>
					<div className=" mt-[3rem] grid grid-cols-3 gap-10 text-xl font-bold">
						<TeamFlag
							team={selectedTeams[0]}
							handleTeamSelection={handleBowlingTeamSelect}
						/>
						<div className="flex items-center justify-center">
							<p className="m-auto">vs</p>
						</div>

						<TeamFlag
							team={selectedTeams[1]}
							handleTeamSelection={handleBowlingTeamSelect}
						/>
					</div>

					{teamSelectedForBowling && (
						<>
							<p className=" mt-[2rem]">{teamSelectedForBowling?.name} has been chosen for bowling</p>
							<button
								className=" mt-[2rem] bg-slate-200 cursor-pointer"
								onClick={handleStartPlay}>
								Start play
							</button>
						</>
					)}
				</>
			) : (
				<p>No data available!</p>
			)}
		</div>
	);
};

export default TossPage;
