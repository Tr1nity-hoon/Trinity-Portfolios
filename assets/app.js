// ============================================
// Trinity Finance — Interactive Dashboard
// ============================================

// --- Mock Data ---
const MARKET_INDICES = [
  { name: 'S&P 500', symbol: 'SPX', value: 5892.34, change: 72.41, pctChange: 1.24, data: [] },
  { name: 'NASDAQ', symbol: 'IXIC', value: 19234.56, change: 245.89, pctChange: 1.29, data: [] },
  { name: 'DOW', symbol: 'DJI', value: 43521.78, change: 312.56, pctChange: 0.72, data: [] },
  { name: 'VIX', symbol: 'VIX', value: 14.23, change: -1.45, pctChange: -9.25, data: [] },
];

const STOCKS = [
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: 924.56, change: 38.72, pctChange: 4.37, volume: '52.3M', mcap: '2.28T', sector: 'Technology' },
  { symbol: 'AAPL', name: 'Apple Inc', price: 213.45, change: 3.21, pctChange: 1.53, volume: '48.1M', mcap: '3.28T', sector: 'Technology' },
  { symbol: 'MSFT', name: 'Microsoft Corp', price: 445.67, change: 8.34, pctChange: 1.91, volume: '22.7M', mcap: '3.31T', sector: 'Technology' },
  { symbol: 'AMZN', name: 'Amazon.com Inc', price: 198.23, change: -2.15, pctChange: -1.07, volume: '35.4M', mcap: '2.04T', sector: 'Consumer' },
  { symbol: 'GOOGL', name: 'Alphabet Inc', price: 175.89, change: 2.67, pctChange: 1.54, volume: '20.1M', mcap: '2.17T', sector: 'Technology' },
  { symbol: 'META', name: 'Meta Platforms', price: 567.12, change: 12.45, pctChange: 2.24, volume: '18.9M', mcap: '1.44T', sector: 'Technology' },
  { symbol: 'TSLA', name: 'Tesla Inc', price: 312.34, change: -8.56, pctChange: -2.67, volume: '67.2M', mcap: '993B', sector: 'Consumer' },
  { symbol: 'BRK.B', name: 'Berkshire Hathaway', price: 456.78, change: 5.43, pctChange: 1.20, volume: '3.4M', mcap: '1.00T', sector: 'Financial' },
  { symbol: 'JPM', name: 'JPMorgan Chase', price: 234.56, change: 4.12, pctChange: 1.79, volume: '8.9M', mcap: '678B', sector: 'Financial' },
  { symbol: 'V', name: 'Visa Inc', price: 312.89, change: 1.23, pctChange: 0.39, volume: '6.2M', mcap: '612B', sector: 'Financial' },
  { symbol: 'UNH', name: 'UnitedHealth Group', price: 534.12, change: -6.78, pctChange: -1.25, volume: '4.1M', mcap: '492B', sector: 'Healthcare' },
  { symbol: 'XOM', name: 'Exxon Mobil', price: 112.34, change: -1.56, pctChange: -1.37, volume: '12.8M', mcap: '468B', sector: 'Energy' },
  { symbol: 'LLY', name: 'Eli Lilly', price: 823.45, change: 15.67, pctChange: 1.94, volume: '5.6M', mcap: '782B', sector: 'Healthcare' },
  { symbol: 'JNJ', name: 'Johnson & Johnson', price: 156.78, change: 0.89, pctChange: 0.57, volume: '7.3M', mcap: '378B', sector: 'Healthcare' },
  { symbol: 'AVGO', name: 'Broadcom Inc', price: 178.92, change: 6.34, pctChange: 3.67, volume: '14.2M', mcap: '830B', sector: 'Technology' },
  { symbol: 'PG', name: 'Procter & Gamble', price: 167.34, change: -0.45, pctChange: -0.27, volume: '5.8M', mcap: '394B', sector: 'Consumer' },
  { symbol: 'MA', name: 'Mastercard Inc', price: 523.45, change: 3.21, pctChange: 0.62, volume: '3.1M', mcap: '497B', sector: 'Financial' },
  { symbol: 'HD', name: 'Home Depot', price: 412.56, change: -3.78, pctChange: -0.91, volume: '4.5M', mcap: '409B', sector: 'Consumer' },
  { symbol: 'COST', name: 'Costco', price: 912.34, change: 7.89, pctChange: 0.87, volume: '2.3M', mcap: '405B', sector: 'Consumer' },
  { symbol: 'NFLX', name: 'Netflix Inc', price: 789.12, change: 18.45, pctChange: 2.39, volume: '9.7M', mcap: '341B', sector: 'Technology' },
  { symbol: 'CRM', name: 'Salesforce Inc', price: 312.45, change: -4.56, pctChange: -1.44, volume: '6.4M', mcap: '302B', sector: 'Technology' },
  { symbol: 'AMD', name: 'AMD Inc', price: 178.34, change: 5.67, pctChange: 3.28, volume: '45.6M', mcap: '288B', sector: 'Technology' },
  { symbol: 'WMT', name: 'Walmart Inc', price: 89.12, change: 0.45, pctChange: 0.51, volume: '11.2M', mcap: '577B', sector: 'Consumer' },
  { symbol: 'DIS', name: 'Walt Disney', price: 112.67, change: -1.23, pctChange: -1.08, volume: '8.4M', mcap: '206B', sector: 'Consumer' },
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
  'Technology': ['AAPL', 'MSFT', 'NVDA', 'GOOGL', 'META', 'AVGO', 'AMD', 'CRM', 'NFLX'],
  'Financial': ['JPM', 'V', 'MA', 'BRK.B'],
  'Healthcare': ['UNH', 'LLY', 'JNJ'],
  'Consumer': ['AMZN', 'TSLA', 'WMT', 'HD', 'PG', 'COST', 'DIS'],
  'Energy': ['XOM'],
};

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

  // Fill
  if (fillColor) {
    ctx.beginPath();
    ctx.moveTo(0, h);
    data.forEach((val, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((val - min) / range) * (h - 4) - 2;
      if (i === 0) ctx.lineTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
  }

  // Line
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
  const ratio = (clamped + 5) / 10;
  if (ratio < 0.5) {
    const t = ratio / 0.5;
    const r = Math.round(220 - t * 113);
    const g = Math.round(38 + t * 69);
    const b = Math.round(38 + t * 89);
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    const t = (ratio - 0.5) / 0.5;
    const r = Math.round(107 - t * 73);
    const g = Math.round(107 + t * 90);
    const b = Math.round(127 - t * 61);
    return `rgb(${r}, ${g}, ${b})`;
  }
}

function formatNumber(n) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// --- Generate sparkline data for all items ---
MARKET_INDICES.forEach(idx => {
  idx.data = generateSparklineData(30, 0.015, idx.pctChange > 0 ? 0.02 : -0.02);
});

STOCKS.forEach(stock => {
  stock.data = generateSparklineData(20, 0.02, stock.pctChange > 0 ? 0.015 : -0.015);
});

// --- Render Functions ---
function renderIndexCards() {
  const container = document.getElementById('indexCards');
  container.innerHTML = MARKET_INDICES.map(idx => {
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

  // Draw sparklines
  requestAnimationFrame(() => {
    MARKET_INDICES.forEach(idx => {
      const canvas = container.querySelector(`[data-idx="${idx.symbol}"]`);
      const color = idx.change >= 0 ? '#22c55e' : '#ef4444';
      const fill = idx.change >= 0 ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)';
      drawSparkline(canvas, idx.data, color, fill);
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
  container.innerHTML = previewStocks.map(stock => `
    <div class="heatmap-cell" style="background:${getHeatmapColor(stock.pctChange)}">
      <div class="heatmap-cell-symbol">${stock.symbol}</div>
      <div class="heatmap-cell-change">${stock.pctChange >= 0 ? '+' : ''}${stock.pctChange.toFixed(2)}%</div>
    </div>
  `).join('');
}

function renderHeatmapFull() {
  const container = document.getElementById('heatmapFull');
  let html = '';
  for (const [sector, symbols] of Object.entries(HEATMAP_SECTORS)) {
    symbols.forEach(sym => {
      const stock = STOCKS.find(s => s.symbol === sym);
      if (!stock) return;
      // Vary size based on market cap importance
      const sizeMultiplier = symbols.length <= 3 ? 1.5 : 1;
      html += `
        <div class="heatmap-cell" style="background:${getHeatmapColor(stock.pctChange)};flex-basis:${80 * sizeMultiplier}px;min-height:${60 * sizeMultiplier}px" title="${stock.name} - ${sector}">
          <div class="heatmap-cell-symbol">${stock.symbol}</div>
          <div class="heatmap-cell-change">${stock.pctChange >= 0 ? '+' : ''}${stock.pctChange.toFixed(2)}%</div>
        </div>
      `;
    });
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
  // Render holdings list
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

  // Draw portfolio chart
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

  // Generate portfolio performance data
  const data = [];
  let val = 100000;
  for (let i = 0; i < 60; i++) {
    val += (Math.random() - 0.4) * 800;
    data.push(val);
  }

  const min = Math.min(...data) - 500;
  const max = Math.max(...data) + 500;
  const range = max - min;

  // Grid lines
  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border-subtle').trim() || '#1a1a1a';
  ctx.lineWidth = 0.5;
  for (let i = 0; i <= 4; i++) {
    const y = (i / 4) * h;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Fill
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

  // Line
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

  // End dot
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
  // Update pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(`page-${page}`);
  if (target) target.classList.add('active');

  // Update sidebar nav
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === page);
  });

  // Update mobile nav
  document.querySelectorAll('.mobile-nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === page);
  });

  // Lazy render pages
  if (page === 'markets') renderStockTable();
  if (page === 'heatmap') renderHeatmapFull();
  if (page === 'portfolio') renderPortfolio();
  if (page === 'earnings') renderEarnings();
  if (page === 'watchlist') renderWatchlist();
}

// --- Event Listeners ---
function initNavigation() {
  // Sidebar nav
  document.querySelectorAll('.nav-item[data-page]').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(item.dataset.page);
    });
  });

  // Mobile nav
  document.querySelectorAll('.mobile-nav-item[data-page]').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(item.dataset.page);
    });
  });

  // Section links
  document.querySelectorAll('.section-link[data-page]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(link.dataset.page);
    });
  });

  // Tab interactions (visual toggle only)
  document.querySelectorAll('.section-tabs').forEach(tabGroup => {
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

  // Check saved preference
  const saved = localStorage.getItem('trinity-theme');
  if (saved) html.setAttribute('data-theme', saved);

  toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('trinity-theme', next);

    // Redraw charts for new theme
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

  // Open on input click
  input.addEventListener('focus', (e) => {
    e.preventDefault();
    input.blur();
    openModal();
  });

  // Open on suggestion click
  document.querySelectorAll('.suggestion-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      openModal();
      setTimeout(() => { modalInput.value = chip.textContent; }, 100);
    });
  });

  // Keyboard shortcut
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

  // Close on overlay click
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

// --- Initialize ---
document.addEventListener('DOMContentLoaded', () => {
  renderIndexCards();
  renderTrendingStocks();
  renderHeatmapPreview();
  initNavigation();
  initThemeToggle();
  initSearchModal();
});
