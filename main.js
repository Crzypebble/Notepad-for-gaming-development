function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.style.display = 'none';
  });
  document.getElementById(tabId).style.display = 'block';
}

function saveProject() {
  const data = {
    story: document.getElementById('story').innerHTML,
    settings: document.getElementById('settings').innerHTML,
    controls: document.getElementById('controls').innerHTML,
    features: document.getElementById('features').innerHTML,
    locations: document.getElementById('locations').innerHTML,
    npcs: document.getElementById('npcs').innerHTML
  };

  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'game_project.json';
  a.click();
}

function loadProject(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const data = JSON.parse(e.target.result);
      if (data.story) document.getElementById('story').innerHTML = data.story;
      if (data.settings) document.getElementById('settings').innerHTML = data.settings;
      if (data.controls) document.getElementById('controls').innerHTML = data.controls;
      if (data.features) document.getElementById('features').innerHTML = data.features;
      if (data.locations) document.getElementById('locations').innerHTML = data.locations;
      if (data.npcs) document.getElementById('npcs').innerHTML = data.npcs;
      alert("Project loaded successfully!");
    } catch (err) {
      alert("Failed to load project: " + err.message);
    }
  };
  reader.readAsText(file);
}

function clearAll() {
  ['story', 'settings', 'controls', 'features', 'locations', 'npcs'].forEach(id => {
    document.getElementById(id).innerHTML = '';
  });
}
