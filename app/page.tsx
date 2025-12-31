"use client"
import  { useState } from "react";
import { TournamentTable } from "../components/TournamentTable";
import { KnockoutBracket } from "../components/KnockoutBracket";


const initialTournamentData = {
  groupA: [
    {
      team: "Milad Aali",
      matchesPlayed: 3,
      wins: 1,
      draws: 0,
      losses: 2,
      goalsScored: 11,
      goalsConceded: 10,
      goalDifference: 1,
      points: 3,
    },
    {
      team: "Erfan AliMardani",
      matchesPlayed: 3,
      wins: 1,
      draws: 1,
      losses: 1,
      goalsScored: 7,
      goalsConceded: 9,
      goalDifference: -2,
      points: 4,
    },
    {
      team: "MohammadHasan Kamaii",
      matchesPlayed: 5,
      wins: 2,
      draws: 0,
      losses: 3,
      goalsScored: 13,
      goalsConceded: 27,
      goalDifference: -14,
      points: 6,
    },
    {
      team: "HEssam",
      matchesPlayed: 5,
      wins: 5,
      draws: 0,
      losses: 0,
      goalsScored: 35,
      goalsConceded: 8,
      goalDifference: 27,
      points: 15,
    },
    {
      team: "Danyal khakbaz",
      matchesPlayed: 3,
      wins: 0,
      draws: 1,
      losses: 2,
      goalsScored: 4,
      goalsConceded: 9,
      goalDifference: -5,
      points: 1,
    },
    {
      team: "Reza Ebrahimi",
      matchesPlayed: 4,
      wins: 2,
      draws: 0,
      losses: 2,
      goalsScored: 13,
      goalsConceded: 19,
      goalDifference: -6,
      points: 6,
    },
  ],
  groupB: [
    {
      team: "Mehdi Pardat",
      matchesPlayed: 3,
      wins: 1,
      draws: 0,
      losses: 2,
      goalsScored: 14,
      goalsConceded: 6,
      goalDifference: 8,
      points: 3,
    },
    {
      team: "Mohammad Reza Ebrahimi",
      matchesPlayed: 4,
      wins: 0,
      draws: 0,
      losses: 4,
      goalsScored: 5,
      goalsConceded: 32,
      goalDifference: -27,
      points: 0,
    },
    {
      team: "Mehrdad falahati",
      matchesPlayed: 4,
      wins: 3,
      draws: 0,
      losses: 1,
      goalsScored: 18,
      goalsConceded: 12,
      goalDifference: 6,
      points: 9,
    },
    {
      team: " Mohammad Hoseini Chegeni",
      matchesPlayed: 2,
      wins: 0,
      draws: 0,
      losses: 2,
      goalsScored: 6,
      goalsConceded: 8,
      goalDifference: -2,
      points: 0,
    },
    {
      team: "Hesam BanaKar",
      matchesPlayed: 2,
      wins: 1,
      draws: 0,
      losses: 1,
      goalsScored: 10,
      goalsConceded: 7,
      goalDifference: 3,
      points: 3,
    },
    {
      team: "Ali Shafiee",
      matchesPlayed: 5,
      wins: 5,
      draws: 0,
      losses: 0,
      goalsScored: 23,
      goalsConceded: 9,
      goalDifference: 14,
      points: 15,
    },
  ],
};

// EDITABLE KNOCKOUT STAGE DATA - Modify scores to update winners
// Note: Winners are calculated automatically based on scores
// Set both scores to null for matches that haven't been played yet
const initialKnockoutData = {
  quarterFinals: [
    {
      id: "qf1",
      team1: null,
      team2: null,
      score1: 2,
      score2: 1,
    }, // 1st Group A vs 4th Group B
    {
      id: "qf2",
      team1: null,
      team2: null,
      score1: 3,
      score2: 1,
    }, // 1st Group B vs 4th Group A
    {
      id: "qf3",
      team1: null,
      team2: null,
      score1: 1,
      score2: 0,
    }, // 2nd Group A vs 3rd Group B
    {
      id: "qf4",
      team1: null,
      team2: null,
      score1: 2,
      score2: 2,
    }, // 2nd Group B vs 3rd Group A (penalties: team1 wins)
  ],
  semiFinals: [
    {
      id: "sf1",
      team1: null,
      team2: null,
      score1: 2,
      score2: 1,
    }, // Winner QF1 vs Winner QF3
    {
      id: "sf2",
      team1: null,
      team2: null,
      score1: 1,
      score2: 0,
    }, // Winner QF2 vs Winner QF4
  ],
  final: {
    id: "f",
    team1: null,
    team2: null,
    score1: 3,
    score2: 2,
  }, // Winner SF1 vs Winner SF2
};

export default function Home() {
 const [tournamentData] = useState(initialTournamentData);
  const [knockoutData] = useState(initialKnockoutData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-slate-800 mb-2">
            Football Tournament
          </h1>
          <p className="text-slate-600">
            Group Stage Results - Top 4 Teams Qualify for
            Knockout Stage
          </p>
        </div>

        {/* Groups Container */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Group A */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="mb-6">
              <h2 className="text-blue-600">Group A</h2>
              <p className="text-slate-500">
                Top 4 teams highlighted in green
              </p>
            </div>
            <TournamentTable teams={tournamentData.groupA} />
          </div>

          {/* Group B */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="mb-6">
              <h2 className="text-blue-600">Group B</h2>
              <p className="text-slate-500">
                Top 4 teams highlighted in green
              </p>
            </div>
            <TournamentTable teams={tournamentData.groupB} />
          </div>
        </div>

        {/* Knockout Stage
        <div className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-slate-800 mb-2">
              Knockout Stage
            </h2>
            <p className="text-slate-600">
              Single Elimination - 8 Qualified Teams
            </p>
          </div>
          <KnockoutBracket
            groupATeams={tournamentData.groupA}
            groupBTeams={tournamentData.groupB}
            knockoutData={knockoutData}
          />
        </div> */}

        {/* Legend */}
        {/* <div className="mt-8 bg-white rounded-xl shadow-lg p-6 max-w-3xl mx-auto">
          <h3 className="text-slate-800 mb-4">Table Legend</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-slate-600">MP:</span>
                <span className="text-slate-800">
                  Matches Played
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-600">W:</span>
                <span className="text-slate-800">Wins</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-600">D:</span>
                <span className="text-slate-800">Draws</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-600">L:</span>
                <span className="text-slate-800">Losses</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-slate-600">GS:</span>
                <span className="text-slate-800">
                  Goals Scored
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-600">GC:</span>
                <span className="text-slate-800">
                  Goals Conceded
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-600">GD:</span>
                <span className="text-slate-800">
                  Goal Difference
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-600">Pts:</span>
                <span className="text-slate-800">Points</span>
              </div>
            </div>
          </div>
        </div> */}

      </div>
    </div>
  );
}