const USER_ID = '1457391233663242277';

  const statusColors = {
    online: '#23a55a',
    idle: '#f0b232',
    dnd: '#f23f43',
    offline: '#80848e'
  };

  async function fetchDiscordStatus() {
    try {
      const response = await fetch(`https://api.lanyard.rest/v1/users/${USER_ID}`);
      const { data } = await response.json();

      document.getElementById('discord-username').innerText = data.discord_user.global_name || data.discord_user.username;

      const status = data.discord_status;
      document.getElementById('status-dot').style.background = statusColors[status] || statusColors.offline;

      const activityEl = document.getElementById('discord-activity');
      if (data.listening_to_spotify) {
        activityEl.innerText = `Hört Spotify: ${data.spotify.song} – ${data.spotify.artist}`;
      } else if (data.activities && data.activities.length > 0) {
        const game = data.activities.find(a => a.type === 0);
        const custom = data.activities.find(a => a.type === 4);
        
        if (game) {
          activityEl.innerText = `Spielt ${game.name}`;
        } else if (custom && custom.state) {
          activityEl.innerText = custom.state;
        } else {
          activityEl.innerText = '';
        }
      } else {
        activityEl.innerText = '';
      }
    } catch (error) {
      console.error('Fehler beim Laden des Discord-Status:', error);
    }
  }

  fetchDiscordStatus();
  setInterval(fetchDiscordStatus, 15000);