type ScoreboardProps = {
	scoreboard: Array<{ overs: number; runs: number }>;
};

const Scoreboard = ({ scoreboard }: ScoreboardProps) => {
	return (
		<div className="mt-4 text-center">
			<table className="border-collapse mx-auto">
				<thead>
					<tr>
						<th className="px-4 py-2 border">Overs</th>
						<th className="px-4 py-2 border">Runs</th>
					</tr>
				</thead>
				<tbody>
					{scoreboard.map((entry, index) => (
						<tr
							key={index}
							className="odd:bg-gray-100">
							<td className="px-4 py-2 border">{entry.overs}</td>
							<td className="px-4 py-2 border">{entry.runs}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Scoreboard;
