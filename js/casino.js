document.addEventListener('DOMContentLoaded', () => {
    initGameStats();
    initRecentWins();
    initGameSpecificFeatures();
});

// Game Statistics Animation
function initGameStats() {
    const stats = document.querySelectorAll('.game-stat__number');
    const options = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const end = parseInt(target.dataset.end);
                animateValue(target, 0, end, 2000);
                observer.unobserve(target);
            }
        });
    }, options);

    stats.forEach(stat => observer.observe(stat));
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        obj.innerHTML = value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Recent Wins Live Updates
function initRecentWins() {
    const winsTable = document.querySelector('.wins-table');
    if (!winsTable) return;

    // Simulated new win data
    const sampleWins = [
        { player: 'Alex K.', bet: '₹500', type: 'Standard', multiplier: '2.5x', win: '₹1,250' },
        { player: 'Maria S.', bet: '₹1,000', type: 'Perfect 101', multiplier: '5x', win: '₹5,000' },
        { player: 'James L.', bet: '₹2,000', type: 'High Risk', multiplier: '10x', win: '₹20,000' }
    ];

    let currentIndex = 0;

    // Add new win every 5 seconds
    setInterval(() => {
        const win = sampleWins[currentIndex];
        addNewWin(win);
        currentIndex = (currentIndex + 1) % sampleWins.length;
    }, 5000);
}

function addNewWin(win) {
    const table = document.querySelector('.wins-table');
    if (!table) return;

    const row = document.createElement('div');
    row.className = 'wins-table__row';
    row.style.opacity = '0';

    // Check if it's a game with multipliers or bet types
    if (win.multiplier) {
        row.innerHTML = `
            <span class="wins-table__player">${win.player}</span>
            <span class="wins-table__bet">${win.bet}</span>
            <span class="wins-table__multiplier">${win.multiplier}</span>
            <span class="wins-table__win">${win.win}</span>
        `;
    } else {
        row.innerHTML = `
            <span class="wins-table__player">${win.player}</span>
            <span class="wins-table__bet">${win.bet}</span>
            <span class="wins-table__type">${win.type}</span>
            <span class="wins-table__win">${win.win}</span>
        `;
    }

    // Insert new row at the top
    const firstRow = table.querySelector('.wins-table__row');
    table.insertBefore(row, firstRow);

    // Animate the new row
    setTimeout(() => {
        row.style.opacity = '1';
    }, 100);

    // Remove oldest row if more than 5 rows
    const rows = table.querySelectorAll('.wins-table__row');
    if (rows.length > 5) {
        const lastRow = rows[rows.length - 1];
        lastRow.style.opacity = '0';
        setTimeout(() => {
            lastRow.remove();
        }, 300);
    }
}

// Game Specific Features
function initGameSpecificFeatures() {
    const gamePage = document.body.dataset.game;
    
    switch (gamePage) {
        case 'aviator':
            initAviatorGame();
            break;
        case 'plinko':
            initPlinkoGame();
            break;
        case 'laser247':
            initLaser247Game();
            break;
        case '101f':
            init101FGame();
            break;
    }
}

// Aviator Game Features
function initAviatorGame() {
    // Auto cashout settings
    const autoCashoutToggle = document.querySelector('.auto-cashout-toggle');
    const autoCashoutValue = document.querySelector('.auto-cashout-value');

    if (autoCashoutToggle && autoCashoutValue) {
        autoCashoutToggle.addEventListener('change', (e) => {
            autoCashoutValue.disabled = !e.target.checked;
        });
    }
}

// Plinko Game Features
function initPlinkoGame() {
    // Risk level selection
    const riskButtons = document.querySelectorAll('.risk-button');
    
    riskButtons.forEach(button => {
        button.addEventListener('click', () => {
            riskButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            updatePlinkoMultipliers(button.dataset.risk);
        });
    });
}

// Laser247 Game Features
function initLaser247Game() {
    // Game mode selection
    const modeButtons = document.querySelectorAll('.mode-button');
    
    modeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            updateGameMode(button.dataset.mode);
        });
    });
}

// 101F Game Features
function init101FGame() {
    // Betting options selection
    const betOptions = document.querySelectorAll('.bet-option');
    
    betOptions.forEach(option => {
        option.addEventListener('click', () => {
            betOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            updateBetType(option.dataset.type);
        });
    });
}

// Helper Functions
function updatePlinkoMultipliers(risk) {
    const multipliers = {
        low: [1.2, 1.5, 2],
        medium: [2, 3, 5],
        high: [5, 10, 100]
    };
    // Update UI with new multipliers
}

function updateGameMode(mode) {
    if (mode === 'auto') {
        // Show auto mode settings
    } else {
        // Show manual mode settings
    }
}

function updateBetType(type) {
    const multipliers = {
        standard: 2,
        perfect: 5,
        fiveCard: 10
    };
    // Update UI with selected bet type
} 