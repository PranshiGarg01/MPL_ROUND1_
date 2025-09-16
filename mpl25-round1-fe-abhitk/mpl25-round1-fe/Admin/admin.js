const modal = document.getElementById("editModal");
    const deleteModal = document.getElementById("deleteModal");
    const teamNameInput = document.getElementById("teamName");
    const teamPointsInput = document.getElementById("teamPoints");
    const teamIdInput = document.getElementById("teamId");

    function openModal(button) {
      const name = button.getAttribute("data-name");
      const points = button.getAttribute("data-points");
      const id = button.getAttribute("data-id");

      teamNameInput.value = name;
      teamPointsInput.value = points;
      teamIdInput.value = id;

      modal.style.display = "flex";
    }

    function closeModal() {
      modal.style.display = "none";
    }

    function confirmDelete() {
      modal.style.display = "none";
      deleteModal.style.display = "flex";
    }

    function closeDeleteModal() {
      deleteModal.style.display = "none";
    }

    function addTeam() {
      alert("Adding new team: " + teamNameInput.value);
      closeModal();
    }

    function editTeam() {
      alert("Editing team " + teamIdInput.value + ": " + teamNameInput.value + " with " + teamPointsInput.value + " points");
      closeModal();
    }

    function deleteTeam() {
      alert("Deleted team " + teamIdInput.value);
      closeDeleteModal();
    }

    function sortTeams() {
      alert("Sorting teams by points...");
      // Here you'd implement sorting logic
    }

    // Close modals on outside click
    window.onclick = function(e) {
      if (e.target == modal) closeModal();
      if (e.target == deleteModal) closeDeleteModal();
    }