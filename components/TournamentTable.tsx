import React from 'react';

interface TeamStats {
  team: string;
  matchesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  goalsScored: number;
  goalsConceded: number;
  goalDifference: number;
  points: number;
}

interface TournamentTableProps {
  teams: TeamStats[];
}

export function TournamentTable({ teams }: TournamentTableProps) {
  // Sort teams by: 1. Points, 2. Goal Difference, 3. Goals Scored
  const sortedTeams = [...teams].sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    if (b.goalDifference !== a.goalDifference) {
      return b.goalDifference - a.goalDifference;
    }
    return b.goalsScored - a.goalsScored;
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-slate-300">
            <th className="text-left py-3 px-2 text-slate-700">#</th>
            <th className="text-left py-3 px-2 text-slate-700">Team</th>
            <th className="text-center py-3 px-2 text-slate-700">MP</th>
            <th className="text-center py-3 px-2 text-slate-700">W</th>
            <th className="text-center py-3 px-2 text-slate-700">D</th>
            <th className="text-center py-3 px-2 text-slate-700">L</th>
            <th className="text-center py-3 px-2 text-slate-700">GS</th>
            <th className="text-center py-3 px-2 text-slate-700">GC</th>
            <th className="text-center py-3 px-2 text-slate-700">GD</th>
            <th className="text-center py-3 px-2 text-slate-700">Pts</th>
          </tr>
        </thead>
        <tbody>
          {sortedTeams.map((team, index) => {
            const isQualified = index < 4;
            return (
              <tr
                key={team.team}
                className={`border-b border-slate-200 transition-colors hover:bg-slate-50 ${
                  isQualified ? 'bg-green-50' : ''
                }`}
              >
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2">
                    <span className={`${isQualified ? 'text-green-700' : 'text-slate-600'}`}>
                      {index + 1}
                    </span>
                    {isQualified && (
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    )}
                  </div>
                </td>
                <td className={`py-3 px-2 ${isQualified ? 'text-slate-900' : 'text-slate-700'}`}>
                  {team.team}
                </td>
                <td className="text-center py-3 px-2 text-slate-600">{team.matchesPlayed}</td>
                <td className="text-center py-3 px-2 text-slate-600">{team.wins}</td>
                <td className="text-center py-3 px-2 text-slate-600">{team.draws}</td>
                <td className="text-center py-3 px-2 text-slate-600">{team.losses}</td>
                <td className="text-center py-3 px-2 text-slate-600">{team.goalsScored}</td>
                <td className="text-center py-3 px-2 text-slate-600">{team.goalsConceded}</td>
                <td className={`text-center py-3 px-2 ${
                  team.goalDifference > 0 ? 'text-green-600' : 
                  team.goalDifference < 0 ? 'text-red-600' : 'text-slate-600'
                }`}>
                  {team.goalDifference > 0 ? '+' : ''}{team.goalDifference}
                </td>
                <td className={`text-center py-3 px-2 ${isQualified ? 'text-green-700' : 'text-slate-800'}`}>
                  {team.points}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
