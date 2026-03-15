// ============================================
// Trinity Finance — Interactive Dashboard
// ============================================

const FINNHUB_KEY = 'd6ep8bhr01qksaq9dcb0d6ep8bhr01qksaq9dcbg';
const FINNHUB_BASE = 'https://finnhub.io/api/v1';

// --- Stock Logo Domains ---
const STOCK_LOGOS = {
  NVDA: 'nvidia.com', AAPL: 'apple.com', MSFT: 'microsoft.com', AMZN: 'amazon.com',
  GOOGL: 'google.com', META: 'meta.com', TSLA: 'tesla.com', 'BRK.B': 'berkshirehathaway.com',
  JPM: 'jpmorganchase.com', V: 'visa.com', UNH: 'unitedhealthgroup.com', XOM: 'exxonmobil.com',
  LLY: 'lilly.com', JNJ: 'jnj.com', AVGO: 'broadcom.com', PG: 'pg.com',
  MA: 'mastercard.com', HD: 'homedepot.com', COST: 'costco.com', NFLX: 'netflix.com',
  CRM: 'salesforce.com', AMD: 'amd.com', WMT: 'walmart.com', DIS: 'disney.com',
  MU: 'micron.com', CVX: 'chevron.com', BAC: 'bankofamerica.com', WFC: 'wellsfargo.com',
  ABT: 'abbott.com', CAT: 'caterpillar.com', GE: 'ge.com', RTX: 'rtx.com',
  BTC: 'bitcoin.org', ETH: 'ethereum.org', SOL: 'solana.com', BNB: 'bnbchain.org',
};

function getStockLogo(symbol, size) {
  size = size || 36;
  const domain = STOCK_LOGOS[symbol];
  if (domain) {
    return `<img src="https://logo.clearbit.com/${domain}" alt="${symbol}" width="${size}" height="${size}" style="border-radius:6px;object-fit:contain;background:var(--bg-tertiary)" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><span class="stock-logo-fallback" style="display:none;width:${size}px;height:${size}px;border-radius:6px;background:var(--bg-tertiary);border:1px solid var(--border-color);align-items:center;justify-content:center;font-weight:700;font-size:${Math.round(size*0.33)}px;color:var(--text-secondary)">${symbol.slice(0,2)}</span>`;
  }
  return `<span style="display:flex;width:${size}px;height:${size}px;border-radius:6px;background:var(--bg-tertiary);border:1px solid var(--border-color);align-items:center;justify-content:center;font-weight:700;font-size:${Math.round(size*0.33)}px;color:var(--text-secondary)">${symbol.slice(0,2)}</span>`;
}

// --- Mock Data (fallback) ---
const MARKET_DATA = {
  us: [
    { name: 'S&P 500', symbol: 'SPX', value: 5892.34, change: 72.41, pctChange: 1.24 },
    { name: 'NASDAQ', symbol: 'IXIC', value: 19234.56, change: 245.89, pctChange: 1.29 },
    { name: 'DOW', symbol: 'DJI', value: 43521.78, change: 312.56, pctChange: 0.72 },
    { name: 'VIX', symbol: 'VIX', value: 14.23, change: -1.45, pctChange: -9.25 },
  ],
  crypto: [
    { name: 'Bitcoin', symbol: 'BTC', value: 71042.50, change: 1285.30, pctChange: 1.84 },
    { name: 'Ethereum', symbol: 'ETH', value: 2087.15, change: -24.50, pctChange: -1.16 },
    { name: 'Solana', symbol: 'SOL', value: 148.72, change: 5.63, pctChange: 3.93 },
    { name: 'BNB', symbol: 'BNB', value: 612.40, change: -8.20, pctChange: -1.32 },
  ],
  global: [
    { name: 'FTSE 100', symbol: 'FTSE', value: 8421.63, change: 45.12, pctChange: 0.54 },
    { name: 'Nikkei 225', symbol: 'N225', value: 38912.45, change: -234.67, pctChange: -0.60 },
    { name: 'DAX', symbol: 'DAX', value: 18234.89, change: 112.34, pctChange: 0.62 },
    { name: 'Shanghai', symbol: 'SSEC', value: 3089.56, change: -12.45, pctChange: -0.40 },
  ]
};

let currentMarketTab = 'us';

const STOCKS = [
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: 924.56, change: 38.72, pctChange: 4.37, volume: '52.3M', mcap: '2.28T', mcapVal: 2280, sector: 'Technology', subsector: 'Semiconductors' },
  { symbol: 'AAPL', name: 'Apple Inc', price: 213.45, change: -4.72, pctChange: -2.21, volume: '48.1M', mcap: '3.28T', mcapVal: 3280, sector: 'Technology', subsector: 'Consumer Electronics' },
  { symbol: 'MSFT', name: 'Microsoft Corp', price: 445.67, change: -7.05, pctChange: -1.57, volume: '22.7M', mcap: '3.31T', mcapVal: 3310, sector: 'Technology', subsector: 'Software - Infrastructure' },
  { symbol: 'AMZN', name: 'Amazon.com Inc', price: 198.23, change: -1.77, pctChange: -0.89, volume: '35.4M', mcap: '2.04T', mcapVal: 2040, sector: 'Consumer Cyclical', subsector: 'Specialty Retail' },
  { symbol: 'GOOGL', name: 'Alphabet Inc', price: 175.89, change: -0.74, pctChange: -0.42, volume: '20.1M', mcap: '2.17T', mcapVal: 2170, sector: 'Communication Services', subsector: 'Internet Content' },
  { symbol: 'META', name: 'Meta Platforms', price: 567.12, change: -21.73, pctChange: -3.83, volume: '18.9M', mcap: '1.44T', mcapVal: 1440, sector: 'Communication Services', subsector: 'Internet Content' },
  { symbol: 'TSLA', name: 'Tesla Inc', price: 312.34, change: -3.00, pctChange: -0.96, volume: '67.2M', mcap: '993B', mcapVal: 993, sector: 'Consumer Cyclical', subsector: 'Auto Manufacturers' },
  { symbol: 'BRK.B', name: 'Berkshire Hathaway', price: 456.78, change: -1.60, pctChange: -0.35, volume: '3.4M', mcap: '1.00T', mcapVal: 1000, sector: 'Financial Services', subsector: 'Insurance - Diversified' },
  { symbol: 'JPM', name: 'JPMorgan Chase', price: 234.56, change: 0.44, pctChange: 0.19, volume: '8.9M', mcap: '678B', mcapVal: 678, sector: 'Financial Services', subsector: 'Banks - Diversified' },
  { symbol: 'V', name: 'Visa Inc', price: 312.89, change: 0.65, pctChange: 0.21, volume: '6.2M', mcap: '612B', mcapVal: 612, sector: 'Financial Services', subsector: 'Financial - Credit Serv' },
  { symbol: 'UNH', name: 'UnitedHealth Group', price: 534.12, change: 9.72, pctChange: 1.82, volume: '4.1M', mcap: '492B', mcapVal: 492, sector: 'Healthcare', subsector: 'Medical - Health Ins' },
  { symbol: 'XOM', name: 'Exxon Mobil', price: 112.34, change: 1.90, pctChange: 1.69, volume: '12.8M', mcap: '468B', mcapVal: 468, sector: 'Energy', subsector: 'Oil & Gas Integrated' },
  { symbol: 'LLY', name: 'Eli Lilly', price: 823.45, change: 6.58, pctChange: 0.80, volume: '5.6M', mcap: '782B', mcapVal: 782, sector: 'Healthcare', subsector: 'Drug Manufacturers' },
  { symbol: 'JNJ', name: 'Johnson & Johnson', price: 156.78, change: -0.33, pctChange: -0.21, volume: '7.3M', mcap: '378B', mcapVal: 378, sector: 'Healthcare', subsector: 'Drug Manufacturers' },
  { symbol: 'AVGO', name: 'Broadcom Inc', price: 178.92, change: -7.35, pctChange: -4.11, volume: '14.2M', mcap: '830B', mcapVal: 830, sector: 'Technology', subsector: 'Semiconductors' },
  { symbol: 'PG', name: 'Procter & Gamble', price: 167.34, change: 0.15, pctChange: 0.09, volume: '5.8M', mcap: '394B', mcapVal: 394, sector: 'Consumer Defensive', subsector: 'Household & Personal' },
  { symbol: 'MA', name: 'Mastercard Inc', price: 523.45, change: 3.21, pctChange: 0.62, volume: '3.1M', mcap: '497B', mcapVal: 497, sector: 'Financial Services', subsector: 'Financial - Credit Serv' },
  { symbol: 'HD', name: 'Home Depot', price: 412.56, change: 0.12, pctChange: 0.03, volume: '4.5M', mcap: '409B', mcapVal: 409, sector: 'Consumer Cyclical', subsector: 'Home Improvement' },
  { symbol: 'COST', name: 'Costco', price: 912.34, change: 4.74, pctChange: 0.52, volume: '2.3M', mcap: '405B', mcapVal: 405, sector: 'Consumer Defensive', subsector: 'Discount Stores' },
  { symbol: 'NFLX', name: 'Netflix Inc', price: 789.12, change: 8.38, pctChange: 1.06, volume: '9.7M', mcap: '341B', mcapVal: 341, sector: 'Communication Services', subsector: 'Entertainment' },
  { symbol: 'CRM', name: 'Salesforce Inc', price: 312.45, change: -4.56, pctChange: -1.44, volume: '6.4M', mcap: '302B', mcapVal: 302, sector: 'Technology', subsector: 'Software - Application' },
  { symbol: 'AMD', name: 'AMD Inc', price: 178.34, change: 5.67, pctChange: 3.28, volume: '45.6M', mcap: '288B', mcapVal: 288, sector: 'Technology', subsector: 'Semiconductors' },
  { symbol: 'WMT', name: 'Walmart Inc', price: 89.12, change: 0.85, pctChange: 0.95, volume: '11.2M', mcap: '577B', mcapVal: 577, sector: 'Consumer Defensive', subsector: 'Discount Stores' },
  { symbol: 'DIS', name: 'Walt Disney', price: 112.67, change: -1.23, pctChange: -1.08, volume: '8.4M', mcap: '206B', mcapVal: 206, sector: 'Communication Services', subsector: 'Entertainment' },
  { symbol: 'MU', name: 'Micron Technology', price: 98.45, change: 5.05, pctChange: 5.13, volume: '32.1M', mcap: '108B', mcapVal: 108, sector: 'Technology', subsector: 'Semiconductors' },
  { symbol: 'CVX', name: 'Chevron Corp', price: 158.90, change: -0.13, pctChange: -0.08, volume: '7.2M', mcap: '290B', mcapVal: 290, sector: 'Energy', subsector: 'Oil & Gas Integrated' },
  { symbol: 'BAC', name: 'Bank of America', price: 38.45, change: -0.34, pctChange: -0.87, volume: '34.5M', mcap: '298B', mcapVal: 298, sector: 'Financial Services', subsector: 'Banks - Diversified' },
  { symbol: 'WFC', name: 'Wells Fargo', price: 62.12, change: -0.35, pctChange: -0.57, volume: '15.8M', mcap: '212B', mcapVal: 212, sector: 'Financial Services', subsector: 'Banks - Diversified' },
  { symbol: 'ABT', name: 'Abbott Labs', price: 112.34, change: 1.12, pctChange: 1.01, volume: '5.2M', mcap: '194B', mcapVal: 194, sector: 'Healthcare', subsector: 'Medical Devices' },
  { symbol: 'CAT', name: 'Caterpillar Inc', price: 345.67, change: -3.33, pctChange: -0.96, volume: '3.8M', mcap: '168B', mcapVal: 168, sector: 'Industrials', subsector: 'Agricultural Machinery' },
  { symbol: 'GE', name: 'GE Aerospace', price: 189.45, change: -4.34, pctChange: -2.29, volume: '6.1M', mcap: '205B', mcapVal: 205, sector: 'Industrials', subsector: 'Aerospace & Defense' },
  { symbol: 'RTX', name: 'RTX Corp', price: 112.89, change: 0.82, pctChange: 0.73, volume: '4.7M', mcap: '148B', mcapVal: 148, sector: 'Industrials', subsector: 'Aerospace & Defense' },
];

const HOLDINGS = [
  { symbol: 'NVDA', name: 'NVIDIA Corp', shares: 50, avgCost: 680.00, currentPrice: 924.56 },
  { symbol: 'AAPL', name: 'Apple Inc', shares: 100, avgCost: 175.00, currentPrice: 213.45 },
  { symbol: 'MSFT', name: 'Microsoft Corp', shares: 30, avgCost: 380.00, currentPrice: 445.67 },
  { symbol: 'GOOGL', name: 'Alphabet Inc', shares: 80, avgCost: 140.00, currentPrice: 175.89 },
  { symbol: 'META', name: 'Meta Platforms', shares: 25, avgCost: 420.00, currentPrice: 567.12 },
  { symbol: 'AMZN', name: 'Amazon.com Inc', shares: 40, avgCost: 155.00, currentPrice: 198.23 },
  { symbol: 'NFLX', name: 'Netflix Inc', shares: 15, avgCost: 580.00, currentPrice: 789.12 },
];

const EARNINGS = [
  { symbol: 'AAPL', name: 'Apple Inc', date: 'Mar 18', time: 'AMC', estEPS: '$2.35', estRev: '$124.3B', status: 'upcoming' },
  { symbol: 'NVDA', name: 'NVIDIA Corp', date: 'Mar 19', time: 'AMC', estEPS: '$0.89', estRev: '$38.5B', status: 'upcoming' },
  { symbol: 'GOOGL', name: 'Alphabet Inc', date: 'Mar 20', time: 'AMC', estEPS: '$2.12', estRev: '$96.2B', status: 'upcoming' },
  { symbol: 'MSFT', name: 'Microsoft Corp', date: 'Mar 17', time: 'AMC', actEPS: '$3.23', estEPS: '$3.11', actRev: '$69.8B', estRev: '$68.5B', status: 'reported', beat: true },
  { symbol: 'META', name: 'Meta Platforms', date: 'Mar 17', time: 'AMC', actEPS: '$6.29', estEPS: '$5.89', actRev: '$42.3B', estRev: '$41.2B', status: 'reported', beat: true },
  { symbol: 'AMZN', name: 'Amazon.com', date: 'Mar 18', time: 'BMO', estEPS: '$1.45', estRev: '$187.3B', status: 'upcoming' },
  { symbol: 'TSLA', name: 'Tesla Inc', date: 'Mar 16', time: 'AMC', actEPS: '$0.73', estEPS: '$0.81', actRev: '$25.1B', estRev: '$26.3B', status: 'reported', beat: false },
  { symbol: 'JPM', name: 'JPMorgan Chase', date: 'Mar 19', time: 'BMO', estEPS: '$4.78', estRev: '$44.1B', status: 'upcoming' },
];

const HEATMAP_SECTORS = {
  'Technology': { change: -0.75, stocks: ['NVDA', 'AAPL', 'MSFT', 'AVGO', 'AMD', 'MU', 'CRM'] },
  'Consumer Cyclical': { change: -0.59, stocks: ['AMZN', 'TSLA', 'HD'] },
  'Financial Services': { change: 0.12, stocks: ['BRK.B', 'JPM', 'V', 'MA', 'BAC', 'WFC'] },
  'Consumer Defensive': { change: 0.58, stocks: ['WMT', 'COST', 'PG'] },
  'Healthcare': { change: -0.25, stocks: ['LLY', 'JNJ', 'UNH', 'ABT'] },
  'Communication Services': { change: -0.71, stocks: ['GOOGL', 'META', 'NFLX', 'DIS'] },
  'Energy': { change: 0.33, stocks: ['XOM', 'CVX'] },
  'Industrials': { change: -0.36, stocks: ['CAT', 'GE', 'RTX'] },
};

const MARKET_HEADLINES = [
  {
    title: 'Crude Oil Surges 3.11% to $98.71 — Iran War Drives Historic Supply Disruption',
    body: 'Crude oil has surged over 40% in just 15 days since the U.S.-Israel conflict with Iran began on February 28, with Brent briefly topping $100 a barrel. Iran\'s de facto blockade of the Strait of Hormuz has stranded roughly 9-10 million barrels per day of Gulf supply.',
    sentiment: 'bearish'
  },
  {
    title: 'S&P 500 Hits 2026 Low as Equities Break Key Technical Levels',
    body: 'The S&P 500 fell 1.4% to close at 5,638, breaking below its 200-day moving average for the first time since October 2023. Market breadth deteriorated sharply with declining stocks outnumbering advancers 3-to-1 on the NYSE.',
    sentiment: 'bearish'
  },
  {
    title: 'Bitcoin Holds at ~$71K, Outperforming S&P 500, Nasdaq, and Gold Since War\'s Start',
    body: 'Bitcoin has held steady at $71,000 despite broad equity selloffs, cementing its role as a macro hedge. Since the Iran conflict began, BTC is up 8.2% vs S&P -6.4% and gold +4.1%.',
    sentiment: 'bullish'
  },
  {
    title: 'EUR/USD Slips 0.39% to $1.15 as Dollar Strengthens on Geopolitical Risk',
    body: 'The U.S. dollar index rose 0.5% as investors rotated into safe-haven assets. EUR/USD dropped to its lowest level in two weeks amid risk-off flows.',
    sentiment: 'bearish'
  },
  {
    title: 'Ethereum Drops 1.16% to $2,087 Amid Broad Crypto Risk-Off Sentiment',
    body: 'ETH underperformed BTC with a 1.16% decline as altcoins faced selling pressure. The ETH/BTC ratio fell to a 3-month low, signaling continued rotation into Bitcoin.',
    sentiment: 'bearish'
  },
  {
    title: 'Fed Rate Decision Looms Large — Markets Eye Dot Plot Amid Stagflation Risk',
    body: 'The Federal Reserve meets next week with markets pricing in an 82% chance of rates held at 5.25-5.50%. Traders are watching the dot plot closely as stagflation risks mount with oil prices elevated.',
    sentiment: 'bearish'
  }
];

// --- Finnhub API ---
async function fetchStockQuote(symbol) {
  const cleanSymbol = symbol.replace('.', '-');
  try {
    const response = await fetch(`${FINNHUB_BASE}/quote?symbol=${cleanSymbol}&token=${FINNHUB_KEY}`);
    if (!response.ok) return null;
    const data = await response.json();
    if (data && data.c > 0) {
      return { currentPrice: data.c, change: data.d, pctChange: data.dp, high: data.h, low: data.l, open: data.o, prevClose: data.pc };
    }
    return null;
  } catch (e) {
    return null;
  }
}

async function fetchRealPrices() {
  const prioritySymbols = ['NVDA', 'AAPL', 'MSFT', 'AMZN', 'GOOGL', 'META', 'TSLA', 'JPM', 'V', 'AMD', 'NFLX', 'UNH', 'XOM', 'LLY', 'MA', 'WMT', 'COST', 'CRM', 'MU', 'HD'];
  const batchSize = 5;
  for (let i = 0; i < prioritySymbols.length; i += batchSize) {
    const batch = prioritySymbols.slice(i, i + batchSize);
    const promises = batch.map(sym => fetchStockQuote(sym).then(data => ({ sym, data })));
    const results = await Promise.all(promises);
    results.forEach(({ sym, data }) => {
      if (data) {
        const stock = STOCKS.find(s => s.symbol === sym);
        if (stock) { stock.price = data.currentPrice; stock.change = data.change || 0; stock.pctChange = data.pctChange || 0; }
        const holding = HOLDINGS.find(h => h.symbol === sym);
        if (holding) { holding.currentPrice = data.currentPrice; }
      }
    });
    if (i + batchSize < prioritySymbols.length) await new Promise(r => setTimeout(r, 300));
  }
  // Re-render current view
  const activePage = document.querySelector('.page.active');
  if (activePage) {
    if (activePage.id === 'page-home') renderTrendingStocks();
    else if (activePage.id === 'page-markets') renderStockTable();
    else if (activePage.id === 'page-watchlist') renderWatchlist();
    else if (activePage.id === 'page-portfolio') renderPortfolio();
  }
}

// --- Utility Functions ---
function generateSparklineData(length, volatility, trend) {
  length = length || 20; volatility = volatility || 0.02; trend = trend || 0;
  const data = [100];
  for (let i = 1; i < length; i++) {
    data.push(data[i - 1] + (Math.random() - 0.5 + trend) * volatility * 100);
  }
  return data;
}

function drawSparkline(canvas, data, color, fillColor) {
  if (!canvas || !data || data.length === 0) return;
  const ctx = canvas.getContext('2d');
  const width = canvas.width = canvas.offsetWidth * 2;
  const height = canvas.height = canvas.offsetHeight * 2;
  ctx.scale(2, 2);
  const w = canvas.offsetWidth;
  const h = canvas.offsetHeight;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  ctx.clearRect(0, 0, w, h);
  if (fillColor) {
    ctx.beginPath(); ctx.moveTo(0, h);
    data.forEach((val, i) => { ctx.lineTo((i / (data.length - 1)) * w, h - ((val - min) / range) * (h - 4) - 2); });
    ctx.lineTo(w, h); ctx.closePath(); ctx.fillStyle = fillColor; ctx.fill();
  }
  ctx.beginPath();
  data.forEach((val, i) => { const x = (i / (data.length - 1)) * w; const y = h - ((val - min) / range) * (h - 4) - 2; i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); });
  ctx.strokeStyle = color; ctx.lineWidth = 1.5; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke();
}

function getHeatmapColor(pctChange) {
  const c = Math.max(-5, Math.min(5, pctChange));
  if (c < 0) { const t = Math.abs(c) / 5; return `rgb(${Math.round(255-t*55)},${Math.round(235-t*155)},${Math.round(235-t*155)})`; }
  if (c > 0) { const t = c / 5; return `rgb(${Math.round(235-t*105)},${Math.round(255-t*55)},${Math.round(235-t*105)})`; }
  return '#e5e5e5';
}

function getHeatmapTextColor(pctChange) { return Math.abs(pctChange) > 3 ? '#fff' : '#1a1a1a'; }

function formatNumber(n) { return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

// Generate sparkline data for all stocks
STOCKS.forEach(s => { s.data = generateSparklineData(20, 0.02, s.pctChange > 0 ? 0.015 : -0.015); });

// --- Render Functions ---
function renderIndexCards(market) {
  market = market || currentMarketTab;
  currentMarketTab = market;
  const indices = MARKET_DATA[market] || MARKET_DATA.us;
  const container = document.getElementById('indexCards');
  indices.forEach(idx => { if (!idx.data) idx.data = generateSparklineData(30, 0.015, idx.pctChange > 0 ? 0.02 : -0.02); });
  container.innerHTML = indices.map(idx => {
    const isPos = idx.change >= 0; const sign = isPos ? '+' : '';
    return `<div class="index-card">
      <div class="index-card-name">${idx.name}</div>
      <div class="index-card-value">${formatNumber(idx.value)}</div>
      <div class="index-card-change ${isPos ? 'positive' : 'negative'}">${sign}${formatNumber(idx.change)} (${sign}${idx.pctChange.toFixed(2)}%)</div>
      <canvas class="index-card-sparkline" data-idx="${idx.symbol}"></canvas>
    </div>`;
  }).join('');
  requestAnimationFrame(() => {
    indices.forEach(idx => {
      const canvas = container.querySelector(`[data-idx="${idx.symbol}"]`);
      const color = idx.change >= 0 ? '#22c55e' : '#ef4444';
      drawSparkline(canvas, idx.data, color, idx.change >= 0 ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)');
    });
  });
  document.querySelectorAll('#marketOverviewTabs .tab').forEach(tab => tab.classList.toggle('active', tab.dataset.marketTab === market));
}

function renderSentimentBar() {
  const container = document.getElementById('sentimentBar');
  let bearish = 0, bullish = 0;
  MARKET_HEADLINES.forEach(h => h.sentiment === 'bearish' ? bearish++ : bullish++);
  const total = bearish + bullish;
  const isBearish = bearish > bullish;
  const ratio = isBearish ? (bearish / total) : (bullish / total);
  let bars = '';
  for (let i = 0; i < 10; i++) {
    const filled = isBearish ? i < Math.round(ratio * 10) : i >= (10 - Math.round(ratio * 10));
    const height = isBearish ? 6 + Math.round((1 - i / 9) * 16) : 6 + Math.round((i / 9) * 16);
    const col = filled ? (isBearish ? 'var(--negative)' : 'var(--positive)') : 'var(--text-muted)';
    bars += `<span class="sentiment-block" style="height:${height}px;background:${col};opacity:${filled ? 1 : 0.25}"></span>`;
  }
  container.innerHTML = `
    <div class="sentiment-indicator"><div class="sentiment-blocks">${bars}</div>
    <span class="sentiment-label" style="color:${isBearish ? 'var(--negative)' : 'var(--positive)'}">${isBearish ? 'Bearish Sentiment' : 'Bullish Sentiment'}</span></div>
    <div class="sentiment-meta">Markets Closed &middot; Mar 14, 2026, EDT</div>`;
}

function renderSummaryAccordion() {
  const container = document.getElementById('summaryAccordion');
  container.innerHTML = MARKET_HEADLINES.map((h, i) => `
    <div class="accordion-item ${i === 0 ? 'open' : ''}">
      <button class="accordion-header" data-accordion="${i}">
        <span class="accordion-sentiment-dot" style="background:${h.sentiment === 'bearish' ? 'var(--negative)' : 'var(--positive)'}"></span>
        <span class="accordion-title">${h.title}</span>
        <svg class="accordion-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="accordion-body"><p>${h.body}</p></div>
    </div>
  `).join('');
  container.querySelectorAll('.accordion-header').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const wasOpen = item.classList.contains('open');
      container.querySelectorAll('.accordion-item').forEach(el => el.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
}

function renderTrendingStocks() {
  const container = document.getElementById('trendingStocks');
  const trending = STOCKS.slice(0, 8);
  container.innerHTML = trending.map(stock => {
    const isPos = stock.change >= 0; const sign = isPos ? '+' : '';
    return `<div class="stock-card">
      <div class="stock-card-header">
        <div class="stock-card-info">
          <div class="stock-logo-wrap">${getStockLogo(stock.symbol, 36)}</div>
          <div><div class="stock-card-symbol">${stock.symbol}</div><div class="stock-card-name">${stock.name}</div></div>
        </div>
        <div class="stock-card-price">
          <div class="stock-card-price-value">$${formatNumber(stock.price)}</div>
          <div class="stock-card-price-change ${isPos ? 'positive' : 'negative'}">${sign}${stock.pctChange.toFixed(2)}%</div>
        </div>
      </div>
      <canvas class="stock-card-sparkline-bg" data-stock="${stock.symbol}"></canvas>
    </div>`;
  }).join('');
  requestAnimationFrame(() => {
    trending.forEach(stock => {
      const canvas = container.querySelector(`[data-stock="${stock.symbol}"]`);
      const color = stock.change >= 0 ? '#22c55e' : '#ef4444';
      drawSparkline(canvas, stock.data, color, stock.change >= 0 ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)');
    });
  });
}

function renderHeatmapFull() {
  const container = document.getElementById('heatmapFull');
  let html = '';
  for (const [sectorName, sectorData] of Object.entries(HEATMAP_SECTORS)) {
    const sectorStocks = sectorData.stocks.map(sym => STOCKS.find(s => s.symbol === sym)).filter(Boolean);
    sectorStocks.sort((a, b) => (b.mcapVal || 0) - (a.mcapVal || 0));
    const sc = sectorData.change;
    const totalMcap = sectorStocks.reduce((sum, s) => sum + (s.mcapVal || 100), 0);
    html += `<div class="treemap-sector"><div class="treemap-sector-header"><span class="treemap-sector-name">${sectorName}</span> <span class="treemap-sector-change" style="color:${sc >= 0 ? 'var(--positive)' : 'var(--negative)'}">${sc >= 0 ? '+' : ''}${sc.toFixed(2)}%</span></div><div class="treemap-sector-grid">`;
    sectorStocks.forEach(stock => {
      const w = (stock.mcapVal || 100) / totalMcap;
      const tc = getHeatmapTextColor(stock.pctChange);
      const cs = stock.pctChange >= 0 ? `+${stock.pctChange.toFixed(2)}%` : `${stock.pctChange.toFixed(2)}%`;
      html += `<div class="treemap-cell" style="background:${getHeatmapColor(stock.pctChange)};flex:${Math.max(1, Math.round(w * 10))};min-width:${Math.max(60, Math.round(w * 400))}px;min-height:${Math.max(50, Math.round(w * 200))}px" title="${stock.name}"><div class="treemap-cell-symbol" style="color:${tc}">${stock.symbol}</div><div class="treemap-cell-change" style="color:${tc}">${cs}</div></div>`;
    });
    html += '</div></div>';
  }
  container.innerHTML = html;
}

let currentMarketFilter = 'all';

function renderStockTable(filter) {
  filter = filter || currentMarketFilter;
  currentMarketFilter = filter;
  const tbody = document.getElementById('stockTableBody');
  let stocks = [...STOCKS];

  if (filter === 'gainers') stocks = stocks.filter(s => s.change > 0).sort((a, b) => b.pctChange - a.pctChange);
  else if (filter === 'losers') stocks = stocks.filter(s => s.change < 0).sort((a, b) => a.pctChange - b.pctChange);
  else if (filter === 'active') stocks = stocks.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));

  tbody.innerHTML = stocks.map(stock => {
    const isPos = stock.change >= 0; const sign = isPos ? '+' : '';
    return `<tr>
      <td><div style="display:flex;align-items:center;gap:8px">${getStockLogo(stock.symbol, 24)}<span class="table-symbol">${stock.symbol}</span></div></td>
      <td class="table-name">${stock.name}</td>
      <td class="align-right table-price">$${formatNumber(stock.price)}</td>
      <td class="align-right table-change ${isPos ? 'positive' : 'negative'}">${sign}$${formatNumber(Math.abs(stock.change))}</td>
      <td class="align-right table-change ${isPos ? 'positive' : 'negative'}">${sign}${stock.pctChange.toFixed(2)}%</td>
      <td class="align-right table-volume">${stock.volume}</td>
      <td class="align-right table-mcap">${stock.mcap}</td>
      <td><canvas class="table-sparkline" data-table-stock="${stock.symbol}" style="width:80px;height:30px"></canvas></td>
    </tr>`;
  }).join('');

  requestAnimationFrame(() => {
    stocks.forEach(stock => {
      const canvas = tbody.querySelector(`[data-table-stock="${stock.symbol}"]`);
      drawSparkline(canvas, stock.data, stock.change >= 0 ? '#22c55e' : '#ef4444', null);
    });
  });

  // Update tab active state
  document.querySelectorAll('[data-market-filter]').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.marketFilter === filter);
  });
}

function renderPortfolio() {
  const container = document.getElementById('holdingsList');
  let totalValue = 0, totalCost = 0;
  HOLDINGS.forEach(h => { totalValue += h.shares * h.currentPrice; totalCost += h.shares * h.avgCost; });
  const totalGain = totalValue - totalCost;

  const tvEl = document.getElementById('totalValue');
  const tgEl = document.getElementById('totalGain');
  if (tvEl) tvEl.textContent = `$${formatNumber(totalValue)}`;
  if (tgEl) { tgEl.textContent = `${totalGain >= 0 ? '+' : ''}$${formatNumber(Math.abs(totalGain))}`; tgEl.className = `stat-value ${totalGain >= 0 ? 'positive' : 'negative'}`; }

  container.innerHTML = HOLDINGS.map(h => {
    const value = h.shares * h.currentPrice;
    const pnl = value - h.shares * h.avgCost;
    const pnlPct = (pnl / (h.shares * h.avgCost)) * 100;
    const isPos = pnl >= 0; const sign = isPos ? '+' : '';
    return `<div class="holding-item">
      <div class="holding-info">
        <div class="stock-logo-wrap">${getStockLogo(h.symbol, 36)}</div>
        <div><div class="holding-symbol">${h.symbol}</div><div class="holding-name">${h.name}</div></div>
      </div>
      <div class="holding-shares">${h.shares} shares</div>
      <div class="holding-value">$${formatNumber(value)}</div>
      <div class="holding-pnl ${isPos ? 'positive' : 'negative'}">${sign}$${formatNumber(Math.abs(pnl))} (${sign}${pnlPct.toFixed(1)}%)</div>
    </div>`;
  }).join('');
  drawPortfolioChart();
}

function drawPortfolioChart() {
  const canvas = document.getElementById('portfolioCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const cont = canvas.parentElement;
  const w = cont.offsetWidth - 40;
  const h = cont.offsetHeight - 40;
  canvas.width = w * 2; canvas.height = h * 2;
  canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
  ctx.scale(2, 2);
  const data = []; let val = 100000;
  for (let i = 0; i < 60; i++) { val += (Math.random() - 0.4) * 800; data.push(val); }
  const min = Math.min(...data) - 500; const max = Math.max(...data) + 500; const range = max - min;
  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border-subtle').trim() || '#1a1a1a';
  ctx.lineWidth = 0.5;
  for (let i = 0; i <= 4; i++) { const y = (i / 4) * h; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, 'rgba(32,178,170,0.15)'); grad.addColorStop(1, 'rgba(32,178,170,0)');
  ctx.beginPath(); ctx.moveTo(0, h);
  data.forEach((v, i) => ctx.lineTo((i / (data.length - 1)) * w, h - ((v - min) / range) * h));
  ctx.lineTo(w, h); ctx.closePath(); ctx.fillStyle = grad; ctx.fill();
  ctx.beginPath();
  data.forEach((v, i) => { const x = (i / (data.length - 1)) * w; const y = h - ((v - min) / range) * h; i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); });
  ctx.strokeStyle = '#20b2aa'; ctx.lineWidth = 2; ctx.lineJoin = 'round'; ctx.stroke();
  const lx = w, ly = h - ((data[data.length-1] - min) / range) * h;
  ctx.beginPath(); ctx.arc(lx, ly, 4, 0, Math.PI * 2); ctx.fillStyle = '#20b2aa'; ctx.fill();
  ctx.beginPath(); ctx.arc(lx, ly, 7, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(32,178,170,0.3)'; ctx.lineWidth = 2; ctx.stroke();
}

let currentEarningsTab = 'upcoming';

function renderEarnings(filter) {
  filter = filter || currentEarningsTab;
  currentEarningsTab = filter;
  const statsContainer = document.getElementById('earningsStats');
  const timelineContainer = document.getElementById('earningsTimeline');
  let filtered = EARNINGS;
  if (filter === 'upcoming') filtered = EARNINGS.filter(e => e.status === 'upcoming');
  else if (filter === 'reported') filtered = EARNINGS.filter(e => e.status === 'reported');

  const totalUp = EARNINGS.filter(e => e.status === 'upcoming').length;
  const totalRep = EARNINGS.filter(e => e.status === 'reported').length;
  const beats = EARNINGS.filter(e => e.status === 'reported' && e.beat).length;
  const misses = EARNINGS.filter(e => e.status === 'reported' && !e.beat).length;

  statsContainer.innerHTML = `
    <div class="earnings-stat"><span class="earnings-stat-number">${totalUp}</span><span class="earnings-stat-label">Upcoming</span></div>
    <div class="earnings-stat"><span class="earnings-stat-number">${totalRep}</span><span class="earnings-stat-label">Reported</span></div>
    <div class="earnings-stat"><span class="earnings-stat-number earnings-beat">${beats}</span><span class="earnings-stat-label">Beats</span></div>
    <div class="earnings-stat"><span class="earnings-stat-number earnings-miss">${misses}</span><span class="earnings-stat-label">Misses</span></div>`;

  const grouped = {};
  filtered.forEach(e => { if (!grouped[e.date]) grouped[e.date] = []; grouped[e.date].push(e); });

  let html = '';
  for (const [date, items] of Object.entries(grouped)) {
    html += `<div class="earnings-date-group"><div class="earnings-date-header"><div class="earnings-date-dot"></div><span class="earnings-date-text">${date}, 2026</span></div><div class="earnings-date-cards">`;
    items.forEach(e => {
      const isRep = e.status === 'reported';
      const stock = STOCKS.find(s => s.symbol === e.symbol);
      const price = stock ? `$${formatNumber(stock.price)}` : '';
      const priceChange = stock ? (stock.change >= 0 ? `+${stock.pctChange.toFixed(2)}%` : `${stock.pctChange.toFixed(2)}%`) : '';
      const priceClass = stock && stock.change >= 0 ? 'positive' : 'negative';
      html += `<div class="earnings-card ${isRep ? (e.beat ? 'earnings-card-beat' : 'earnings-card-miss') : ''}">
        <div class="earnings-card-header">
          <div class="earnings-card-title">
            <div class="stock-logo-wrap">${getStockLogo(e.symbol, 32)}</div>
            <div><div class="earnings-card-symbol">${e.symbol}</div><div class="earnings-card-name">${e.name}</div></div>
          </div>
          <div class="earnings-card-meta">
            <span class="earnings-card-time">${e.time === 'AMC' ? 'After Close' : 'Before Open'}</span>
            ${isRep ? `<span class="earnings-badge ${e.beat ? 'badge-beat' : 'badge-miss'}">${e.beat ? 'Beat' : 'Miss'}</span>` : '<span class="earnings-badge badge-upcoming">Upcoming</span>'}
          </div>
        </div>
        <div class="earnings-card-body"><div class="earnings-row">
          ${isRep ? `
            <div class="earnings-metric"><span class="earnings-metric-label">EPS Actual</span><span class="earnings-metric-value ${e.beat ? 'earnings-beat' : 'earnings-miss'}">${e.actEPS}</span></div>
            <div class="earnings-metric"><span class="earnings-metric-label">EPS Est.</span><span class="earnings-metric-value">${e.estEPS}</span></div>
            <div class="earnings-metric"><span class="earnings-metric-label">Rev Actual</span><span class="earnings-metric-value ${e.beat ? 'earnings-beat' : 'earnings-miss'}">${e.actRev}</span></div>
            <div class="earnings-metric"><span class="earnings-metric-label">Rev Est.</span><span class="earnings-metric-value">${e.estRev}</span></div>
          ` : `
            <div class="earnings-metric"><span class="earnings-metric-label">EPS Est.</span><span class="earnings-metric-value">${e.estEPS}</span></div>
            <div class="earnings-metric"><span class="earnings-metric-label">Rev Est.</span><span class="earnings-metric-value">${e.estRev}</span></div>
            <div class="earnings-metric"><span class="earnings-metric-label">Price</span><span class="earnings-metric-value">${price}</span></div>
            <div class="earnings-metric"><span class="earnings-metric-label">Change</span><span class="earnings-metric-value ${priceClass}">${priceChange}</span></div>
          `}
        </div></div>
      </div>`;
    });
    html += '</div></div>';
  }
  timelineContainer.innerHTML = html;
  document.querySelectorAll('#earningsTabs .tab').forEach(tab => tab.classList.toggle('active', tab.dataset.earningsTab === filter));
}

function renderWatchlist() {
  const container = document.getElementById('watchlistGrid');
  const watchStocks = STOCKS.slice(0, 8);
  container.innerHTML = watchStocks.map(stock => {
    const isPos = stock.change >= 0; const sign = isPos ? '+' : '';
    return `<div class="watchlist-card">
      <div class="watchlist-card-top">
        <div class="watchlist-info">
          <div class="stock-logo-wrap">${getStockLogo(stock.symbol, 36)}</div>
          <div><div class="watchlist-symbol">${stock.symbol}</div><div class="watchlist-name">${stock.name}</div></div>
        </div>
        <div class="watchlist-price-group">
          <div class="watchlist-price">$${formatNumber(stock.price)}</div>
          <div class="watchlist-change ${isPos ? 'positive' : 'negative'}">${sign}${stock.pctChange.toFixed(2)}%</div>
        </div>
      </div>
      <canvas class="watchlist-sparkline-bg" data-watch="${stock.symbol}"></canvas>
    </div>`;
  }).join('');
  requestAnimationFrame(() => {
    watchStocks.forEach(stock => {
      const canvas = container.querySelector(`[data-watch="${stock.symbol}"]`);
      const color = stock.change >= 0 ? '#22c55e' : '#ef4444';
      drawSparkline(canvas, stock.data, color, stock.change >= 0 ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)');
    });
  });
}

// --- Navigation ---
function navigateTo(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(`page-${page}`);
  if (target) target.classList.add('active');
  document.querySelectorAll('.nav-item').forEach(item => item.classList.toggle('active', item.dataset.page === page));
  document.querySelectorAll('.mobile-nav-item').forEach(item => item.classList.toggle('active', item.dataset.page === page));
  if (page === 'markets') renderStockTable();
  if (page === 'heatmap') renderHeatmapFull();
  if (page === 'portfolio') renderPortfolio();
  if (page === 'earnings') renderEarnings();
  if (page === 'watchlist') renderWatchlist();
}

function initNavigation() {
  document.querySelectorAll('.nav-item[data-page]').forEach(item => {
    item.addEventListener('click', (e) => { e.preventDefault(); navigateTo(item.dataset.page); });
  });
  document.querySelectorAll('.mobile-nav-item[data-page]').forEach(item => {
    item.addEventListener('click', (e) => { e.preventDefault(); navigateTo(item.dataset.page); });
  });
  document.querySelectorAll('.section-link[data-page]').forEach(link => {
    link.addEventListener('click', (e) => { e.preventDefault(); navigateTo(link.dataset.page); });
  });

  // Market Overview tabs (Home page)
  const marketTabs = document.getElementById('marketOverviewTabs');
  if (marketTabs) {
    marketTabs.addEventListener('click', (e) => {
      const tab = e.target.closest('.tab');
      if (tab && tab.dataset.marketTab) { e.preventDefault(); e.stopPropagation(); renderIndexCards(tab.dataset.marketTab); }
    });
  }

  // Market filter tabs (Markets page - Gainers/Losers/Most Active)
  const marketsPage = document.getElementById('page-markets');
  if (marketsPage) {
    const filterTabs = marketsPage.querySelector('.section-tabs');
    if (filterTabs) {
      filterTabs.addEventListener('click', (e) => {
        const tab = e.target.closest('.tab');
        if (tab && tab.dataset.marketFilter) {
          e.preventDefault();
          e.stopPropagation();
          renderStockTable(tab.dataset.marketFilter);
        }
      });
    }
  }

  // Earnings tabs
  const earningsTabs = document.getElementById('earningsTabs');
  if (earningsTabs) {
    earningsTabs.addEventListener('click', (e) => {
      const tab = e.target.closest('.tab');
      if (tab && tab.dataset.earningsTab) { e.preventDefault(); e.stopPropagation(); renderEarnings(tab.dataset.earningsTab); }
    });
  }

  // Refresh button for market summary
  const refreshBtn = document.getElementById('refreshSummary');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', (e) => {
      e.preventDefault();
      refreshBtn.classList.add('spinning');
      // Simulate refresh
      setTimeout(() => {
        renderSummaryAccordion();
        const badge = document.getElementById('summaryUpdated');
        if (badge) badge.textContent = 'Updated just now';
        refreshBtn.classList.remove('spinning');
      }, 800);
    });
  }

  // Generic tab interactions (visual toggle for other tabs)
  document.querySelectorAll('.section-tabs').forEach(tabGroup => {
    if (tabGroup.id === 'marketOverviewTabs' || tabGroup.id === 'earningsTabs') return;
    if (tabGroup.closest('#page-markets')) return; // Already handled
    tabGroup.addEventListener('click', (e) => {
      const tab = e.target.closest('.tab');
      if (tab && !tab.dataset.marketTab && !tab.dataset.earningsTab && !tab.dataset.marketFilter) {
        tabGroup.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      }
    });
  });
}

function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const saved = localStorage.getItem('trinity-theme');
  if (saved) html.setAttribute('data-theme', saved);
  toggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('trinity-theme', next);
    requestAnimationFrame(() => {
      const active = document.querySelector('.page.active');
      if (active && active.id === 'page-portfolio') drawPortfolioChart();
    });
  });
}

function initSearchModal() {
  const modal = document.getElementById('searchModal');
  const overlay = document.getElementById('searchModalOverlay');
  const searchInput = document.getElementById('searchInput');
  const modalInput = document.getElementById('modalSearchInput');
  const resultsContainer = document.getElementById('searchResults');

  function openModal() {
    modal.classList.add('open');
    setTimeout(() => modalInput.focus(), 50);
  }

  function closeModal() {
    modal.classList.remove('open');
    modalInput.value = '';
    showDefaultResults();
  }

  function showDefaultResults() {
    resultsContainer.innerHTML = `
      <div class="search-quick-links">
        <p class="search-quick-label">Popular searches</p>
        <a href="#" class="search-quick-item" data-search="NVDA"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>NVDA stock analysis</a>
        <a href="#" class="search-quick-item" data-search="AAPL"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>Compare AAPL vs MSFT</a>
        <a href="#" class="search-quick-item" data-search="ETF"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>Best performing ETFs this year</a>
      </div>`;
  }

  function performSearch(query) {
    if (!query.trim()) { showDefaultResults(); return; }
    const q = query.toLowerCase();
    const matched = STOCKS.filter(s => s.symbol.toLowerCase().includes(q) || s.name.toLowerCase().includes(q) || s.sector.toLowerCase().includes(q)).slice(0, 8);
    if (!matched.length) {
      resultsContainer.innerHTML = `<div class="search-no-results"><p>No results found for "${query}"</p><p class="search-no-results-hint">Try searching for a stock symbol, company name, or sector</p></div>`;
      return;
    }
    resultsContainer.innerHTML = `<div class="search-results-list"><p class="search-quick-label">Stocks</p>
      ${matched.map(s => {
        const isPos = s.change >= 0; const sign = isPos ? '+' : '';
        return `<div class="search-result-item" data-symbol="${s.symbol}">
          <div class="search-result-info">
            <div class="stock-logo-wrap">${getStockLogo(s.symbol, 32)}</div>
            <div><div class="search-result-symbol">${s.symbol}</div><div class="search-result-name">${s.name} &middot; ${s.sector}</div></div>
          </div>
          <div class="search-result-price">
            <div class="search-result-price-val">$${formatNumber(s.price)}</div>
            <div class="search-result-change ${isPos ? 'positive' : 'negative'}">${sign}${s.pctChange.toFixed(2)}%</div>
          </div>
        </div>`;
      }).join('')}</div>`;
    resultsContainer.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => { closeModal(); navigateTo('markets'); });
    });
  }

  modalInput.addEventListener('input', () => performSearch(modalInput.value));

  // FIXED: Use click instead of focus to open modal
  searchInput.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });

  // Also handle the entire search container as clickable
  const searchContainer = document.querySelector('.search-container');
  if (searchContainer) {
    searchContainer.addEventListener('click', (e) => {
      if (e.target === searchContainer || e.target.closest('.search-icon') || e.target.closest('.search-shortcut')) {
        e.preventDefault();
        openModal();
      }
    });
  }

  // Suggestion chips
  document.querySelectorAll('.suggestion-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      openModal();
      setTimeout(() => { modalInput.value = chip.textContent; performSearch(chip.textContent); }, 100);
    });
  });

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); modal.classList.contains('open') ? closeModal() : openModal(); }
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  overlay.addEventListener('click', closeModal);
}

// --- Window resize ---
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const active = document.querySelector('.page.active');
    if (active) {
      if (active.id === 'page-home') { renderIndexCards(); renderTrendingStocks(); }
      else if (active.id === 'page-portfolio') drawPortfolioChart();
    }
  }, 250);
});

// --- Authentication ---
function initAuth() {
  const loginPage = document.getElementById('loginPage');
  const sidebar = document.getElementById('sidebar');
  const mobileNav = document.getElementById('mobileNav');
  const mainContent = document.getElementById('mainContent');
  const userMenu = document.getElementById('userMenu');
  const userAvatar = document.getElementById('userAvatar');
  const userName = document.getElementById('userName');
  const userEmail = document.getElementById('userEmail');

  function getUser() {
    try { const d = localStorage.getItem('trinity-user'); return d ? JSON.parse(d) : null; }
    catch (e) { localStorage.removeItem('trinity-user'); return null; }
  }
  function setUser(user) { localStorage.setItem('trinity-user', JSON.stringify(user)); }
  function clearUser() { localStorage.removeItem('trinity-user'); }

  function showApp(user) {
    loginPage.style.display = 'none';
    sidebar.style.display = '';
    mobileNav.style.display = '';
    mainContent.style.display = '';
    if (user && userMenu) {
      const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U';
      userAvatar.textContent = initials;
      userName.textContent = user.name || 'User';
      userEmail.textContent = user.email || '';
      userMenu.style.display = 'flex';
    }
  }

  function showLogin() {
    loginPage.style.display = 'flex';
    sidebar.style.display = 'none';
    mobileNav.style.display = 'none';
    mainContent.style.display = 'none';
    if (userMenu) userMenu.style.display = 'none';
    // Reset to sign-in mode
    resetLoginForm();
  }

  let isSignupMode = false;

  function resetLoginForm() {
    isSignupMode = false;
    const title = document.querySelector('.login-title');
    const subtitle = document.querySelector('.login-subtitle');
    const submitBtn = document.querySelector('.btn-login');
    const footer = document.querySelector('.login-footer');
    const form = document.getElementById('loginForm');
    const error = document.getElementById('loginError');
    if (title) title.textContent = 'Welcome back';
    if (subtitle) subtitle.textContent = 'Sign in to access your portfolios and market data';
    if (submitBtn) submitBtn.textContent = 'Sign in';
    if (error) error.textContent = '';
    if (form) form.reset();

    // Remove extra fields if any
    const nameField = document.getElementById('signupNameGroup');
    const confirmField = document.getElementById('signupConfirmGroup');
    const termsField = document.getElementById('signupTermsRow');
    if (nameField) nameField.remove();
    if (confirmField) confirmField.remove();
    if (termsField) termsField.remove();

    if (footer) {
      footer.innerHTML = '<p>Don\'t have an account? <a href="#" class="form-link" id="showSignup">Sign up</a></p>';
      document.getElementById('showSignup').addEventListener('click', handleShowSignup);
    }
  }

  function handleShowSignup(e) {
    e.preventDefault();
    isSignupMode = true;
    const title = document.querySelector('.login-title');
    const subtitle = document.querySelector('.login-subtitle');
    const submitBtn = document.querySelector('.btn-login');
    const footer = document.querySelector('.login-footer');
    const form = document.getElementById('loginForm');
    const error = document.getElementById('loginError');

    if (title) title.textContent = 'Create your account';
    if (subtitle) subtitle.textContent = 'Join Trinity Finance and start tracking your investments';
    if (submitBtn) submitBtn.textContent = 'Create account';
    if (error) error.textContent = '';

    // Add name field before email
    const emailGroup = form.querySelector('.form-group');
    if (emailGroup && !document.getElementById('signupNameGroup')) {
      const nameGroup = document.createElement('div');
      nameGroup.className = 'form-group';
      nameGroup.id = 'signupNameGroup';
      nameGroup.innerHTML = '<label class="form-label" for="signupName">Full Name</label><input type="text" class="form-input" id="signupName" placeholder="John Doe" required>';
      emailGroup.parentNode.insertBefore(nameGroup, emailGroup);
    }

    // Add confirm password after password
    const passwordGroup = form.querySelectorAll('.form-group')[form.querySelectorAll('.form-group').length - 1];
    const formRow = form.querySelector('.form-row');
    if (formRow && !document.getElementById('signupConfirmGroup')) {
      const confirmGroup = document.createElement('div');
      confirmGroup.className = 'form-group';
      confirmGroup.id = 'signupConfirmGroup';
      confirmGroup.innerHTML = '<label class="form-label" for="signupConfirm">Confirm Password</label><input type="password" class="form-input" id="signupConfirm" placeholder="Confirm your password" required>';
      formRow.parentNode.insertBefore(confirmGroup, formRow);
    }

    // Replace remember me row with terms
    if (formRow) {
      formRow.id = 'signupTermsRow';
      formRow.innerHTML = '<label class="form-checkbox"><input type="checkbox" id="agreeTerms"><span>I agree to the <a href="#" class="form-link" onclick="event.preventDefault()">Terms of Service</a> and <a href="#" class="form-link" onclick="event.preventDefault()">Privacy Policy</a></span></label>';
    }

    if (footer) {
      footer.innerHTML = '<p>Already have an account? <a href="#" class="form-link" id="showLogin">Sign in</a></p>';
      document.getElementById('showLogin').addEventListener('click', (e2) => { e2.preventDefault(); resetLoginForm(); });
    }
  }

  // Check existing session
  const existingUser = getUser();
  if (existingUser) showApp(existingUser);
  else showLogin();

  // Form submit (works for both sign-in and sign-up)
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const error = document.getElementById('loginError');
      error.textContent = '';

      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;

      if (!email || !password) { error.textContent = 'Please fill in all fields.'; return; }
      if (password.length < 6) { error.textContent = 'Password must be at least 6 characters.'; return; }

      if (isSignupMode) {
        const nameInput = document.getElementById('signupName');
        const confirmInput = document.getElementById('signupConfirm');
        const termsCheck = document.getElementById('agreeTerms');
        if (nameInput && !nameInput.value.trim()) { error.textContent = 'Please enter your name.'; return; }
        if (confirmInput && confirmInput.value !== password) { error.textContent = 'Passwords do not match.'; return; }
        if (termsCheck && !termsCheck.checked) { error.textContent = 'Please agree to the Terms of Service.'; return; }

        const user = { name: nameInput ? nameInput.value.trim() : 'User', email: email, provider: 'email' };
        setUser(user);
        showApp(user);
      } else {
        const user = {
          name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
          email: email,
          provider: 'email'
        };
        setUser(user);
        showApp(user);
      }
    });
  }

  // Google Sign-In
  const googleBtn = document.getElementById('googleSignIn');
  if (googleBtn) {
    googleBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const error = document.getElementById('loginError');
      if (error) error.textContent = '';

      // Show loading state
      googleBtn.disabled = true;
      googleBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spinning-icon"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> Signing in...';

      setTimeout(() => {
        const user = { name: 'Google User', email: 'user@gmail.com', provider: 'google' };
        setUser(user);
        googleBtn.disabled = false;
        googleBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/><path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 2.58 9 2.58z" fill="#EA4335"/></svg> Continue with Google';
        showApp(user);
      }, 600);
    });
  }

  // Sign up link
  const signupLink = document.getElementById('showSignup');
  if (signupLink) {
    signupLink.addEventListener('click', handleShowSignup);
  }

  // Logout
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      clearUser();
      showLogin();
    });
  }
}

// --- Initialize ---
document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  renderIndexCards('us');
  renderSentimentBar();
  renderSummaryAccordion();
  renderTrendingStocks();
  initNavigation();
  initThemeToggle();
  initSearchModal();
  fetchRealPrices();
});
