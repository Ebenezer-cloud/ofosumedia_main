document.addEventListener('DOMContentLoaded', () => {
  fetchRSSNews();
});

async function fetchRSSNews() {
  const RSS_URL = 'https://feeds.bbci.co.uk/news/world/rss.xml';
  const API_ENDPOINT = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;
  const container = document.getElementById('news-container');

  try {
    const response = await fetch(API_ENDPOINT);
    const data = await response.json();

    if (data.status === 'ok') {
      container.innerHTML = ''; // Clear loading state
      
      data.items.slice(0, 6).forEach(item => {
        const pubDate = new Date(item.pubDate).toLocaleDateString(undefined, {
          month: 'short', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit'
        });

        const articleCard = `
          <article class="bg-brand-card border border-slate-800 p-6 rounded-xl hover:border-slate-700 transition flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span class="text-brand-accent font-semibold">BBC World News</span>
                <span>${pubDate}</span>
              </div>
              <h3 class="text-white font-bold text-base mb-2 line-clamp-2">${item.title}</h3>
              <p class="text-slate-400 text-sm line-clamp-3 mb-4">${item.description.replace(/<[^>]*>?/gm, '')}</p>
            </div>
            <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="text-brand-red hover:underline text-xs font-bold inline-flex items-center">
              Read Full Article <i class="fa-solid fa-arrow-up-right-from-square ml-1 text-[10px]"></i>
            </a>
          </article>
        `;
        container.insertAdjacentHTML('beforeend', articleCard);
      });
    } else {
      throw new Error('RSS parsing failed');
    }
  } catch (error) {
    console.error('News Feed Error:', error);
    container.innerHTML = `
      <div class="col-span-full bg-slate-800/50 p-6 rounded-xl border border-slate-700 text-center text-slate-400">
        Unable to load news feed at this time.
      </div>
    `;
  }
}