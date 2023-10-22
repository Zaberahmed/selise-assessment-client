import { ITeam } from '../interfaces/team.interface';

type TeamFlagProps = {
	team: ITeam;
	handleTeamSelection: (team: ITeam) => void;
	selectedTeams?: ITeam[];
};

const TeamFlag = ({ team, handleTeamSelection, selectedTeams }: TeamFlagProps) => {
	return (
		<div
			key={team?.name}
			onClick={() => handleTeamSelection(team)}
			className={`cursor-pointer border rounded-md p-2 hover:shadow-lg w-[200px] ${selectedTeams && selectedTeams.some((item) => item.id === team.id) ? 'bg-blue-200' : ''}`}>
			<img
				src={team?.image}
				className="w-[150px] m-auto h-[100px]"
			/>
		</div>
	);
};

export default TeamFlag;
