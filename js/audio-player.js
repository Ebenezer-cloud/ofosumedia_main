document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('radio-stream-audio');
  const playBtns = document.querySelectorAll('.trigger-stream-play');
  const stickyPlayBtn = document.getElementById('sticky-play-btn');
  const playIcon = document.getElementById('sticky-play-icon');
  const statusBadge = document.getElementById('stream-status-badge');

  if (!audio) return;

  function togglePlay() {
    if (audio.paused) {
      audio.play().then(() => {
        if (playIcon) playIcon.className = 'fa-solid fa-pause';
        if (statusBadge) {
          statusBadge.className = 'badge bg-danger';
          statusBadge.textContent = 'LIVE';
        }
      }).catch(err => {
        console.error('Playback error or invalid stream URL:', err);
        if (statusBadge) {
          statusBadge.className = 'badge bg-warning text-dark';
          statusBadge.textContent = 'ERROR';
        }
      });
    } else {
      audio.pause();
      if (playIcon) playIcon.className = 'fa-solid fa-play';
      if (statusBadge) {
        statusBadge.className = 'badge bg-secondary';
        statusBadge.textContent = 'PAUSED';
      }
    }
  }

  if (stickyPlayBtn) stickyPlayBtn.addEventListener('click', togglePlay);
  
  playBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      togglePlay();
    });
  });
});