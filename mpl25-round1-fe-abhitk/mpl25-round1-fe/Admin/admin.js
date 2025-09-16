const modal = document.getElementById("editModal");
const deleteModal = document.getElementById("deleteModal");
const teamNameInput = document.getElementById("teamName");
const teamPointsInput = document.getElementById("teamPoints");
const teamIdInput = document.getElementById("teamId");
const leaderboardRows = document.getElementById("leaderboardRows");

// 🔹 Fake backend data (mock API)
let teams = [
  { id: 1, name: "Dragons", points: 45 },
  { id: 2, name: "Tigers", points: 38 },
  { id: 3, name: "Sharks", points: 52 },
  { id: 4, name: "Wolves", points: 29 },
];

// 🔹 Simulate backend fetch
async function loadTeams() {
  // simulate small delay like API
  await new Promise(r => setTimeout(r, 200));
  renderLeaderboard();
}

// 🔹 Render leaderboard rows
function renderLeaderboard() {
  leaderboardRows.innerHTML = "";

  teams.forEach((team, index) => {
    const row = document.createElement("div");
    row.className = "leaderboard-row";
    if (index === 0) row.classList.add("first");
    if (index === 1) row.classList.add("second");
    if (index === 2) row.classList.add("third");

    row.innerHTML = `
      <span class="serial-col">${index + 1}</span>
      <span class="team-col">${team.name}</span>
      <span class="points-col">${team.points}</span>
      <span class="actions-col">
        <button class="plus-btn"
          data-id="${team.id}"
          data-name="${team.name}"
          data-points="${team.points}"
          onclick="openModal(this)">✎</button>
      </span>
    `;

    leaderboardRows.appendChild(row);
  });
}

// 🔹 Open edit modal
function openModal(button) {
  const id = button.getAttribute("data-id");
  const name = button.getAttribute("data-name");
  const points = button.getAttribute("data-points");

  teamIdInput.value = id;
  teamNameInput.value = name;
  teamPointsInput.value = points;

  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}

// 🔹 Confirm delete modal
function confirmDelete() {
  modal.style.display = "none";
  deleteModal.style.display = "flex";
}

function closeDeleteModal() {
  deleteModal.style.display = "none";
}

// 🔹 Edit team (mock PUT)
async function editTeam() {
  const id = parseInt(teamIdInput.value);
  const newName = teamNameInput.value;
  const newPoints = teamPointsInput.value ? parseInt(teamPointsInput.value) : null;

  // simulate backend update
  teams = teams.map(team =>
    team.id === id
      ? {
          ...team,
          name: newName || team.name,
          points: newPoints !== null ? newPoints : team.points
        }
      : team
  );

  closeModal();
  loadTeams();
}

// 🔹 Delete team (mock DELETE)
async function deleteTeam() {
  const id = parseInt(teamIdInput.value);

  // simulate backend delete
  teams = teams.filter(team => team.id !== id);

  closeDeleteModal();
  loadTeams();
}

// 🔹 Sort teams by points
function sortTeams() {
  teams.sort((a, b) => b.points - a.points);
  renderLeaderboard();
}

// 🔹 Close modals on outside click
window.onclick = function(e) {
  if (e.target === modal) closeModal();
  if (e.target === deleteModal) closeDeleteModal();
};

// 🔹 Auto-load leaderboard on page load
document.addEventListener("DOMContentLoaded", loadTeams);
