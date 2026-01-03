import React, { useMemo } from 'react';
import { Trophy } from 'lucide-react';

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

interface Match {
  id: string;
  team1: string | null;
  team2: string | null;
  score1: number | null;
  score2: number | null;
}

interface KnockoutData {
  quarterFinals: Match[];
  semiFinals: Match[];
  final: Match;
}

interface KnockoutBracketProps {
  groupATeams: TeamStats[];
  groupBTeams: TeamStats[];
  knockoutData: KnockoutData;
}

export function KnockoutBracket({ groupATeams, groupBTeams, knockoutData }: KnockoutBracketProps) {
  // Sort and get qualified teams
  const qualifiedTeams = useMemo(() => {
    const sortTeams = (teams: TeamStats[]) => {
      return [...teams].sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
        return b.goalsScored - a.goalsScored;
      });
    };

    const sortedA = sortTeams(groupATeams).slice(0, 4);
    const sortedB = sortTeams(groupBTeams).slice(0, 4);

    return {
      groupA: sortedA,
      groupB: sortedB
    };
  }, [groupATeams, groupBTeams]);

  // Dynamically generate matchups
  const matches = useMemo(() => {
    const { groupA, groupB } = qualifiedTeams;

    // Quarter Finals matchups (cross-group)
    const qf = [
      { ...knockoutData.quarterFinals[0], team1: groupA[0]?.team, team2: groupB[3]?.team },
      { ...knockoutData.quarterFinals[1], team1: groupA[2]?.team, team2: groupB[1]?.team },
      { ...knockoutData.quarterFinals[2], team1: groupA[1]?.team, team2: groupB[2]?.team },
      { ...knockoutData.quarterFinals[3], team1: groupB[0]?.team, team2: groupA[3]?.team }
    ];

    // Determine QF winners
    const getWinner = (match: Match): string | null => {
      if (match.score1 === null || match.score2 === null) return null;
      if (match.score1 > match.score2) return match.team1;
      if (match.score2 > match.score1) return match.team2;
      
      return null;
    };

    // Semi Finals
    /*const sf = [
      { ...knockoutData.semiFinals[0], team1: getWinner(qf[0]), team2: getWinner(qf[1]) },
      { ...knockoutData.semiFinals[1], team1: getWinner(qf[2]), team2: getWinner(qf[3]) }
    ];*/
    const sf =
    getWinner(qf[0]) && getWinner(qf[1]) && getWinner(qf[2]) && getWinner(qf[3])
    ? [
        {
          ...knockoutData.semiFinals[0],
          team1: getWinner(qf[0]),
          team2: getWinner(qf[1]),
        },
        {
          ...knockoutData.semiFinals[1],
          team1: getWinner(qf[2]),
          team2: getWinner(qf[3]),
        },
      ]
    : null;

    // Final
    /*const final = {
      ...knockoutData.final,
      team1: getWinner(sf[0]),
      team2: getWinner(sf[1])
    };*/
    const final =
    sf && getWinner(sf[0]) && getWinner(sf[1])
    ? {
        ...knockoutData.final,
        team1: getWinner(sf[0]),
        team2: getWinner(sf[1]),
      }
    : null;

    // Champion
    //const champion = getWinner(final);
    const champion = final ? getWinner(final) : null;
    
    return {
    qf,
    ...(sf && { sf }),
    ...(final && { final }),
    ...(champion && { champion }),
    };
  }, [qualifiedTeams, knockoutData]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
      <div className="min-w-[900px]">
        <div className="flex justify-between items-start gap-4">
          {/* Quarter Finals */}
          <div className="flex-1">
            <h3 className="text-center mb-6 text-slate-700">Quarter Finals</h3>
            <div className="space-y-8">
              {matches.qf.map((match, index) => (
                <MatchCard key={match.id} match={match} showConnector={(index % 2) === 0} />
              ))}
            </div>
          </div>

          {/* Semi Finals */}
          <div className="flex-1">
            <h3 className="text-center mb-6 text-slate-700">Semi Finals</h3>
            <div className="space-y-8" style={{ marginTop: '58px' }}>
              {matches.sf && matches.sf.map((match, index) => (
                <div key={match.id} style={{ marginBottom: index === 0 ? '160px' : '0' }}>
                  <MatchCard match={match} showConnector={index === 0} />
                </div>
              ))}
            </div>
          </div>

          {/* Final */}
          <div className="flex-1">
            <h3 className="text-center mb-6 text-slate-700">Final</h3>
            <div style={{ marginTop: '186px' }}>
              {matches.final && (
              <MatchCard match={matches.final} showConnector={false} />
            )}
            </div>
          </div>

          {/* Champion */}
          <div className="flex-1">
            <h3 className="text-center mb-6 text-slate-700">Champion</h3>
            <div style={{ marginTop: '186px' }}>              
              {matches.champion && (
                <>
                  <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-400 rounded-lg p-4 shadow-md">

                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Trophy className="w-6 h-6 text-yellow-600" />
                      <span className="text-yellow-700">Winner</span>
                    </div>

                    <div className="text-center text-slate-900">
                      {matches.champion}
                    </div>
                  </div>
                </>
              )}              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MatchCardProps {
  match: Match;
  showConnector: boolean;
}

function MatchCard({ match, showConnector }: MatchCardProps) {
  const isCompleted = match.score1 !== null && match.score2 !== null;
  const winner = isCompleted
    ? match.score1! > match.score2!
      ? match.team1
      : match.score2! > match.score1!
      ? match.team2
      : match.team1 // team1 wins on penalties if equal
    : null;

  return (
    <div className="relative">
      <div className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden shadow-sm">
        {/* Team 1 */}
        <div
          className={`flex items-center justify-between p-3 border-b border-slate-200 ${
            winner === match.team1 ? 'bg-green-50' : ''
          }`}
        >
          <span className={`flex-1 ${winner === match.team1 ? 'text-slate-900' : 'text-slate-700'}`}>
            {match.team1 || 'TBD'}
          </span>
          <span
            className={`w-8 text-center ${
              winner === match.team1 ? 'text-green-700' : 'text-slate-600'
            }`}
          >
            {isCompleted ? match.score1 : '-'}
          </span>
        </div>

        {/* Team 2 */}
        <div
          className={`flex items-center justify-between p-3 ${
            winner === match.team2 ? 'bg-green-50' : ''
          }`}
        >
          <span className={`flex-1 ${winner === match.team2 ? 'text-slate-900' : 'text-slate-700'}`}>
            {match.team2 || 'TBD'}
          </span>
          <span
            className={`w-8 text-center ${
              winner === match.team2 ? 'text-green-700' : 'text-slate-600'
            }`}
          >
            {isCompleted ? match.score2 : '-'}
          </span>
        </div>
      </div>

      {/* Connector line to next round */}      
      
    </div>
  );
}
