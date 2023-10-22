import { ITeam } from './team.interface';

export interface IMatch {
	team_One: ITeam;
	team_Two: ITeam;
	tossWinner: ITeam;
	teamOneRuns: number;
	teamTwoRuns: number;
	teamOneScoreboard: Array<{ overs: number; runs: number }>;
	teamTwoScoreboard: Array<{ overs: number; runs: number }>;
	matchWinnerTeam: ITeam;
	id: number;
}
