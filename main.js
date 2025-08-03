function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.style.display = 'none';
  });
  document.getElementById(tabId).style.display = 'block';
}

function saveProject() {
  const data = {
    scripts: document.getElementById('scripts').innerHTML,
    dialogue: document.getElementById('dialogue').innerHTML,
    objects: document.getElementById('objects').innerHTML
  };

  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'project.json';
  a.click();
}

function loadProject(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const data = JSON.parse(e.target.result);
      if (data.scripts) document.getElementById('scripts').innerHTML = data.scripts;
      if (data.dialogue) document.getElementById('dialogue').innerHTML = data.dialogue;
      if (data.objects) document.getElementById('objects').innerHTML = data.objects;
      alert("Project loaded successfully!");
    } catch (err) {
      alert("Failed to load project: " + err.message);
    }
  };
  reader.readAsText(file);
}
