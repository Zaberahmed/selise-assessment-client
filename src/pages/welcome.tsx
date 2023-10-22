import { useEffect, useState } from 'react';
import { ITeam } from '../interfaces/team.interface';
import { useNavigate } from 'react-router-dom';
import TeamFlag from '../components/teamflag';
import { fetchTeamsData } from '../services/api';

const WelcomePage = () => {
	const navigate = useNavigate();
	const [teams, setTeams] = useState<ITeam[]>([]);
	const [selectedTeams, setSelectedTeams] = useState<ITeam[]>([]);

	useEffect(() => {
		fetchTeamsData()
			.then((data) => setTeams(data))
			.catch((error) => console.error('Error:', error));
	}, []);

	const handleTeamSelection = (team: ITeam) => {
		if (selectedTeams?.includes(team)) {
			setSelectedTeams((prev) => prev?.filter((item) => team?.id !== item?.id));
		} else {
			if (selectedTeams?.length < 2) setSelectedTeams((prev) => [...prev, team]);
		}
	};

	const handleButtonClick = () => {
		localStorage.setItem('selectedTeams', JSON.stringify(selectedTeams));
		navigate('/toss');
	};

	return (
		<div className=" text-black ">
			<div>
				<h1 className=" font-medium ">World Cup 2023</h1>
				<p className=" mt-2 p-2 font-medium text-xl "> Let's play cricket!</p>
			</div>
			<p className=" mt-5 font-medium"> Select any two team</p>

			<div className=" mt-2 p-2 grid grid-cols-2 gap-5 ">
				{teams && teams.length > 0 ? (
					teams?.map((team) => (
						<TeamFlag
							key={team?.name}
							team={team}
							handleTeamSelection={handleTeamSelection}
							selectedTeams={selectedTeams}
						/>
					))
				) : (
					<p>No data available!</p>
				)}
			</div>
			{selectedTeams?.length === 2 && (
				<button
					className=" mt-5 bg-slate-200 cursor-pointer"
					onClick={handleButtonClick}>
					Let's Toss
				</button>
			)}
		</div>
	);
};

export default WelcomePage;
