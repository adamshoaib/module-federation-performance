class Monitor {
  constructor() {
    this.metrics = {
      fps: 0,
    };
  }

  start() {
    this.calculateFPS();
    setInterval(() => {
      this.updateMetrics();
    }, 200);
  }

  createMonitorElement() {
    const monitorElement = document.createElement("div");
    monitorElement.className = "performance-monitor";
    monitorElement.id = "performance-monitor";
    monitorElement.innerHTML = `
          <div><span>FPS:</span><span id="fps">${this.metrics.fps}</span></div>
        `;
    document.body.appendChild(monitorElement);
  }

  updateMetrics() {
    if (document.getElementById("performance-monitor")) {
      document.getElementById("fps").innerText = this.metrics.fps;
    } else {
      this.createMonitorElement();
      this.updateMetrics();
    }
  }

  calculateFPS() {
    let last = Date.now();
    let ticks = 0;
    function rafLoop() {
      ticks += 1;
      if (ticks >= 30) {
        const now = Date.now();
        const diff = now - last;
        const fps = Math.round(1000 / (diff / ticks));
        last = now;
        ticks = 0;
        renderFps(fps);
      }
      requestAnimationFrame(rafLoop);
    }

    const renderFps = (fps) => {
      this.metrics.fps = fps;
    };

    rafLoop();
  }
}

export default Monitor;
