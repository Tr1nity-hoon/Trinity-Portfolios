// ============================================
// Trinity Finance — Interactive Dashboard
// ============================================

// --- Mock Data ---
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

// --- Utility Functions ---
function generateSparklineData(length = 20, volatility = 0.02, trend = 0) {
  const data = [100];
  for (let i = 1; i < length; i++) {
    const change = (Math.random() - 0.5 + trend) * volatility * 100;
    data.push(data[i - 1] + change);
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
    ctx.beginPath();
    ctx.moveTo(0, h);
    data.forEach((val, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((val - min) / range) * (h - 4) - 2;
      ctx.lineTo(x, y);
    });
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
  }

  ctx.beginPath();
  data.forEach((val, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((val - min) / range) * (h - 4) - 2;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.stroke();
}

function getHeatmapColor(pctChange) {
  const clamped = Math.max(-5, Math.min(5, pctChange));
  if (clamped < 0) {
    const t = Math.abs(clamped) / 5;
    const r = Math.round(255 - t * 55);
    const g = Math.round(235 - t * 155);
    const b = Math.round(235 - t * 155);
    return `rgb(${r}, ${g}, ${b})`;
  } else if (clamped > 0) {
    const t = clamped / 5;
    const r = Math.round(235 - t * 105);
    const g = Math.round(255 - t * 55);
    const b = Math.round(235 - t * 105);
    return `rgb(${r}, ${g}, ${b})`;
  }
  return '#e5e5e5';
}

function getHeatmapTextColor(pctChange) {
  const abs = Math.abs(pctChange);
  return abs > 3 ? '#fff' : '#1a1a1a';
}

function formatNumber(n) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// --- Generate sparkline data for all stocks ---
STOCKS.forEach(stock => {
  stock.data = generateSparklineData(20, 0.02, stock.pctChange > 0 ? 0.015 : -0.015);
});

// --- Render Functions ---
function renderIndexCards(market) {
  market = market || currentMarketTab;
  currentMarketTab = market;
  const indices = MARKET_DATA[market] || MARKET_DATA.us;
  const container = document.getElementById('indexCards');

  // Generate sparkline data for these indices
  indices.forEach(idx => {
    if (!idx.data) idx.data = generateSparklineData(30, 0.015, idx.pctChange > 0 ? 0.02 : -0.02);
  });

  container.innerHTML = indices.map(idx => {
    const isPositive = idx.change >= 0;
    const sign = isPositive ? '+' : '';
    return `
      <div class="index-card">
        <div class="index-card-name">${idx.name}</div>
        <div class="index-card-value">${formatNumber(idx.value)}</div>
        <div class="index-card-change ${isPositive ? 'positive' : 'negative'}">
          ${sign}${formatNumber(idx.change)} (${sign}${idx.pctChange.toFixed(2)}%)
        </div>
        <canvas class="index-card-sparkline" data-idx="${idx.symbol}"></canvas>
      </div>
    `;
  }).join('');

  requestAnimationFrame(() => {
    indices.forEach(idx => {
      const canvas = container.querySelector(`[data-idx="${idx.symbol}"]`);
      const color = idx.change >= 0 ? '#22c55e' : '#ef4444';
      const fill = idx.change >= 0 ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)';
      drawSparkline(canvas, idx.data, color, fill);
    });
  });

  // Update active tab
  document.querySelectorAll('#marketOverviewTabs .tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.marketTab === market);
  });
}

function renderSentimentBar() {
  const container = document.getElementById('sentimentBar');
  // Count bearish/bullish from headlines
  let bearish = 0, bullish = 0;
  MARKET_HEADLINES.forEach(h => {
    if (h.sentiment === 'bearish') bearish++;
    else bullish++;
  });
  const total = bearish + bullish;
  const bearishPct = Math.round((bearish / total) * 100);
  const isBearish = bearish > bullish;
  const sentimentLabel = isBearish ? 'Bearish Sentiment' : 'Bullish Sentiment';
  const sentimentColor = isBearish ? 'var(--negative)' : 'var(--positive)';

  // Build bar segments
  let bars = '';
  for (let i = 0; i < 10; i++) {
    const filled = i < Math.round((bearish / total) * 10);
    bars += `<span class="sentiment-block ${filled ? 'filled-bearish' : 'filled-bullish'}"></span>`;
  }

  container.innerHTML = `
    <div class="sentiment-indicator">
      <div class="sentiment-blocks">${bars}</div>
      <span class="sentiment-label" style="color:${sentimentColor}">${sentimentLabel}</span>
    </div>
    <div class="sentiment-meta">Markets Closed &middot; Mar 14, 2026, EDT</div>
  `;
}

function renderSummaryAccordion() {
  const container = document.getElementById('summaryAccordion');
  container.innerHTML = MARKET_HEADLINES.map((h, i) => `
    <div class="accordion-item ${i === 0 ? 'open' : ''}">
      <button class="accordion-header" data-accordion="${i}">
        <span class="accordion-title">${h.title}</span>
        <svg class="accordion-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="accordion-body">
        <p>${h.body}</p>
      </div>
    </div>
  `).join('');

  // Add click handlers
  container.querySelectorAll('.accordion-header').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const wasOpen = item.classList.contains('open');
      // Close all
      container.querySelectorAll('.accordion-item').forEach(el => el.classList.remove('open'));
      // Toggle current
      if (!wasOpen) item.classList.add('open');
    });
  });
}

function renderTrendingStocks() {
  const container = document.getElementById('trendingStocks');
  const trending = STOCKS.slice(0, 8);
  container.innerHTML = trending.map(stock => {
    const isPositive = stock.change >= 0;
    const sign = isPositive ? '+' : '';
    return `
      <div class="stock-card">
        <div class="stock-card-header">
          <div class="stock-card-info">
            <div class="stock-logo">${stock.symbol.slice(0, 2)}</div>
            <div>
              <div class="stock-card-symbol">${stock.symbol}</div>
              <div class="stock-card-name">${stock.name}</div>
            </div>
          </div>
          <div class="stock-card-price">
            <div class="stock-card-price-value">$${formatNumber(stock.price)}</div>
            <div class="stock-card-price-change ${isPositive ? 'positive' : 'negative'}">
              ${sign}${formatNumber(stock.change)} (${sign}${stock.pctChange.toFixed(2)}%)
            </div>
          </div>
        </div>
        <div class="stock-card-chart">
          <canvas data-stock="${stock.symbol}" style="width:100%;height:100%"></canvas>
        </div>
      </div>
    `;
  }).join('');

  requestAnimationFrame(() => {
    trending.forEach(stock => {
      const canvas = container.querySelector(`[data-stock="${stock.symbol}"]`);
      const color = stock.change >= 0 ? '#22c55e' : '#ef4444';
      const fill = stock.change >= 0 ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)';
      drawSparkline(canvas, stock.data, color, fill);
    });
  });
}

function renderHeatmapPreview() {
  const container = document.getElementById('heatmapPreview');
  const previewStocks = STOCKS.slice(0, 16);
  container.innerHTML = previewStocks.map(stock => {
    const textColor = getHeatmapTextColor(stock.pctChange);
    return `
      <div class="heatmap-cell" style="background:${getHeatmapColor(stock.pctChange)}">
        <div class="heatmap-cell-symbol" style="color:${textColor}">${stock.symbol}</div>
        <div class="heatmap-cell-change" style="color:${textColor}">${stock.pctChange >= 0 ? '+' : ''}${stock.pctChange.toFixed(2)}%</div>
      </div>
    `;
  }).join('');
}

function renderHeatmapFull() {
  const container = document.getElementById('heatmapFull');
  let html = '';

  for (const [sectorName, sectorData] of Object.entries(HEATMAP_SECTORS)) {
    const sectorStocks = sectorData.stocks.map(sym => STOCKS.find(s => s.symbol === sym)).filter(Boolean);
    // Sort by market cap descending
    sectorStocks.sort((a, b) => (b.mcapVal || 0) - (a.mcapVal || 0));

    const sectorChange = sectorData.change;
    const sectorChangeStr = sectorChange >= 0 ? `+${sectorChange.toFixed(2)}%` : `${sectorChange.toFixed(2)}%`;
    const sectorColor = sectorChange >= 0 ? 'var(--positive)' : 'var(--negative)';

    // Total market cap for sizing
    const totalMcap = sectorStocks.reduce((sum, s) => sum + (s.mcapVal || 100), 0);

    html += `<div class="treemap-sector">`;
    html += `<div class="treemap-sector-header"><span class="treemap-sector-name">${sectorName}</span> <span class="treemap-sector-change" style="color:${sectorColor}">${sectorChangeStr}</span></div>`;
    html += `<div class="treemap-sector-grid">`;

    sectorStocks.forEach(stock => {
      const weight = (stock.mcapVal || 100) / totalMcap;
      const textColor = getHeatmapTextColor(stock.pctChange);
      const changeStr = stock.pctChange >= 0 ? `+${stock.pctChange.toFixed(2)}%` : `${stock.pctChange.toFixed(2)}%`;
      const minW = Math.max(60, Math.round(weight * 400));
      const minH = Math.max(50, Math.round(weight * 200));

      html += `
        <div class="treemap-cell" style="background:${getHeatmapColor(stock.pctChange)};flex:${Math.max(1, Math.round(weight * 10))};min-width:${minW}px;min-height:${minH}px" title="${stock.name} (${stock.subsector})">
          <div class="treemap-cell-symbol" style="color:${textColor}">${stock.symbol}</div>
          <div class="treemap-cell-change" style="color:${textColor}">${changeStr}</div>
        </div>
      `;
    });

    html += `</div></div>`;
  }

  container.innerHTML = html;
}

function renderStockTable() {
  const tbody = document.getElementById('stockTableBody');
  tbody.innerHTML = STOCKS.map(stock => {
    const isPositive = stock.change >= 0;
    const sign = isPositive ? '+' : '';
    return `
      <tr>
        <td class="table-symbol">${stock.symbol}</td>
        <td class="table-name">${stock.name}</td>
        <td class="align-right table-price">$${formatNumber(stock.price)}</td>
        <td class="align-right table-change ${isPositive ? 'positive' : 'negative'}">${sign}$${formatNumber(Math.abs(stock.change))}</td>
        <td class="align-right table-change ${isPositive ? 'positive' : 'negative'}">${sign}${stock.pctChange.toFixed(2)}%</td>
        <td class="align-right table-volume">${stock.volume}</td>
        <td class="align-right table-mcap">${stock.mcap}</td>
        <td><canvas class="table-sparkline" data-table-stock="${stock.symbol}" style="width:80px;height:30px"></canvas></td>
      </tr>
    `;
  }).join('');

  requestAnimationFrame(() => {
    STOCKS.forEach(stock => {
      const canvas = tbody.querySelector(`[data-table-stock="${stock.symbol}"]`);
      const color = stock.change >= 0 ? '#22c55e' : '#ef4444';
      drawSparkline(canvas, stock.data, color, null);
    });
  });
}

function renderPortfolio() {
  const container = document.getElementById('holdingsList');
  container.innerHTML = HOLDINGS.map(h => {
    const value = h.shares * h.currentPrice;
    const cost = h.shares * h.avgCost;
    const pnl = value - cost;
    const pnlPct = ((pnl / cost) * 100);
    const isPositive = pnl >= 0;
    const sign = isPositive ? '+' : '';
    return `
      <div class="holding-item">
        <div class="holding-info">
          <div class="stock-logo">${h.symbol.slice(0, 2)}</div>
          <div>
            <div class="holding-symbol">${h.symbol}</div>
            <div class="holding-name">${h.name}</div>
          </div>
        </div>
        <div class="holding-shares">${h.shares} shares</div>
        <div class="holding-value">$${formatNumber(value)}</div>
        <div class="holding-pnl ${isPositive ? 'positive' : 'negative'}">${sign}$${formatNumber(Math.abs(pnl))} (${sign}${pnlPct.toFixed(1)}%)</div>
      </div>
    `;
  }).join('');

  drawPortfolioChart();
}

function drawPortfolioChart() {
  const canvas = document.getElementById('portfolioCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const container = canvas.parentElement;
  const w = container.offsetWidth - 40;
  const h = container.offsetHeight - 40;
  canvas.width = w * 2;
  canvas.height = h * 2;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  ctx.scale(2, 2);

  const data = [];
  let val = 100000;
  for (let i = 0; i < 60; i++) {
    val += (Math.random() - 0.4) * 800;
    data.push(val);
  }

  const min = Math.min(...data) - 500;
  const max = Math.max(...data) + 500;
  const range = max - min;

  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border-subtle').trim() || '#1a1a1a';
  ctx.lineWidth = 0.5;
  for (let i = 0; i <= 4; i++) {
    const y = (i / 4) * h;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  const gradient = ctx.createLinearGradient(0, 0, 0, h);
  gradient.addColorStop(0, 'rgba(32, 178, 170, 0.15)');
  gradient.addColorStop(1, 'rgba(32, 178, 170, 0)');

  ctx.beginPath();
  ctx.moveTo(0, h);
  data.forEach((val, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((val - min) / range) * h;
    ctx.lineTo(x, y);
  });
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.beginPath();
  data.forEach((val, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((val - min) / range) * h;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = '#20b2aa';
  ctx.lineWidth = 2;
  ctx.lineJoin = 'round';
  ctx.stroke();

  const lastX = w;
  const lastY = h - ((data[data.length - 1] - min) / range) * h;
  ctx.beginPath();
  ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
  ctx.fillStyle = '#20b2aa';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(lastX, lastY, 7, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(32, 178, 170, 0.3)';
  ctx.lineWidth = 2;
  ctx.stroke();
}

function renderEarnings() {
  const container = document.getElementById('earningsGrid');
  container.innerHTML = EARNINGS.map(e => {
    const isReported = e.status === 'reported';
    return `
      <div class="earnings-card">
        <div class="earnings-card-header">
          <div class="earnings-card-title">
            <div class="stock-logo">${e.symbol.slice(0, 2)}</div>
            <div>
              <div class="earnings-card-symbol">${e.symbol}</div>
              <div class="earnings-card-name">${e.name}</div>
            </div>
          </div>
          <div class="earnings-card-date">${e.date} ${e.time}</div>
        </div>
        <div class="earnings-card-body">
          ${isReported ? `
            <div class="earnings-metric">
              <span class="earnings-metric-label">EPS Actual</span>
              <span class="earnings-metric-value ${e.beat ? 'earnings-beat' : 'earnings-miss'}">${e.actEPS}</span>
            </div>
            <div class="earnings-metric">
              <span class="earnings-metric-label">EPS Est.</span>
              <span class="earnings-metric-value">${e.estEPS}</span>
            </div>
            <div class="earnings-metric">
              <span class="earnings-metric-label">Revenue Actual</span>
              <span class="earnings-metric-value ${e.beat ? 'earnings-beat' : 'earnings-miss'}">${e.actRev}</span>
            </div>
            <div class="earnings-metric">
              <span class="earnings-metric-label">Revenue Est.</span>
              <span class="earnings-metric-value">${e.estRev}</span>
            </div>
          ` : `
            <div class="earnings-metric">
              <span class="earnings-metric-label">EPS Est.</span>
              <span class="earnings-metric-value">${e.estEPS}</span>
            </div>
            <div class="earnings-metric">
              <span class="earnings-metric-label">Revenue Est.</span>
              <span class="earnings-metric-value">${e.estRev}</span>
            </div>
          `}
        </div>
      </div>
    `;
  }).join('');
}

function renderWatchlist() {
  const container = document.getElementById('watchlistGrid');
  const watchStocks = STOCKS.slice(0, 8);
  container.innerHTML = watchStocks.map(stock => {
    const isPositive = stock.change >= 0;
    const sign = isPositive ? '+' : '';
    return `
      <div class="watchlist-card">
        <div class="watchlist-info">
          <div class="watchlist-icon">${stock.symbol.slice(0, 2)}</div>
          <div>
            <div class="watchlist-symbol">${stock.symbol}</div>
            <div class="watchlist-name">${stock.name}</div>
          </div>
        </div>
        <div class="watchlist-data">
          <canvas class="watchlist-sparkline" data-watch="${stock.symbol}" style="width:60px;height:28px"></canvas>
          <div class="watchlist-price">$${formatNumber(stock.price)}</div>
          <div class="watchlist-change ${isPositive ? 'positive' : 'negative'}">${sign}${stock.pctChange.toFixed(2)}%</div>
        </div>
      </div>
    `;
  }).join('');

  requestAnimationFrame(() => {
    watchStocks.forEach(stock => {
      const canvas = container.querySelector(`[data-watch="${stock.symbol}"]`);
      const color = stock.change >= 0 ? '#22c55e' : '#ef4444';
      drawSparkline(canvas, stock.data, color, null);
    });
  });
}

// --- Navigation ---
function navigateTo(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(`page-${page}`);
  if (target) target.classList.add('active');

  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === page);
  });

  document.querySelectorAll('.mobile-nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === page);
  });

  if (page === 'markets') renderStockTable();
  if (page === 'heatmap') renderHeatmapFull();
  if (page === 'portfolio') renderPortfolio();
  if (page === 'earnings') renderEarnings();
  if (page === 'watchlist') renderWatchlist();
}

// --- Event Listeners ---
function initNavigation() {
  document.querySelectorAll('.nav-item[data-page]').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(item.dataset.page);
    });
  });

  document.querySelectorAll('.mobile-nav-item[data-page]').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(item.dataset.page);
    });
  });

  document.querySelectorAll('.section-link[data-page]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(link.dataset.page);
    });
  });

  // Market Overview tab switching
  document.querySelectorAll('#marketOverviewTabs .tab').forEach(tab => {
    tab.addEventListener('click', () => {
      renderIndexCards(tab.dataset.marketTab);
    });
  });

  // Generic tab interactions (visual toggle for other tabs)
  document.querySelectorAll('.section-tabs').forEach(tabGroup => {
    if (tabGroup.id === 'marketOverviewTabs') return; // handled above
    tabGroup.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        tabGroup.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });
  });
}

function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  const saved = localStorage.getItem('trinity-theme');
  if (saved) html.setAttribute('data-theme', saved);

  toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('trinity-theme', next);

    requestAnimationFrame(() => {
      const activePage = document.querySelector('.page.active');
      if (activePage && activePage.id === 'page-portfolio') {
        drawPortfolioChart();
      }
    });
  });
}

function initSearchModal() {
  const modal = document.getElementById('searchModal');
  const overlay = document.getElementById('searchModalOverlay');
  const input = document.getElementById('searchInput');
  const modalInput = document.getElementById('modalSearchInput');

  function openModal() {
    modal.classList.add('open');
    setTimeout(() => modalInput.focus(), 100);
  }

  function closeModal() {
    modal.classList.remove('open');
    modalInput.value = '';
  }

  input.addEventListener('focus', (e) => {
    e.preventDefault();
    input.blur();
    openModal();
  });

  document.querySelectorAll('.suggestion-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      openModal();
      setTimeout(() => { modalInput.value = chip.textContent; }, 100);
    });
  });

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (modal.classList.contains('open')) closeModal();
      else openModal();
    }
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  overlay.addEventListener('click', closeModal);
}

// --- Window resize handler ---
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const activePage = document.querySelector('.page.active');
    if (activePage) {
      if (activePage.id === 'page-home') {
        renderIndexCards();
        renderTrendingStocks();
      } else if (activePage.id === 'page-portfolio') {
        drawPortfolioChart();
      }
    }
  }, 250);
});

// --- Authentication ---
function initAuth() {
  const loginPage = document.getElementById('loginPage');
  const loginForm = document.getElementById('loginForm');
  const loginError = document.getElementById('loginError');
  const googleSignIn = document.getElementById('googleSignIn');
  const logoutBtn = document.getElementById('logoutBtn');
  const userMenu = document.getElementById('userMenu');
  const userAvatar = document.getElementById('userAvatar');
  const userName = document.getElementById('userName');
  const userEmail = document.getElementById('userEmail');
  const sidebar = document.getElementById('sidebar');
  const mobileNav = document.getElementById('mobileNav');
  const mainContent = document.getElementById('mainContent');

  function getUser() {
    const data = localStorage.getItem('trinity-user');
    return data ? JSON.parse(data) : null;
  }

  function setUser(user) {
    localStorage.setItem('trinity-user', JSON.stringify(user));
  }

  function clearUser() {
    localStorage.removeItem('trinity-user');
  }

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
  }

  // Check existing session
  const existingUser = getUser();
  if (existingUser) {
    showApp(existingUser);
  } else {
    showLogin();
  }

  // Email/password login
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    loginError.textContent = '';

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
      loginError.textContent = 'Please enter both email and password.';
      return;
    }

    if (password.length < 6) {
      loginError.textContent = 'Password must be at least 6 characters.';
      return;
    }

    const user = {
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      email: email,
      provider: 'email'
    };
    setUser(user);
    showApp(user);
  });

  // Google Sign-In (simulated)
  googleSignIn.addEventListener('click', () => {
    loginError.textContent = '';
    const user = {
      name: 'Google User',
      email: 'user@gmail.com',
      provider: 'google'
    };
    setUser(user);
    showApp(user);
  });

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      clearUser();
      showLogin();
      loginForm.reset();
      loginError.textContent = '';
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
  renderHeatmapPreview();
  initNavigation();
  initThemeToggle();
  initSearchModal();
});
