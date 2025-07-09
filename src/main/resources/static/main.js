function addProcess() {
    const container = document.getElementById('processContainer');
    const div = document.createElement('div');
    div.className = 'process';
    div.innerHTML = `
      <input type="text" placeholder="PID" class="pid" required />
      <input type="number" placeholder="Arrival Time" class="arrival" required />
      <input type="number" placeholder="Burst Time" class="burst" required />
      <input type="number" placeholder="Priority (optional)" class="priority" />
    `;
    container.appendChild(div);
  }
  
  document.getElementById('processForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const algorithm = document.getElementById('algorithm').value;
    const quantum = document.getElementById('quantum').value;
  
    const processElements = document.querySelectorAll('.process');
    const processes = [];
  
    processElements.forEach(p => {
      processes.push({
        pid: p.querySelector('.pid').value,
        arrivalTime: parseInt(p.querySelector('.arrival').value),
        burstTime: parseInt(p.querySelector('.burst').value),
        priority: parseInt(p.querySelector('.priority').value) || 0
      });
    });
  
    let url = `/api/scheduler/${algorithm}`;
    if (algorithm === 'rr') {
      url += `?quantum=${quantum}`;
    }
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(processes)
    })
    .then(res => res.json())
    .then(data => {
      let html = "<h2>Simulation Result:</h2><ul>";
      data.forEach(p => {
        html += `<li>PID: ${p.pid} | Waiting Time: ${p.waitingTime} | Turnaround Time: ${p.turnaroundTime}</li>`;
      });
      html += "</ul>";
      document.getElementById('output').innerHTML = html;
    })
    .catch(err => {
      document.getElementById('output').innerText = "Error: " + err.message;
    });
  });
  