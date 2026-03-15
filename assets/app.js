// ============================================
// Trinity Finance — Interactive Dashboard
// ============================================

const FINNHUB_KEY = 'd6ep8bhr01qksaq9dcb0d6ep8bhr01qksaq9dcbg';
const FINNHUB_BASE = 'https://finnhub.io/api/v1';

// --- Stock Logo Colors (Monotone grayscale) ---
const LOGO_COLORS = {
  NVDA: '#6b6b6b', AAPL: '#555555', MSFT: '#7a7a7a', AMZN: '#888888',
  GOOGL: '#666666', META: '#707070', TSLA: '#5a5a5a', 'BRK.B': '#4a4a4a',
  JPM: '#505050', V: '#585858', UNH: '#525252', XOM: '#686868',
  LLY: '#606060', JNJ: '#5e5e5e', AVGO: '#646464', PG: '#727272',
  MA: '#6e6e6e', HD: '#7c7c7c', COST: '#767676', NFLX: '#484848',
  CRM: '#6a6a6a', AMD: '#5c5c5c', WMT: '#808080', DIS: '#545454',
  MU: '#626262', CVX: '#747474', BAC: '#4e4e4e', WFC: '#565656',
  ABT: '#6c6c6c', CAT: '#787878', GE: '#7e7e7e', RTX: '#686868',
  BTC: '#595959', ETH: '#636363', SOL: '#6d6d6d', BNB: '#737373',
};

function getStockLogo(symbol, size) {
  size = size || 36;
  const color = LOGO_COLORS[symbol] || '#444';
  const initials = symbol.replace('.', '').slice(0, 2).toUpperCase();
  const fs = Math.round(size * 0.33);
  return `<div class="stock-logo" style="width:${size}px;height:${size}px;background:${color};border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:${fs}px;color:#fff;flex-shrink:0;letter-spacing:-0.5px">${initials}</div>`;
}

// --- Data ---
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
  { symbol: 'MSFT', name: 'Microsoft Corp', price: 445.67, change: -7.05, pctChange: -1.57, volume: '22.7M', mcap: '3.31T', mcapVal: 3310, sector: 'Technology', subsector: 'Software' },
  { symbol: 'AMZN', name: 'Amazon.com Inc', price: 198.23, change: -1.77, pctChange: -0.89, volume: '35.4M', mcap: '2.04T', mcapVal: 2040, sector: 'Consumer Cyclical', subsector: 'Specialty Retail' },
  { symbol: 'GOOGL', name: 'Alphabet Inc', price: 175.89, change: -0.74, pctChange: -0.42, volume: '20.1M', mcap: '2.17T', mcapVal: 2170, sector: 'Communication Services', subsector: 'Internet Content' },
  { symbol: 'META', name: 'Meta Platforms', price: 567.12, change: -21.73, pctChange: -3.83, volume: '18.9M', mcap: '1.44T', mcapVal: 1440, sector: 'Communication Services', subsector: 'Internet Content' },
  { symbol: 'TSLA', name: 'Tesla Inc', price: 312.34, change: -3.00, pctChange: -0.96, volume: '67.2M', mcap: '993B', mcapVal: 993, sector: 'Consumer Cyclical', subsector: 'Auto Manufacturers' },
  { symbol: 'BRK.B', name: 'Berkshire Hathaway', price: 456.78, change: -1.60, pctChange: -0.35, volume: '3.4M', mcap: '1.00T', mcapVal: 1000, sector: 'Financial Services', subsector: 'Insurance' },
  { symbol: 'JPM', name: 'JPMorgan Chase', price: 234.56, change: 0.44, pctChange: 0.19, volume: '8.9M', mcap: '678B', mcapVal: 678, sector: 'Financial Services', subsector: 'Banks' },
  { symbol: 'V', name: 'Visa Inc', price: 312.89, change: 0.65, pctChange: 0.21, volume: '6.2M', mcap: '612B', mcapVal: 612, sector: 'Financial Services', subsector: 'Credit Services' },
  { symbol: 'UNH', name: 'UnitedHealth Group', price: 534.12, change: 9.72, pctChange: 1.82, volume: '4.1M', mcap: '492B', mcapVal: 492, sector: 'Healthcare', subsector: 'Health Insurance' },
  { symbol: 'XOM', name: 'Exxon Mobil', price: 112.34, change: 1.90, pctChange: 1.69, volume: '12.8M', mcap: '468B', mcapVal: 468, sector: 'Energy', subsector: 'Oil & Gas' },
  { symbol: 'LLY', name: 'Eli Lilly', price: 823.45, change: 6.58, pctChange: 0.80, volume: '5.6M', mcap: '782B', mcapVal: 782, sector: 'Healthcare', subsector: 'Drug Manufacturers' },
  { symbol: 'JNJ', name: 'Johnson & Johnson', price: 156.78, change: -0.33, pctChange: -0.21, volume: '7.3M', mcap: '378B', mcapVal: 378, sector: 'Healthcare', subsector: 'Drug Manufacturers' },
  { symbol: 'AVGO', name: 'Broadcom Inc', price: 178.92, change: -7.35, pctChange: -4.11, volume: '14.2M', mcap: '830B', mcapVal: 830, sector: 'Technology', subsector: 'Semiconductors' },
  { symbol: 'PG', name: 'Procter & Gamble', price: 167.34, change: 0.15, pctChange: 0.09, volume: '5.8M', mcap: '394B', mcapVal: 394, sector: 'Consumer Defensive', subsector: 'Household' },
  { symbol: 'MA', name: 'Mastercard Inc', price: 523.45, change: 3.21, pctChange: 0.62, volume: '3.1M', mcap: '497B', mcapVal: 497, sector: 'Financial Services', subsector: 'Credit Services' },
  { symbol: 'HD', name: 'Home Depot', price: 412.56, change: 0.12, pctChange: 0.03, volume: '4.5M', mcap: '409B', mcapVal: 409, sector: 'Consumer Cyclical', subsector: 'Home Improvement' },
  { symbol: 'COST', name: 'Costco', price: 912.34, change: 4.74, pctChange: 0.52, volume: '2.3M', mcap: '405B', mcapVal: 405, sector: 'Consumer Defensive', subsector: 'Discount Stores' },
  { symbol: 'NFLX', name: 'Netflix Inc', price: 789.12, change: 8.38, pctChange: 1.06, volume: '9.7M', mcap: '341B', mcapVal: 341, sector: 'Communication Services', subsector: 'Entertainment' },
  { symbol: 'CRM', name: 'Salesforce Inc', price: 312.45, change: -4.56, pctChange: -1.44, volume: '6.4M', mcap: '302B', mcapVal: 302, sector: 'Technology', subsector: 'Software' },
  { symbol: 'AMD', name: 'AMD Inc', price: 178.34, change: 5.67, pctChange: 3.28, volume: '45.6M', mcap: '288B', mcapVal: 288, sector: 'Technology', subsector: 'Semiconductors' },
  { symbol: 'WMT', name: 'Walmart Inc', price: 89.12, change: 0.85, pctChange: 0.95, volume: '11.2M', mcap: '577B', mcapVal: 577, sector: 'Consumer Defensive', subsector: 'Discount Stores' },
  { symbol: 'DIS', name: 'Walt Disney', price: 112.67, change: -1.23, pctChange: -1.08, volume: '8.4M', mcap: '206B', mcapVal: 206, sector: 'Communication Services', subsector: 'Entertainment' },
  { symbol: 'MU', name: 'Micron Technology', price: 98.45, change: 5.05, pctChange: 5.13, volume: '32.1M', mcap: '108B', mcapVal: 108, sector: 'Technology', subsector: 'Semiconductors' },
  { symbol: 'CVX', name: 'Chevron Corp', price: 158.90, change: -0.13, pctChange: -0.08, volume: '7.2M', mcap: '290B', mcapVal: 290, sector: 'Energy', subsector: 'Oil & Gas' },
  { symbol: 'BAC', name: 'Bank of America', price: 38.45, change: -0.34, pctChange: -0.87, volume: '34.5M', mcap: '298B', mcapVal: 298, sector: 'Financial Services', subsector: 'Banks' },
  { symbol: 'WFC', name: 'Wells Fargo', price: 62.12, change: -0.35, pctChange: -0.57, volume: '15.8M', mcap: '212B', mcapVal: 212, sector: 'Financial Services', subsector: 'Banks' },
  { symbol: 'ABT', name: 'Abbott Labs', price: 112.34, change: 1.12, pctChange: 1.01, volume: '5.2M', mcap: '194B', mcapVal: 194, sector: 'Healthcare', subsector: 'Medical Devices' },
  { symbol: 'CAT', name: 'Caterpillar Inc', price: 345.67, change: -3.33, pctChange: -0.96, volume: '3.8M', mcap: '168B', mcapVal: 168, sector: 'Industrials', subsector: 'Agricultural Machinery' },
  { symbol: 'GE', name: 'GE Aerospace', price: 189.45, change: -4.34, pctChange: -2.29, volume: '6.1M', mcap: '205B', mcapVal: 205, sector: 'Industrials', subsector: 'Aerospace & Defense' },
  { symbol: 'RTX', name: 'RTX Corp', price: 112.89, change: 0.82, pctChange: 0.73, volume: '4.7M', mcap: '148B', mcapVal: 148, sector: 'Industrials', subsector: 'Aerospace & Defense' },
];

// Persistent data via localStorage
let HOLDINGS = JSON.parse(localStorage.getItem('trinity-holdings')) || [
  { symbol: 'NVDA', name: 'NVIDIA Corp', shares: 50, avgCost: 680.00, currentPrice: 924.56 },
  { symbol: 'AAPL', name: 'Apple Inc', shares: 100, avgCost: 175.00, currentPrice: 213.45 },
  { symbol: 'MSFT', name: 'Microsoft Corp', shares: 30, avgCost: 380.00, currentPrice: 445.67 },
  { symbol: 'GOOGL', name: 'Alphabet Inc', shares: 80, avgCost: 140.00, currentPrice: 175.89 },
  { symbol: 'META', name: 'Meta Platforms', shares: 25, avgCost: 420.00, currentPrice: 567.12 },
  { symbol: 'AMZN', name: 'Amazon.com Inc', shares: 40, avgCost: 155.00, currentPrice: 198.23 },
  { symbol: 'NFLX', name: 'Netflix Inc', shares: 15, avgCost: 580.00, currentPrice: 789.12 },
];

let WATCHLIST = JSON.parse(localStorage.getItem('trinity-watchlist')) || ['NVDA','AAPL','MSFT','AMZN','GOOGL','META','TSLA','BRK.B'];

function saveHoldings() { localStorage.setItem('trinity-holdings', JSON.stringify(HOLDINGS)); }
function saveWatchlist() { localStorage.setItem('trinity-watchlist', JSON.stringify(WATCHLIST)); }

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
  'Technology': { change: -0.75, stocks: ['NVDA','AAPL','MSFT','AVGO','AMD','MU','CRM'] },
  'Consumer Cyclical': { change: -0.59, stocks: ['AMZN','TSLA','HD'] },
  'Financial Services': { change: 0.12, stocks: ['BRK.B','JPM','V','MA','BAC','WFC'] },
  'Consumer Defensive': { change: 0.58, stocks: ['WMT','COST','PG'] },
  'Healthcare': { change: -0.25, stocks: ['LLY','JNJ','UNH','ABT'] },
  'Communication Services': { change: -0.71, stocks: ['GOOGL','META','NFLX','DIS'] },
  'Energy': { change: 0.33, stocks: ['XOM','CVX'] },
  'Industrials': { change: -0.36, stocks: ['CAT','GE','RTX'] },
};

const MARKET_HEADLINES = [
  { title: 'Crude Oil Surges 3.11% to $98.71 — Iran War Drives Historic Supply Disruption', body: 'Crude oil has surged over 40% in just 15 days since the U.S.-Israel conflict with Iran began on February 28, with Brent briefly topping $100 a barrel.', sentiment: 'bearish' },
  { title: 'S&P 500 Hits 2026 Low as Equities Break Key Technical Levels', body: 'The S&P 500 fell 1.4% to close at 5,638, breaking below its 200-day moving average for the first time since October 2023.', sentiment: 'bearish' },
  { title: 'Bitcoin Holds at ~$71K, Outperforming S&P 500, Nasdaq, and Gold Since War\'s Start', body: 'Bitcoin has held steady at $71,000 despite broad equity selloffs, cementing its role as a macro hedge. Since the Iran conflict began, BTC is up 8.2%.', sentiment: 'bullish' },
  { title: 'EUR/USD Slips 0.39% to $1.15 as Dollar Strengthens on Geopolitical Risk', body: 'The U.S. dollar index rose 0.5% as investors rotated into safe-haven assets.', sentiment: 'bearish' },
  { title: 'Ethereum Drops 1.16% to $2,087 Amid Broad Crypto Risk-Off Sentiment', body: 'ETH underperformed BTC with a 1.16% decline as altcoins faced selling pressure.', sentiment: 'bearish' },
  { title: 'Fed Rate Decision Looms Large — Markets Eye Dot Plot Amid Stagflation Risk', body: 'The Federal Reserve meets next week with markets pricing in an 82% chance of rates held at 5.25-5.50%.', sentiment: 'bearish' }
];

// --- AI Responses ---
const AI_RESPONSES = {
  'rate cuts': 'Rate cuts typically benefit growth stocks and technology companies as they lower borrowing costs and make future earnings more valuable. Historically, the S&P 500 has rallied an average of 15% in the 12 months following the first rate cut in a cycle. However, if cuts come due to recession fears, the initial impact can be negative.',
  'dividend': 'Top dividend stocks for 2026 include: **JNJ** (2.8% yield), **PG** (2.4%), **XOM** (3.1%), **JPM** (2.2%), and **ABT** (1.9%). These companies have strong cash flows and histories of consistent dividend growth. Energy and healthcare sectors currently offer the best risk-adjusted dividend yields.',
  'crypto': 'The crypto market is showing mixed signals. Bitcoin at $71K is acting as a safe haven during geopolitical tensions, outperforming equities. Ethereum has underperformed BTC, with the ETH/BTC ratio at 3-month lows. Solana continues to show strength in DeFi activity. Overall market sentiment is cautiously bullish for BTC but bearish for altcoins.',
  'tariff': 'Tariffs on semiconductors could significantly impact companies like **NVDA**, **AMD**, **AVGO**, and **MU** which rely heavily on international supply chains. Taiwan-manufactured chips face the highest risk. Companies with domestic fabrication capabilities may benefit. The Philadelphia Semiconductor Index has historically dropped 5-10% on major tariff announcements.',
  'earnings': 'This week\'s key earnings: **AAPL** (Mar 18, est. EPS $2.35), **NVDA** (Mar 19, est. EPS $0.89), **GOOGL** (Mar 20, est. EPS $2.12). Already reported: MSFT beat estimates, META beat, TSLA missed. The overall beat rate is 67% so far this season.',
  'etf': 'Best performing ETFs in 2026: **QQQ** (Nasdaq-100) +12.4%, **SMH** (Semiconductors) +18.2%, **XLE** (Energy) +15.7%, **GLD** (Gold) +9.3%. Semiconductor ETFs lead due to AI demand, while energy ETFs benefit from oil price surges. Bond ETFs like **TLT** are down -3.2% amid rate uncertainty.',
  'default': 'Based on current market conditions, the S&P 500 is trading at 5,892 with bearish sentiment driven by geopolitical tensions. Key themes: oil prices surging due to Iran conflict, Bitcoin outperforming as a hedge, and the Fed rate decision next week. Technology stocks are under pressure while energy and defensive sectors show relative strength.'
};

// --- Finnhub API ---
async function fetchStockQuote(symbol) {
  try {
    const r = await fetch(`${FINNHUB_BASE}/quote?symbol=${symbol.replace('.', '-')}&token=${FINNHUB_KEY}`);
    if (!r.ok) return null;
    const d = await r.json();
    return d && d.c > 0 ? { currentPrice: d.c, change: d.d, pctChange: d.dp } : null;
  } catch (e) { return null; }
}

async function fetchRealPrices() {
  const syms = ['NVDA','AAPL','MSFT','AMZN','GOOGL','META','TSLA','JPM','V','AMD','NFLX','UNH','XOM','LLY','MA','WMT','COST','CRM','MU','HD'];
  for (let i = 0; i < syms.length; i += 5) {
    const batch = syms.slice(i, i + 5);
    const results = await Promise.all(batch.map(s => fetchStockQuote(s).then(d => ({ s, d }))));
    results.forEach(({ s, d }) => {
      if (d) {
        const st = STOCKS.find(x => x.symbol === s);
        if (st) { st.price = d.currentPrice; st.change = d.change || 0; st.pctChange = d.pctChange || 0; }
        const h = HOLDINGS.find(x => x.symbol === s);
        if (h) h.currentPrice = d.currentPrice;
      }
    });
    if (i + 5 < syms.length) await new Promise(r => setTimeout(r, 300));
  }
  const p = document.querySelector('.page.active');
  if (p) {
    if (p.id === 'page-home') renderTrendingStocks();
    else if (p.id === 'page-markets') renderStockTable();
    else if (p.id === 'page-watchlist') renderWatchlist();
    else if (p.id === 'page-portfolio') renderPortfolio();
  }
}

// --- Utility ---
function genSparkline(len, vol, trend) {
  len = len || 20; vol = vol || 0.02; trend = trend || 0;
  const d = [100]; for (let i = 1; i < len; i++) d.push(d[i-1] + (Math.random()-0.5+trend)*vol*100); return d;
}

function drawSparkline(c, data, color, fill) {
  if (!c || !data || !data.length) return;
  const ctx = c.getContext('2d');
  c.width = c.offsetWidth * 2; c.height = c.offsetHeight * 2;
  ctx.scale(2, 2);
  const w = c.offsetWidth, h = c.offsetHeight;
  const min = Math.min(...data), max = Math.max(...data), range = max - min || 1;
  ctx.clearRect(0, 0, w, h);
  if (fill) {
    ctx.beginPath(); ctx.moveTo(0, h);
    data.forEach((v, i) => ctx.lineTo((i/(data.length-1))*w, h-((v-min)/range)*(h-4)-2));
    ctx.lineTo(w, h); ctx.closePath(); ctx.fillStyle = fill; ctx.fill();
  }
  ctx.beginPath();
  data.forEach((v, i) => { const x=(i/(data.length-1))*w, y=h-((v-min)/range)*(h-4)-2; i===0?ctx.moveTo(x,y):ctx.lineTo(x,y); });
  ctx.strokeStyle = color; ctx.lineWidth = 1.5; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke();
}

function hmColor(p) {
  const c = Math.max(-5, Math.min(5, p));
  if (c < 0) { const t=Math.abs(c)/5; return `rgb(${255-t*55|0},${235-t*155|0},${235-t*155|0})`; }
  if (c > 0) { const t=c/5; return `rgb(${235-t*105|0},${255-t*55|0},${235-t*105|0})`; }
  return '#e5e5e5';
}

function hmText(p) { return Math.abs(p) > 3 ? '#fff' : '#1a1a1a'; }
function fmt(n) { return n.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2}); }

STOCKS.forEach(s => { s.data = genSparkline(20, 0.02, s.pctChange > 0 ? 0.015 : -0.015); });

// --- Render Functions ---
function renderIndexCards(market) {
  market = market || currentMarketTab; currentMarketTab = market;
  const indices = MARKET_DATA[market] || MARKET_DATA.us;
  const el = document.getElementById('indexCards');
  indices.forEach(i => { if (!i.data) i.data = genSparkline(30, 0.015, i.pctChange > 0 ? 0.02 : -0.02); });
  el.innerHTML = indices.map(i => {
    const p = i.change >= 0, s = p ? '+' : '';
    return `<div class="index-card"><div class="index-card-name">${i.name}</div><div class="index-card-value">${fmt(i.value)}</div><div class="index-card-change ${p?'positive':'negative'}">${s}${fmt(i.change)} (${s}${i.pctChange.toFixed(2)}%)</div><canvas class="index-card-sparkline" data-idx="${i.symbol}"></canvas></div>`;
  }).join('');
  requestAnimationFrame(() => indices.forEach(i => {
    const cv = el.querySelector(`[data-idx="${i.symbol}"]`);
    drawSparkline(cv, i.data, i.change>=0?'#22c55e':'#ef4444', i.change>=0?'rgba(34,197,94,0.15)':'rgba(239,68,68,0.15)');
  }));
  document.querySelectorAll('#marketOverviewTabs .tab').forEach(t => t.classList.toggle('active', t.dataset.marketTab === market));
}

function renderSentimentBar() {
  const el = document.getElementById('sentimentBar');
  let bear=0, bull=0;
  MARKET_HEADLINES.forEach(h => h.sentiment==='bearish'?bear++:bull++);
  const isBear = bear > bull, ratio = isBear ? bear/(bear+bull) : bull/(bear+bull);
  let bars = '';
  for (let i=0;i<10;i++) {
    const filled = isBear ? i<Math.round(ratio*10) : i>=(10-Math.round(ratio*10));
    const h = isBear ? 6+Math.round((1-i/9)*16) : 6+Math.round((i/9)*16);
    bars += `<span class="sentiment-block" style="height:${h}px;background:${filled?(isBear?'var(--negative)':'var(--positive)'):'var(--text-muted)'};opacity:${filled?1:0.25}"></span>`;
  }
  el.innerHTML = `<div class="sentiment-indicator"><div class="sentiment-blocks">${bars}</div><span class="sentiment-label" style="color:${isBear?'var(--negative)':'var(--positive)'}">${isBear?'Bearish':'Bullish'} Sentiment</span></div><div class="sentiment-meta">Markets Closed &middot; Mar 14, 2026, EDT</div>`;
}

function renderSummaryAccordion() {
  const el = document.getElementById('summaryAccordion');
  el.innerHTML = MARKET_HEADLINES.map((h,i) => `<div class="accordion-item ${i===0?'open':''}"><button class="accordion-header"><span class="accordion-sentiment-dot" style="background:${h.sentiment==='bearish'?'var(--negative)':'var(--positive)'}"></span><span class="accordion-title">${h.title}</span><svg class="accordion-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></button><div class="accordion-body"><p>${h.body}</p></div></div>`).join('');
  el.querySelectorAll('.accordion-header').forEach(btn => btn.addEventListener('click', () => {
    const item = btn.parentElement, was = item.classList.contains('open');
    el.querySelectorAll('.accordion-item').forEach(e => e.classList.remove('open'));
    if (!was) item.classList.add('open');
  }));
}

function renderTrendingStocks() {
  const el = document.getElementById('trendingStocks');
  const t = STOCKS.slice(0, 8);
  el.innerHTML = t.map(s => {
    const p = s.change>=0, sign = p?'+':'';
    return `<div class="stock-card"><div class="stock-card-header"><div class="stock-card-info"><div class="stock-logo-wrap">${getStockLogo(s.symbol,36)}</div><div><div class="stock-card-symbol">${s.symbol}</div><div class="stock-card-name">${s.name}</div></div></div><div class="stock-card-price"><div class="stock-card-price-value">$${fmt(s.price)}</div><div class="stock-card-price-change ${p?'positive':'negative'}">${sign}${s.pctChange.toFixed(2)}%</div></div></div><canvas class="stock-card-sparkline-bg" data-stock="${s.symbol}"></canvas></div>`;
  }).join('');
  requestAnimationFrame(() => t.forEach(s => {
    const cv = el.querySelector(`[data-stock="${s.symbol}"]`);
    drawSparkline(cv, s.data, s.change>=0?'#22c55e':'#ef4444', s.change>=0?'rgba(34,197,94,0.15)':'rgba(239,68,68,0.15)');
  }));
}

function renderHeatmapFull() {
  const el = document.getElementById('heatmapFull'); let html = '';
  for (const [name, data] of Object.entries(HEATMAP_SECTORS)) {
    const stocks = data.stocks.map(s => STOCKS.find(x => x.symbol===s)).filter(Boolean).sort((a,b) => (b.mcapVal||0)-(a.mcapVal||0));
    const total = stocks.reduce((s,x) => s+(x.mcapVal||100), 0);
    html += `<div class="treemap-sector"><div class="treemap-sector-header"><span class="treemap-sector-name">${name}</span><span class="treemap-sector-change" style="color:${data.change>=0?'var(--positive)':'var(--negative)'}">${data.change>=0?'+':''}${data.change.toFixed(2)}%</span></div><div class="treemap-sector-grid">`;
    stocks.forEach(s => {
      const w=(s.mcapVal||100)/total, tc=hmText(s.pctChange);
      html += `<div class="treemap-cell" style="background:${hmColor(s.pctChange)};flex:${Math.max(1,Math.round(w*10))};min-width:${Math.max(60,Math.round(w*400))}px;min-height:${Math.max(50,Math.round(w*200))}px"><div class="treemap-cell-symbol" style="color:${tc}">${s.symbol}</div><div class="treemap-cell-change" style="color:${tc}">${s.pctChange>=0?'+':''}${s.pctChange.toFixed(2)}%</div></div>`;
    });
    html += '</div></div>';
  }
  el.innerHTML = html;
}

let currentMarketFilter = 'all';
function renderStockTable(filter) {
  filter = filter || currentMarketFilter; currentMarketFilter = filter;
  const tbody = document.getElementById('stockTableBody');
  let stocks = [...STOCKS];
  if (filter==='gainers') stocks = stocks.filter(s=>s.change>0).sort((a,b)=>b.pctChange-a.pctChange);
  else if (filter==='losers') stocks = stocks.filter(s=>s.change<0).sort((a,b)=>a.pctChange-b.pctChange);
  else if (filter==='active') stocks.sort((a,b)=>parseFloat(b.volume)-parseFloat(a.volume));
  tbody.innerHTML = stocks.map(s => {
    const p=s.change>=0, sign=p?'+':'';
    return `<tr><td><div style="display:flex;align-items:center;gap:8px">${getStockLogo(s.symbol,24)}<span class="table-symbol">${s.symbol}</span></div></td><td class="table-name">${s.name}</td><td class="align-right table-price">$${fmt(s.price)}</td><td class="align-right table-change ${p?'positive':'negative'}">${sign}$${fmt(Math.abs(s.change))}</td><td class="align-right table-change ${p?'positive':'negative'}">${sign}${s.pctChange.toFixed(2)}%</td><td class="align-right table-volume">${s.volume}</td><td class="align-right table-mcap">${s.mcap}</td><td><canvas class="table-sparkline" data-table-stock="${s.symbol}" style="width:80px;height:30px"></canvas></td></tr>`;
  }).join('');
  requestAnimationFrame(() => stocks.forEach(s => drawSparkline(tbody.querySelector(`[data-table-stock="${s.symbol}"]`), s.data, s.change>=0?'#22c55e':'#ef4444', null)));
  document.querySelectorAll('[data-market-filter]').forEach(t => t.classList.toggle('active', t.dataset.marketFilter===filter));
}

function renderPortfolio() {
  const el = document.getElementById('holdingsList');
  // Sync prices
  HOLDINGS.forEach(h => { const s = STOCKS.find(x=>x.symbol===h.symbol); if (s) h.currentPrice = s.price; });
  let tv=0, tc=0;
  HOLDINGS.forEach(h => { tv += h.shares*h.currentPrice; tc += h.shares*h.avgCost; });
  const tg = tv-tc;
  const tvEl = document.getElementById('totalValue'), tgEl = document.getElementById('totalGain');
  if (tvEl) tvEl.textContent = `$${fmt(tv)}`;
  if (tgEl) { tgEl.textContent = `${tg>=0?'+':''}$${fmt(Math.abs(tg))}`; tgEl.className = `stat-value ${tg>=0?'positive':'negative'}`; }

  el.innerHTML = HOLDINGS.map((h,idx) => {
    const val=h.shares*h.currentPrice, pnl=val-h.shares*h.avgCost, pct=(pnl/(h.shares*h.avgCost))*100;
    const p=pnl>=0, sign=p?'+':'';
    return `<div class="holding-item"><div class="holding-info"><div class="stock-logo-wrap">${getStockLogo(h.symbol,36)}</div><div><div class="holding-symbol">${h.symbol}</div><div class="holding-name">${h.name}</div></div></div><div class="holding-shares">${h.shares} shares</div><div class="holding-value">$${fmt(val)}</div><div class="holding-pnl ${p?'positive':'negative'}">${sign}$${fmt(Math.abs(pnl))} (${sign}${pct.toFixed(1)}%)</div><div class="holding-actions"><button class="holding-edit-btn" data-edit-idx="${idx}" title="Edit"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button><button class="holding-delete-btn" data-del-idx="${idx}" title="Remove"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg></button></div></div>`;
  }).join('');

  // Edit/delete handlers
  el.querySelectorAll('.holding-edit-btn').forEach(btn => btn.addEventListener('click', (e) => {
    e.stopPropagation();
    openEditHolding(parseInt(btn.dataset.editIdx));
  }));
  el.querySelectorAll('.holding-delete-btn').forEach(btn => btn.addEventListener('click', (e) => {
    e.stopPropagation();
    HOLDINGS.splice(parseInt(btn.dataset.delIdx), 1);
    saveHoldings(); renderPortfolio();
  }));
  drawPortfolioChart();
}

function drawPortfolioChart() {
  const canvas = document.getElementById('portfolioCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d'), cont = canvas.parentElement;
  const w = cont.offsetWidth-40, h = cont.offsetHeight-40;
  canvas.width=w*2; canvas.height=h*2; canvas.style.width=w+'px'; canvas.style.height=h+'px';
  ctx.scale(2,2);
  const data=[]; let val=100000;
  for (let i=0;i<60;i++) { val+=(Math.random()-0.4)*800; data.push(val); }
  const min=Math.min(...data)-500, max=Math.max(...data)+500, range=max-min;
  ctx.strokeStyle=getComputedStyle(document.documentElement).getPropertyValue('--border-subtle').trim()||'#1a1a1a';
  ctx.lineWidth=0.5;
  for(let i=0;i<=4;i++){const y=(i/4)*h;ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}
  const g=ctx.createLinearGradient(0,0,0,h);g.addColorStop(0,'rgba(212,212,216,0.12)');g.addColorStop(1,'rgba(212,212,216,0)');
  ctx.beginPath();ctx.moveTo(0,h);data.forEach((v,i)=>ctx.lineTo((i/(data.length-1))*w,h-((v-min)/range)*h));ctx.lineTo(w,h);ctx.closePath();ctx.fillStyle=g;ctx.fill();
  ctx.beginPath();data.forEach((v,i)=>{const x=(i/(data.length-1))*w,y=h-((v-min)/range)*h;i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);});
  ctx.strokeStyle='#a1a1aa';ctx.lineWidth=2;ctx.lineJoin='round';ctx.stroke();
  const lx=w,ly=h-((data[data.length-1]-min)/range)*h;
  ctx.beginPath();ctx.arc(lx,ly,4,0,Math.PI*2);ctx.fillStyle='#a1a1aa';ctx.fill();
}

let currentEarningsTab = 'upcoming';
function renderEarnings(filter) {
  filter=filter||currentEarningsTab; currentEarningsTab=filter;
  const stats=document.getElementById('earningsStats'), timeline=document.getElementById('earningsTimeline');
  let filtered=EARNINGS;
  if(filter==='upcoming') filtered=EARNINGS.filter(e=>e.status==='upcoming');
  else if(filter==='reported') filtered=EARNINGS.filter(e=>e.status==='reported');
  const up=EARNINGS.filter(e=>e.status==='upcoming').length, rep=EARNINGS.filter(e=>e.status==='reported').length;
  const beats=EARNINGS.filter(e=>e.status==='reported'&&e.beat).length, misses=EARNINGS.filter(e=>e.status==='reported'&&!e.beat).length;
  stats.innerHTML=`<div class="earnings-stat"><span class="earnings-stat-number">${up}</span><span class="earnings-stat-label">Upcoming</span></div><div class="earnings-stat"><span class="earnings-stat-number">${rep}</span><span class="earnings-stat-label">Reported</span></div><div class="earnings-stat"><span class="earnings-stat-number earnings-beat">${beats}</span><span class="earnings-stat-label">Beats</span></div><div class="earnings-stat"><span class="earnings-stat-number earnings-miss">${misses}</span><span class="earnings-stat-label">Misses</span></div>`;
  const grouped={};
  filtered.forEach(e=>{if(!grouped[e.date])grouped[e.date]=[];grouped[e.date].push(e);});
  let html='';
  for(const[date,items]of Object.entries(grouped)){
    html+=`<div class="earnings-date-group"><div class="earnings-date-header"><div class="earnings-date-dot"></div><span class="earnings-date-text">${date}, 2026</span></div><div class="earnings-date-cards">`;
    items.forEach(e=>{
      const isR=e.status==='reported', st=STOCKS.find(s=>s.symbol===e.symbol);
      const price=st?`$${fmt(st.price)}`:'', pc=st?(st.change>=0?`+${st.pctChange.toFixed(2)}%`:`${st.pctChange.toFixed(2)}%`):'';
      html+=`<div class="earnings-card ${isR?(e.beat?'earnings-card-beat':'earnings-card-miss'):''}"><div class="earnings-card-header"><div class="earnings-card-title"><div class="stock-logo-wrap">${getStockLogo(e.symbol,32)}</div><div><div class="earnings-card-symbol">${e.symbol}</div><div class="earnings-card-name">${e.name}</div></div></div><div class="earnings-card-meta"><span class="earnings-card-time">${e.time==='AMC'?'After Close':'Before Open'}</span>${isR?`<span class="earnings-badge ${e.beat?'badge-beat':'badge-miss'}">${e.beat?'Beat':'Miss'}</span>`:'<span class="earnings-badge badge-upcoming">Upcoming</span>'}</div></div><div class="earnings-card-body"><div class="earnings-row">${isR?`<div class="earnings-metric"><span class="earnings-metric-label">EPS Act</span><span class="earnings-metric-value ${e.beat?'earnings-beat':'earnings-miss'}">${e.actEPS}</span></div><div class="earnings-metric"><span class="earnings-metric-label">EPS Est</span><span class="earnings-metric-value">${e.estEPS}</span></div><div class="earnings-metric"><span class="earnings-metric-label">Rev Act</span><span class="earnings-metric-value ${e.beat?'earnings-beat':'earnings-miss'}">${e.actRev}</span></div><div class="earnings-metric"><span class="earnings-metric-label">Rev Est</span><span class="earnings-metric-value">${e.estRev}</span></div>`:`<div class="earnings-metric"><span class="earnings-metric-label">EPS Est</span><span class="earnings-metric-value">${e.estEPS}</span></div><div class="earnings-metric"><span class="earnings-metric-label">Rev Est</span><span class="earnings-metric-value">${e.estRev}</span></div><div class="earnings-metric"><span class="earnings-metric-label">Price</span><span class="earnings-metric-value">${price}</span></div><div class="earnings-metric"><span class="earnings-metric-label">Change</span><span class="earnings-metric-value ${st&&st.change>=0?'positive':'negative'}">${pc}</span></div>`}</div></div></div>`;
    });
    html+='</div></div>';
  }
  timeline.innerHTML=html;
  document.querySelectorAll('#earningsTabs .tab').forEach(t=>t.classList.toggle('active',t.dataset.earningsTab===filter));
}

function renderWatchlist() {
  const el = document.getElementById('watchlistGrid');
  const stocks = WATCHLIST.map(sym => STOCKS.find(s=>s.symbol===sym)).filter(Boolean);
  el.innerHTML = stocks.map((s,i) => {
    const p=s.change>=0, sign=p?'+':'';
    return `<div class="watchlist-card"><button class="watchlist-remove" data-watch-idx="${i}" title="Remove">&times;</button><div class="watchlist-card-top"><div class="watchlist-info"><div class="stock-logo-wrap">${getStockLogo(s.symbol,36)}</div><div><div class="watchlist-symbol">${s.symbol}</div><div class="watchlist-name">${s.name}</div></div></div><div class="watchlist-price-group"><div class="watchlist-price">$${fmt(s.price)}</div><div class="watchlist-change ${p?'positive':'negative'}">${sign}${s.pctChange.toFixed(2)}%</div></div></div><canvas class="watchlist-sparkline-bg" data-watch="${s.symbol}"></canvas></div>`;
  }).join('');
  requestAnimationFrame(() => stocks.forEach(s => {
    const cv=el.querySelector(`[data-watch="${s.symbol}"]`);
    drawSparkline(cv, s.data, s.change>=0?'#22c55e':'#ef4444', s.change>=0?'rgba(34,197,94,0.12)':'rgba(239,68,68,0.12)');
  }));
  // Remove handlers
  el.querySelectorAll('.watchlist-remove').forEach(btn => btn.addEventListener('click', (e) => {
    e.stopPropagation();
    WATCHLIST.splice(parseInt(btn.dataset.watchIdx), 1);
    saveWatchlist(); renderWatchlist();
  }));
}

// --- Edit Holding Modal ---
let editingHoldingIdx = -1;
function openEditHolding(idx) {
  editingHoldingIdx = idx;
  const h = HOLDINGS[idx];
  const modal = document.getElementById('editHoldingModal');
  document.getElementById('editHoldingTitle').textContent = `Edit ${h.symbol}`;
  document.getElementById('editShares').value = h.shares;
  document.getElementById('editAvgCost').value = h.avgCost.toFixed(2);
  modal.classList.add('open');
}

function initEditHoldingModal() {
  const modal = document.getElementById('editHoldingModal');
  const overlay = document.getElementById('editHoldingOverlay');
  const form = document.getElementById('editHoldingForm');
  const closeBtn = document.getElementById('editHoldingClose');
  const deleteBtn = document.getElementById('editHoldingDelete');

  function close() { modal.classList.remove('open'); editingHoldingIdx = -1; }
  overlay.addEventListener('click', close);
  closeBtn.addEventListener('click', close);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (editingHoldingIdx < 0) return;
    HOLDINGS[editingHoldingIdx].shares = parseFloat(document.getElementById('editShares').value);
    HOLDINGS[editingHoldingIdx].avgCost = parseFloat(document.getElementById('editAvgCost').value);
    saveHoldings(); close(); renderPortfolio();
  });

  deleteBtn.addEventListener('click', () => {
    if (editingHoldingIdx < 0) return;
    HOLDINGS.splice(editingHoldingIdx, 1);
    saveHoldings(); close(); renderPortfolio();
  });
}

// --- Stock Picker Modal (for portfolio/watchlist) ---
let stockPickerMode = 'watchlist'; // 'watchlist' or 'portfolio'

function initStockPicker() {
  const modal = document.getElementById('stockPickerModal');
  const overlay = document.getElementById('stockPickerOverlay');
  const input = document.getElementById('stockPickerInput');
  const results = document.getElementById('stockPickerResults');

  function close() { modal.classList.remove('open'); input.value = ''; showPickerDefault(); }
  overlay.addEventListener('click', close);

  function showPickerDefault() {
    const exclude = stockPickerMode === 'watchlist' ? WATCHLIST : HOLDINGS.map(h=>h.symbol);
    const available = STOCKS.filter(s => !exclude.includes(s.symbol)).slice(0, 6);
    results.innerHTML = `<div class="search-results-list"><p class="search-quick-label">Available stocks</p>${available.map(s => stockPickerItem(s)).join('')}</div>`;
    attachPickerHandlers();
  }

  function stockPickerItem(s) {
    const p=s.change>=0, sign=p?'+':'';
    return `<div class="search-result-item" data-pick-symbol="${s.symbol}"><div class="search-result-info"><div class="stock-logo-wrap">${getStockLogo(s.symbol,32)}</div><div><div class="search-result-symbol">${s.symbol}</div><div class="search-result-name">${s.name} &middot; ${s.sector}</div></div></div><div class="search-result-price"><div class="search-result-price-val">$${fmt(s.price)}</div><div class="search-result-change ${p?'positive':'negative'}">${sign}${s.pctChange.toFixed(2)}%</div></div></div>`;
  }

  function attachPickerHandlers() {
    results.querySelectorAll('[data-pick-symbol]').forEach(item => item.addEventListener('click', () => {
      const sym = item.dataset.pickSymbol;
      const stock = STOCKS.find(s=>s.symbol===sym);
      if (!stock) return;

      if (stockPickerMode === 'watchlist') {
        if (!WATCHLIST.includes(sym)) { WATCHLIST.push(sym); saveWatchlist(); renderWatchlist(); }
      } else {
        if (!HOLDINGS.find(h=>h.symbol===sym)) {
          HOLDINGS.push({ symbol: sym, name: stock.name, shares: 10, avgCost: stock.price, currentPrice: stock.price });
          saveHoldings(); renderPortfolio();
        }
      }
      close();
    }));
  }

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    if (!q) { showPickerDefault(); return; }
    const exclude = stockPickerMode === 'watchlist' ? WATCHLIST : HOLDINGS.map(h=>h.symbol);
    const matched = STOCKS.filter(s => !exclude.includes(s.symbol) && (s.symbol.toLowerCase().includes(q) || s.name.toLowerCase().includes(q))).slice(0,8);
    if (!matched.length) { results.innerHTML = '<div class="search-no-results"><p>No matching stocks</p></div>'; return; }
    results.innerHTML = `<div class="search-results-list"><p class="search-quick-label">Results</p>${matched.map(s => stockPickerItem(s)).join('')}</div>`;
    attachPickerHandlers();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) close();
  });

  // Button triggers
  document.getElementById('addWatchBtn').addEventListener('click', () => {
    stockPickerMode = 'watchlist';
    input.placeholder = 'Search for a stock to watch...';
    modal.classList.add('open'); setTimeout(() => input.focus(), 50);
    showPickerDefault();
  });

  document.getElementById('addHoldingBtn').addEventListener('click', () => {
    stockPickerMode = 'portfolio';
    input.placeholder = 'Search for a stock to add to portfolio...';
    modal.classList.add('open'); setTimeout(() => input.focus(), 50);
    showPickerDefault();
  });
}

// --- Navigation ---
function navigateTo(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const t = document.getElementById(`page-${page}`); if (t) t.classList.add('active');
  document.querySelectorAll('.nav-item').forEach(i => i.classList.toggle('active', i.dataset.page===page));
  document.querySelectorAll('.mobile-nav-item').forEach(i => i.classList.toggle('active', i.dataset.page===page));
  if(page==='markets') renderStockTable();
  if(page==='heatmap') renderHeatmapFull();
  if(page==='portfolio') renderPortfolio();
  if(page==='earnings') renderEarnings();
  if(page==='watchlist') renderWatchlist();
}

function initNavigation() {
  document.querySelectorAll('.nav-item[data-page]').forEach(i => i.addEventListener('click', e => { e.preventDefault(); navigateTo(i.dataset.page); }));
  document.querySelectorAll('.mobile-nav-item[data-page]').forEach(i => i.addEventListener('click', e => { e.preventDefault(); navigateTo(i.dataset.page); }));
  document.querySelectorAll('.section-link[data-page]').forEach(l => l.addEventListener('click', e => { e.preventDefault(); navigateTo(l.dataset.page); }));

  document.getElementById('marketOverviewTabs').addEventListener('click', e => {
    const t = e.target.closest('.tab');
    if (t && t.dataset.marketTab) { e.preventDefault(); e.stopPropagation(); renderIndexCards(t.dataset.marketTab); }
  });

  const mp = document.getElementById('page-markets');
  if (mp) { const ft = mp.querySelector('.section-tabs'); if (ft) ft.addEventListener('click', e => { const t=e.target.closest('.tab'); if(t&&t.dataset.marketFilter){e.preventDefault();e.stopPropagation();renderStockTable(t.dataset.marketFilter);}}); }

  const et = document.getElementById('earningsTabs');
  if (et) et.addEventListener('click', e => { const t=e.target.closest('.tab'); if(t&&t.dataset.earningsTab){e.preventDefault();e.stopPropagation();renderEarnings(t.dataset.earningsTab);}});

  const rb = document.getElementById('refreshSummary');
  if (rb) rb.addEventListener('click', e => {
    e.preventDefault(); rb.classList.add('spinning');
    setTimeout(() => { renderSummaryAccordion(); const b=document.getElementById('summaryUpdated'); if(b)b.textContent='Updated just now'; rb.classList.remove('spinning'); }, 800);
  });

  document.querySelectorAll('.section-tabs').forEach(tg => {
    if(tg.id==='marketOverviewTabs'||tg.id==='earningsTabs'||tg.closest('#page-markets')) return;
    tg.addEventListener('click', e => { const t=e.target.closest('.tab'); if(t&&!t.dataset.marketTab&&!t.dataset.earningsTab&&!t.dataset.marketFilter){ tg.querySelectorAll('.tab').forEach(x=>x.classList.remove('active')); t.classList.add('active'); }});
  });
}

function initThemeToggle() {
  const toggle=document.getElementById('themeToggle'), html=document.documentElement;
  const saved=localStorage.getItem('trinity-theme'); if(saved)html.setAttribute('data-theme',saved);
  toggle.addEventListener('click',()=>{
    const next=html.getAttribute('data-theme')==='dark'?'light':'dark';
    html.setAttribute('data-theme',next); localStorage.setItem('trinity-theme',next);
    requestAnimationFrame(()=>{const a=document.querySelector('.page.active');if(a&&a.id==='page-portfolio')drawPortfolioChart();});
  });
}

// --- AI Search Modal ---
function initSearchModal() {
  const modal = document.getElementById('searchModal');
  const overlay = document.getElementById('searchModalOverlay');
  const searchInput = document.getElementById('searchInput');
  const modalInput = document.getElementById('modalSearchInput');
  const results = document.getElementById('searchResults');

  function open() { modal.classList.add('open'); setTimeout(() => modalInput.focus(), 50); showDefault(); }
  function close() { modal.classList.remove('open'); modalInput.value = ''; showDefault(); }

  function showDefault() {
    results.innerHTML = `<div class="search-quick-links"><p class="search-quick-label">Ask me anything</p>
      <a href="#" class="search-quick-item" data-query="NVDA"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>NVDA stock analysis</a>
      <a href="#" class="search-quick-item" data-query="dividend"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>Best dividend stocks 2026</a>
      <a href="#" class="search-quick-item" data-query="crypto"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>Crypto market outlook</a>
      <a href="#" class="search-quick-item" data-query="etf"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>Best performing ETFs</a></div>`;
    results.querySelectorAll('[data-query]').forEach(item => item.addEventListener('click', (e) => {
      e.preventDefault();
      modalInput.value = item.dataset.query;
      performSearch(item.dataset.query);
    }));
  }

  function getAIResponse(query) {
    const q = query.toLowerCase();
    // Check if it's a stock symbol
    const stock = STOCKS.find(s => s.symbol.toLowerCase() === q || s.name.toLowerCase().includes(q));
    if (stock && q.length <= 5) {
      return { type: 'stock', stock: stock };
    }
    // Check AI response keywords
    for (const [key, response] of Object.entries(AI_RESPONSES)) {
      if (key !== 'default' && q.includes(key)) return { type: 'ai', text: response };
    }
    // Check for stock matches in query
    const stockMatch = STOCKS.find(s => q.includes(s.symbol.toLowerCase()));
    if (stockMatch) return { type: 'stock', stock: stockMatch };
    return { type: 'ai', text: AI_RESPONSES.default };
  }

  function performSearch(query) {
    if (!query.trim()) { showDefault(); return; }
    const q = query.toLowerCase();

    // Show loading
    results.innerHTML = '<div class="ai-answer"><div class="ai-answer-header"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg> Thinking...</div></div>';

    setTimeout(() => {
      // Find matching stocks
      const matched = STOCKS.filter(s => s.symbol.toLowerCase().includes(q) || s.name.toLowerCase().includes(q) || s.sector.toLowerCase().includes(q)).slice(0, 4);

      // Get AI response
      let aiText = AI_RESPONSES.default;
      for (const [key, resp] of Object.entries(AI_RESPONSES)) {
        if (key !== 'default' && q.includes(key)) { aiText = resp; break; }
      }

      // If exact stock match, give stock-specific response
      const exactStock = STOCKS.find(s => s.symbol.toLowerCase() === q);
      if (exactStock) {
        const p = exactStock.change >= 0;
        aiText = `**${exactStock.symbol}** (${exactStock.name}) is currently trading at $${fmt(exactStock.price)}, ${p ? 'up' : 'down'} ${Math.abs(exactStock.pctChange).toFixed(2)}% today. Market cap: ${exactStock.mcap}. Sector: ${exactStock.sector} (${exactStock.subsector}). Volume: ${exactStock.volume} shares traded today.`;
      }

      let html = '';

      // Stock cards
      if (matched.length > 0) {
        html += matched.map(s => {
          const p=s.change>=0, sign=p?'+':'';
          return `<div class="ai-stock-card" data-nav-stock="${s.symbol}"><div class="ai-stock-info"><div class="stock-logo-wrap">${getStockLogo(s.symbol,32)}</div><div class="ai-stock-details"><h4>${s.symbol}</h4><span>${s.name}</span></div></div><div class="ai-stock-price"><div class="ai-stock-price-val">$${fmt(s.price)}</div><div class="ai-stock-price-change ${p?'positive':'negative'}">${sign}${s.pctChange.toFixed(2)}%</div></div></div>`;
        }).join('');
      }

      // AI answer
      html += `<div class="ai-answer"><div class="ai-answer-header"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 8v8l10 6 10-6V8L12 2z"/><path d="M12 22V12"/><path d="M2 8l10 4 10-4"/></svg> Trinity AI</div><div class="ai-answer-body"><p>${aiText.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')}</p></div></div>`;

      results.innerHTML = html;

      // Click to navigate
      results.querySelectorAll('[data-nav-stock]').forEach(card => card.addEventListener('click', () => { close(); navigateTo('markets'); }));
    }, 400);
  }

  // Open modal from search bar
  searchInput.addEventListener('click', (e) => { e.preventDefault(); open(); });

  // Suggestion chips
  document.querySelectorAll('.suggestion-chip').forEach(chip => chip.addEventListener('click', () => {
    open();
    setTimeout(() => { modalInput.value = chip.textContent; performSearch(chip.textContent); }, 100);
  }));

  // Live search with debounce
  let searchTimeout;
  modalInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => performSearch(modalInput.value), 300);
  });

  // Enter to search
  modalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); performSearch(modalInput.value); }
  });

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey||e.ctrlKey) && e.key==='k') { e.preventDefault(); modal.classList.contains('open')?close():open(); }
    if (e.key==='Escape' && modal.classList.contains('open')) close();
  });

  overlay.addEventListener('click', close);
}

// --- Resize ---
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const a=document.querySelector('.page.active');
    if(a){if(a.id==='page-home'){renderIndexCards();renderTrendingStocks();}else if(a.id==='page-portfolio')drawPortfolioChart();}
  }, 250);
});

// --- Auth ---
function initAuth() {
  const loginPage=document.getElementById('loginPage'), sidebar=document.getElementById('sidebar'), mobileNav=document.getElementById('mobileNav'), mainContent=document.getElementById('mainContent');
  const userMenu=document.getElementById('userMenu'), userAvatar=document.getElementById('userAvatar'), userName=document.getElementById('userName'), userEmail=document.getElementById('userEmail');

  function getUser(){try{const d=localStorage.getItem('trinity-user');return d?JSON.parse(d):null;}catch(e){localStorage.removeItem('trinity-user');return null;}}
  function setUser(u){localStorage.setItem('trinity-user',JSON.stringify(u));}
  function clearUser(){localStorage.removeItem('trinity-user');}

  function showApp(u){
    loginPage.style.display='none';sidebar.style.display='';mobileNav.style.display='';mainContent.style.display='';
    if(u&&userMenu){const ini=u.name?u.name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2):'U';userAvatar.textContent=ini;userName.textContent=u.name||'User';userEmail.textContent=u.email||'';userMenu.style.display='flex';}
  }

  function showLogin(){
    loginPage.style.display='flex';sidebar.style.display='none';mobileNav.style.display='none';mainContent.style.display='none';
    if(userMenu)userMenu.style.display='none';resetLoginForm();
  }

  let isSignup = false;

  // Inline validation helpers
  function showHint(id, msg) {
    const h = document.getElementById(id);
    if (h) { h.textContent = msg; h.classList.add('visible'); }
  }
  function hideHint(id) {
    const h = document.getElementById(id);
    if (h) { h.textContent = ''; h.classList.remove('visible'); }
  }
  function setInputError(el, hasError) {
    if (hasError) el.classList.add('input-error');
    else el.classList.remove('input-error');
  }

  // Password strength
  function checkPasswordStrength(pw) {
    let score = 0;
    if (pw.length >= 6) score++;
    if (pw.length >= 10) score++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return Math.min(4, score);
  }

  function updatePasswordStrength(pw) {
    const container = document.getElementById('passwordStrength');
    const text = document.getElementById('pwStrengthText');
    if (!isSignup || !container) return;
    if (!pw) { container.style.display = 'none'; if (text) text.style.display = 'none'; return; }
    container.style.display = 'flex';
    if (text) text.style.display = 'block';
    const score = checkPasswordStrength(pw);
    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
    const classes = ['', 'weak', 'medium', 'medium', 'strong'];
    for (let i = 1; i <= 4; i++) {
      const bar = document.getElementById('pwBar' + i);
      if (bar) { bar.className = 'password-strength-bar'; if (i <= score) bar.classList.add(classes[score]); }
    }
    if (text) text.textContent = labels[score] || '';
  }

  // Attach inline validation events
  const emailInput = document.getElementById('loginEmail');
  const pwInput = document.getElementById('loginPassword');

  emailInput.addEventListener('blur', function() {
    if (this.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value)) {
      setInputError(this, true);
      showHint('emailHint', 'Please enter a valid email address');
    } else {
      setInputError(this, false);
      hideHint('emailHint');
    }
  });

  emailInput.addEventListener('input', function() {
    setInputError(this, false);
    hideHint('emailHint');
  });

  pwInput.addEventListener('input', function() {
    setInputError(this, false);
    hideHint('passwordHint');
    updatePasswordStrength(this.value);
  });

  pwInput.addEventListener('blur', function() {
    if (this.value && this.value.length < 6) {
      setInputError(this, true);
      showHint('passwordHint', 'Password must be at least 6 characters');
    }
  });

  function resetLoginForm(){
    isSignup=false;
    const title=document.querySelector('.login-title'),sub=document.querySelector('.login-subtitle'),btn=document.getElementById('loginBtn'),footer=document.querySelector('.login-footer'),form=document.getElementById('loginForm'),err=document.getElementById('loginError');
    if(title)title.textContent='Welcome back';if(sub)sub.textContent='Sign in to access your portfolios and market data';if(btn)btn.textContent='Sign in';if(err)err.textContent='';if(form)form.reset();
    hideHint('emailHint'); hideHint('passwordHint');
    setInputError(emailInput, false); setInputError(pwInput, false);
    const pwStr = document.getElementById('passwordStrength'); if(pwStr) pwStr.style.display='none';
    const pwTxt = document.getElementById('pwStrengthText'); if(pwTxt) pwTxt.style.display='none';
    ['signupNameGroup','signupConfirmGroup','signupTermsRow'].forEach(id=>{const el=document.getElementById(id);if(el)el.remove();});
    // Restore the form-row if it was replaced
    const existingRow = form.querySelector('.form-row');
    if (!existingRow) {
      const fr = document.createElement('div'); fr.className='form-row';
      fr.innerHTML='<label class="form-checkbox"><input type="checkbox" id="rememberMe"><span>Remember me</span></label><a href="#" class="form-link">Forgot password?</a>';
      const btnEl = form.querySelector('.btn-login');
      if (btnEl) form.insertBefore(fr, btnEl);
    }
    if(footer){footer.innerHTML='<p>Don\'t have an account? <a href="#" class="form-link" id="showSignup">Sign up</a></p>';document.getElementById('showSignup').addEventListener('click',handleSignup);}
  }

  function handleSignup(e){
    e.preventDefault();isSignup=true;
    const title=document.querySelector('.login-title'),sub=document.querySelector('.login-subtitle'),btn=document.getElementById('loginBtn'),footer=document.querySelector('.login-footer'),form=document.getElementById('loginForm'),err=document.getElementById('loginError');
    if(title)title.textContent='Create your account';if(sub)sub.textContent='Join Trinity Finance and start tracking your investments';if(btn)btn.textContent='Create account';if(err)err.textContent='';
    const emailGrp=form.querySelector('.form-group');
    if(emailGrp&&!document.getElementById('signupNameGroup')){const ng=document.createElement('div');ng.className='form-group';ng.id='signupNameGroup';ng.innerHTML='<label class="form-label" for="signupName">Full Name</label><input type="text" class="form-input" id="signupName" placeholder="John Doe" required>';emailGrp.parentNode.insertBefore(ng,emailGrp);}
    const fr=form.querySelector('.form-row');
    if(fr&&!document.getElementById('signupConfirmGroup')){const cg=document.createElement('div');cg.className='form-group';cg.id='signupConfirmGroup';cg.innerHTML='<label class="form-label" for="signupConfirm">Confirm Password</label><input type="password" class="form-input" id="signupConfirm" placeholder="Confirm your password" required>';fr.parentNode.insertBefore(cg,fr);}
    if(fr){fr.id='signupTermsRow';fr.innerHTML='<label class="form-checkbox"><input type="checkbox" id="agreeTerms"><span>I agree to the Terms of Service and Privacy Policy</span></label>';}
    if(footer){footer.innerHTML='<p>Already have an account? <a href="#" class="form-link" id="showLogin">Sign in</a></p>';document.getElementById('showLogin').addEventListener('click',e2=>{e2.preventDefault();resetLoginForm();});}
    // Show password strength bar for signup
    updatePasswordStrength(pwInput.value);
  }

  const eu=getUser(); if(eu)showApp(eu);else showLogin();

  document.getElementById('loginForm').addEventListener('submit',e=>{
    e.preventDefault();const err=document.getElementById('loginError');err.textContent='';
    const email=document.getElementById('loginEmail').value.trim(),pw=document.getElementById('loginPassword').value;
    const btn=document.getElementById('loginBtn');

    // Inline validation
    let valid = true;
    if(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      setInputError(emailInput, true); showHint('emailHint', 'Please enter a valid email address'); valid=false;
    }
    if(!pw || pw.length<6){
      setInputError(pwInput, true); showHint('passwordHint', 'Password must be at least 6 characters'); valid=false;
    }
    if(!valid) return;

    if(isSignup){
      const ni=document.getElementById('signupName'),ci=document.getElementById('signupConfirm'),ti=document.getElementById('agreeTerms');
      if(ni&&!ni.value.trim()){err.textContent='Please enter your name.';return;}
      if(ci&&ci.value!==pw){err.textContent='Passwords do not match.';return;}
      if(ti&&!ti.checked){err.textContent='Please agree to the Terms of Service.';return;}
      // Loading state
      btn.disabled=true;btn.textContent='Creating account...';
      setTimeout(()=>{
        setUser({name:ni?ni.value.trim():'User',email,provider:'email'});
        btn.disabled=false;
        showApp({name:ni?ni.value.trim():'User',email});
      },500);
    }else{
      btn.disabled=true;btn.textContent='Signing in...';
      setTimeout(()=>{
        const name=email.split('@')[0].replace(/[._]/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
        setUser({name,email,provider:'email'});
        btn.disabled=false;
        showApp({name,email});
      },500);
    }
  });

  document.getElementById('googleSignIn').addEventListener('click',function(e){
    e.preventDefault();e.stopPropagation();
    const err=document.getElementById('loginError');if(err)err.textContent='';
    this.disabled=true;this.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spinning-icon"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> Signing in...';
    const btn=this;
    setTimeout(()=>{const u={name:'Google User',email:'user@gmail.com',provider:'google'};setUser(u);btn.disabled=false;btn.innerHTML='<svg width="18" height="18" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/><path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 2.58 9 2.58z" fill="#EA4335"/></svg> Continue with Google';showApp(u);},800);
  });

  const sl=document.getElementById('showSignup');if(sl)sl.addEventListener('click',handleSignup);
  document.getElementById('logoutBtn').addEventListener('click',e=>{e.preventDefault();clearUser();showLogin();});
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  renderIndexCards('us');
  renderSentimentBar();
  renderSummaryAccordion();
  renderTrendingStocks();
  initNavigation();
  initThemeToggle();
  initSearchModal();
  initStockPicker();
  initEditHoldingModal();
  fetchRealPrices();
});
