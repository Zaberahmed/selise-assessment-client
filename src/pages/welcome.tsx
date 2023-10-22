import { useEffect, useState } from 'react';
import { ITeam } from '../interfaces/team.interface';
import { useNavigate } from 'react-router-dom';
import TeamFlag from '../components/teamFlag';

const WelcomePage = () => {
	const navigate = useNavigate();
	const [teams, setTeams] = useState<ITeam[]>([]);
	const [selectedTeams, setSelectedTeams] = useState<ITeam[]>([]);

	useEffect(() => {
		const fetchTeamsData = () => {
			fetch(`${import.meta.env.VITE_BACKEND_URL}/teams`)
				.then((response) => response.json())
				.then((data) => setTeams(data))
				.catch((error) => console.error('Error:', error));
		};
		fetchTeamsData();
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
