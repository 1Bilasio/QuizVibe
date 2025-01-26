// Example dynamic data for achievements and leaderboard
const achievements = [
    "🏆 Level 10 Achiever",
    "🥇 Top 5% in Monthly Challenge",
    "🎯 Completed 50+ Tasks",
    "🎮 Game Master – 100 Wins",
];

const leaderboard = [
    { rank: 1, username: "Sir Bilasio", points: 1200 },
    { rank: 2, username: "Eunice", points: 1150 },
    { rank: 3, username: "Alex", points: 1100 },
];

// Populating Achievements
const achievementsList = document.getElementById('achievements-list');
achievements.forEach(achievement => {
    const li = document.createElement('li');
    li.textContent = achievement;
    achievementsList.appendChild(li);
});

// Populating Leaderboard
const leaderboardTable = document.getElementById('leaderboard');
leaderboard.forEach(entry => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${entry.rank}</td><td>${entry.username}</td><td>${entry.points}</td>`;
    leaderboardTable.appendChild(tr);
});