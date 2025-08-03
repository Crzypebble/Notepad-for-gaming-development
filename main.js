function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.style.display = 'none';
  });
  document.getElementById(tabId).style.display = 'block';
}

function saveProject() {
  const tabIds = ['story', 'settings', 'controls', 'features', 'locations', 'npcs', 'music', 'systems'];
  const data = {};

  tabIds.forEach(id => {
    data[id] = document.getElementById(id).innerHTML;
  });

  const projectName = document.getElementById('projectName').value.trim() || 'game-design-project';
  const safeName = projectName.replace(/[^a-z0-9-_]/gi, '_').toLowerCase();

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${safeName}.json`;
  a.click();
}

function loadProject(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const data = JSON.parse(e.target.result);
      for (const [id, content] of Object.entries(data)) {
        const section = document.getElementById(id);
        if (section) section.innerHTML = content;
      }
      alert("Project loaded successfully!");
    } catch (err) {
      alert("Failed to load project: " + err.message);
    }
  };
  reader.readAsText(file);
}

function clearAll() {
  const tabIds = ['story', 'settings', 'controls', 'features', 'locations', 'npcs', 'music', 'systems'];
  tabIds.forEach(id => {
    document.getElementById(id).innerHTML = '';
  });
}
