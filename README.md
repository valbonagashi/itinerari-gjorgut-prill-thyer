<!DOCTYPE html>
<html lang="sq">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Itinerari i Gjorgut - Prilli i Thyer</title>
    
    <!-- Leaflet CSS -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/gallery.css">
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
</head>
<body>
    <div id="container">
        <!-- Header -->
        <header>
            <h1>Itinerari i Gjorgut</h1>
            <h2>Nga "Prilli i Thyer" i Ismail Kadaresë</h2>
            <p class="subtitle">Një udhëtim letrar nëpër Shqipërinë e Veriut</p>
        </header>

        <!-- Sidebar -->
        <aside id="sidebar">
            <div id="intro">
                <h3>Rreth projektit</h3>
                <p><strong>"Prilli i Thyer"</strong> - Ismail Kadare (1978)</p>
                <p>Udhëtimi tragjik i Gjorg Berishës nga Mnelë e Madhe në Orosh dhe kthimi fatal.</p>
                
                <div style="background:#ecf0f1;padding:1rem;border-radius:5px;margin:1rem 0;">
                    <p><strong>⏱️ Kohëzgjatja:</strong> 30 ditë (Besa e Madhe)</p>
                    <p><strong>📏 Distanca:</strong> ~80-100 km</p>
                    <p><strong>📍 Zona:</strong> Mirdita, Shqipëria e Veriut</p>
                </div>
                
                <blockquote style="border-left:4px solid #e74c3c;padding-left:1rem;font-style:italic;background:#f9f9f9;padding:1rem;">
                    "Prilli kishte ardhur dhe po shkonte. Po thyhej. Ashtu si gjithçka tjetër."
                    <cite style="display:block;margin-top:0.5rem;font-size:0.9rem;color:#666;">— Ismail Kadare</cite>
                </blockquote>
            </div>

            <div id="timeline">
                <h3>Pikat e Itinerarit</h3>
                <ul id="location-list">
                    <!-- Do të popullohet nga JavaScript -->
                </ul>
            </div>

            <div id="chapter-info">
                <h3>Informacion shtesë</h3>
                <div id="chapter-content">
                    <!-- Përmbajtja dinamike -->
                </div>
            </div>
        </aside>

        <!-- Harta -->
        <main>
            <div id="map"></div>
            
            <!-- Kontrollet e hartës -->
            <div id="map-controls">
                <button id="reset-view">🗺️ Shiko të gjithë itinerarin</button>
                <button id="animate-route">▶️ Animoni rrugën</button>
            </div>

            <!-- Popup për informacion -->
            <div id="info-panel" class="hidden">
                <button id="close-panel">×</button>
                <div id="info-content"></div>
            </div>
        </main>

        <!-- Footer -->
        <footer>
            <p>Projekt i realizuar për konferencën "Pasuritë e Shqipërisë" | Universiteti i Tiranës, 2026</p>
            <p>Bazuar në romanin "Prilli i Thyer" © Ismail Kadare</p>
        </footer>
    </div>

    <!-- Leaflet JS -->
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    
    <!-- Custom Scripts -->
    <script src="js/data.js"></script>
    <script src="js/gallery.js"></script>
    <script src="js/map.js"></script>
</body>
</html>

/*
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Crimson Text', serif;
    color: #333;
    background: #f5f5f0;
    overflow: hidden;
}

#container {
    display: grid;
    grid-template-columns: 400px 1fr;
    grid-template-rows: auto 1fr auto;
    height: 100vh;
}

/* ==========================================
   HEADER
   ========================================== */

header {
    grid-column: 1 / -1;
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
    color: white;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

header h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    letter-spacing: 1px;
}

header h2 {
    font-size: 1.3rem;
    font-weight: 400;
    font-style: italic;
    opacity: 0.9;
}

.subtitle {
    margin-top: 0.5rem;
    font-size: 1rem;
    opacity: 0.8;
}

/* ==========================================
   SIDEBAR
   ========================================== */

#sidebar {
    background: white;
    padding: 2rem;
    overflow-y: auto;
    box-shadow: 2px 0 10px rgba(0,0,0,0.05);
}

#sidebar h3 {
    color: #2c3e50;
    margin-bottom: 1rem;
    margin-top: 1.5rem;
    border-bottom: 2px solid #e74c3c;
    padding-bottom: 0.5rem;
}

#sidebar h3:first-child {
    margin-top: 0;
}

/* Timeline */
#location-list {
    list-style: none;
    position: relative;
    padding-left: 30px;
}

#location-list::before {
    content: '';
    position: absolute;
    left: 10px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #e74c3c;
}

#location-list li {
    position: relative;
    padding: 1rem 0;
    cursor: pointer;
    transition: all 0.3s ease;
}

#location-list li::before {
    content: '';
    position: absolute;
    left: -24px;
    top: 1.5rem;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: white;
    border: 3px solid #e74c3c;
    transition: all 0.3s ease;
}

#location-list li:hover::before {
    transform: scale(1.3);
    background: #e74c3c;
}

#location-list li:hover {
    color: #e74c3c;
}

.location-name {
    font-weight: 600;
    font-size: 1.1rem;
    display: block;
    margin-bottom: 0.3rem;
}

.location-description {
    font-size: 0.95rem;
    color: #666;
    line-height: 1.5;
}

/* Status i Besës */
.besa-status {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 15px;
    font-size: 0.75rem;
    font-weight: 600;
    margin: 0.3rem 0;
}

.besa-vogel {
    background-color: #e74c3c;
    color: white;
}

.besa-madhe {
    background-color: #f39c12;
    color: white;
}

.besa-fund {
    background-color: #2c3e50;
    color: white;
}

/* ==========================================
   HARTA
   ========================================== */

main {
    position: relative;
    overflow: hidden;
}

#map {
    width: 100%;
    height: 100%;
}

/* Kontrollet */
#map-controls {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

#map-controls button {
    background: white;
    border: 2px solid #2c3e50;
    padding: 10px 20px;
    cursor: pointer;
    font-family: 'Crimson Text', serif;
    font-size: 1rem;
    border-radius: 5px;
    transition: all 0.3s ease;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

#map-controls button:hover {
    background: #2c3e50;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

/* Info Panel */
#info-panel {
    position: absolute;
    bottom: 20px;
    left: 20px;
    right: 20px;
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.3);
    z-index: 1000;
    max-height: 400px;
    overflow-y: auto;
    transition: all 0.3s ease;
}

#info-panel.hidden {
    display: none;
}

#close-panel {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: #999;
    transition: color 0.3s ease;
}

#close-panel:hover {
    color: #e74c3c;
}

#info-content h2 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
}

#info-content h3 {
    color: #555;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
}

#info-content h4 {
    color: #2c3e50;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
}

.altitude {
    font-size: 0.85rem;
    color: #666;
    font-style: italic;
}

.chapter-info {
    background: #ecf0f1;
    padding: 0.5rem;
    border-radius: 5px;
    display: inline-block;
}

/* Cultural elements grid */
.cultural-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.5rem;
    margin: 1rem 0;
}

.cultural-item {
    background: #ecf0f1;
    padding: 0.5rem;
    border-radius: 5px;
    font-size: 0.85rem;
}

/* ==========================================
   FOOTER
   ========================================== */

footer {
    grid-column: 1 / -1;
    background: #2c3e50;
    color: white;
    padding: 1rem;
    text-align: center;
    font-size: 0.9rem;
}

footer p {
    margin: 0.3rem 0;
}

/* ==========================================
   RESPONSIVE
   ========================================== */

@media (max-width: 968px) {
    #container {
        grid-template-columns: 1fr;
        grid-template-rows: auto auto 1fr auto;
    }
    
    #sidebar {
        max-height: 300px;
    }
    
    #info-panel {
        max-height: 250px;
    }
}

/* ==========================================
   CUSTOM LEAFLET POPUP
   ========================================== */

.leaflet-popup-content-wrapper {
    border-radius: 8px;
    font-family: 'Crimson Text', serif;
}

.leaflet-popup-content h3,
.leaflet-popup-content h4 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
}

.location-popup {
    min-width: 250px;
}

.location-popup button {
    background: #2c3e50;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
    transition: background 0.3s ease;
}

.location-popup button:hover {
    background: #1a252f;
}
==========================================
   HARTA INTERAKTIVE - ITINERARI I GJORGUT
   ========================================== */

// Variabla globale
let map;
let markers = [];
let routeLine;
let currentLocation = 0;

// Inicializimi kur dokumenti është gati
document.addEventListener('DOMContentLoaded', function() {
    console.log('🗺️ Duke inicializuar hartën...');
    initMap();
    populateTimeline();
    setupEventListeners();
});

// Krijimi i hartës
function initMap() {
    console.log('📍 Duke krijuar hartën...');
    
    // Qendra e hartës - Mirdita
    map = L.map('map').setView([42.30, 19.87], 11);
    
    // Shtresa terrenore (default)
    const terrainLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenTopoMap contributors',
        maxZoom: 17
    });
    
    // Shtresë alternative - standard
    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 18
    });
    
    // Shto shtresën default
    terrainLayer.addTo(map);
    
    // Kontrolli për ndryshimin e shtresave
    L.control.layers({
        "Harta Terrenore": terrainLayer,
        "Harta Standard": osmLayer
    }).addTo(map);
    
    // Shto elementët
    addMarkers();
    drawRoute();
    addLegend();
    
    console.log('✅ Harta u krijua me sukses!');
}

// Shtimi i markerëve
function addMarkers() {
    console.log('📌 Duke shtuar markerët...');
    
    itineraryData.locations.forEach((location, index) => {
        const iconColor = getIconColor(location.type);
        
        // Ikona me numër dhe label
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `
                <div style="position: relative;">
                    <div style="
                        position: absolute;
                        bottom: 45px;
                        left: 50%;
                        transform: translateX(-50%);
                        background: white;
                        border: 2px solid ${iconColor};
                        border-radius: 3px;
                        padding: 2px 6px;
                        font-size: 0.7rem;
                        font-weight: bold;
                        white-space: nowrap;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                        font-family: 'Crimson Text', serif;">
                        ${location.name}
                    </div>
                    <div style="
                        background-color: ${iconColor}; 
                        width: 35px; 
                        height: 35px; 
                        border-radius: 50%; 
                        border: 3px solid white;
                        box-shadow: 0 3px 8px rgba(0,0,0,0.4);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-weight: bold;
                        font-size: 1.1rem;">
                        ${index + 1}
                    </div>
                </div>
            `,
            iconSize: [35, 35],
            iconAnchor: [17, 17]
        });
        
        // Krijo markerin
        const marker = L.marker(location.coords, { icon: customIcon })
            .addTo(map)
            .bindPopup(createPopupContent(location), {
                maxWidth: 350,
                className: 'custom-popup'
            });
        
        marker.on('click', function() {
            showLocationInfo(location);
            highlightTimelineItem(index);
        });
        
        markers.push(marker);
    });
    
    console.log(`✅ U shtuan ${markers.length} markerë`);
}

// Ngjyra sipas tipit
function getIconColor(type) {
    const colors = {
        'start': '#27ae60',
        'journey': '#3498db',
        'turning-point': '#e67e22',
        'rest': '#9b59b6',
        'destination': '#e74c3c',
        'return': '#95a5a6',
        'end': '#2c3e50'
    };
    return colors[type] || '#95a5a6';
}

// Përmbajtja e popup
function createPopupContent(location) {
    const besaClass = location.besaStatus.includes('Vogël') ? 'besa-vogel' : 
                      location.besaStatus.includes('Madhe') && !location.besaStatus.includes('përfund') ? 'besa-madhe' : 
                      'besa-fund';
    
    return `
        <div class="location-popup">
            <h3 style="margin:0 0 0.5rem 0;">${location.name}</h3>
            <h4 style="margin:0 0 0.5rem 0;font-size:1rem;color:#555;">${location.localName}</h4>
            <p style="font-size:0.85rem;color:#666;margin:0.3rem 0;">🏔️ ${location.altitude}</p>
            
            <div class="besa-status ${besaClass}" style="margin:0.5rem 0;">
                ${location.besaStatus}
            </div>
            
            <p style="margin:0.5rem 0;"><strong>${location.chapter}</strong></p>
            <p style="margin:0.5rem 0;"><strong>Ngjarja:</strong> ${location.event}</p>
            
            ${location.timeFromPrevious !== '-' ? 
                `<p style="margin:0.5rem 0;font-size:0.85rem;">⏱️ ${location.timeFromPrevious} | 📏 ${location.distanceFromPrevious}</p>` 
                : ''}
            
            <button onclick="showLocationInfo(${location.id})">
                Shiko detaje të plota →
            </button>
        </div>
    `;
}

// Vizatimi i rrugës
function drawRoute() {
    console.log('🛣️ Duke vizatuar rrugën...');
    
    const routeCoords = itineraryData.locations.map(loc => loc.coords);
    
    routeLine = L.polyline(routeCoords, {
        color: '#e74c3c',
        weight: 4,
        opacity: 0.8,
        dashArray: '10, 10',
        lineJoin: 'round'
    }).addTo(map);
    
    // Tooltip për distancën totale
    const totalDist = itineraryData.metadata.totalDistance;
    routeLine.bindTooltip(`Distanca totale: ${totalDist}`, {
        permanent: false,
        direction: 'center'
    });
    
    console.log('✅ Rruga u vizatua');
}

// Legjenda e hartës
function addLegend() {
    const legend = L.control({ position: 'bottomright' });
    
    legend.onAdd = function(map) {
        const div = L.DomUtil.create('div', 'map-legend');
        div.innerHTML = `
            <h4 style="margin:0 0 10px 0;color:#2c3e50;border-bottom:2px solid #e74c3c;padding-bottom:5px;">Legjenda</h4>
            <div style="margin:5px 0;line-height:1.8;">
                <span style="background:#27ae60;width:15px;height:15px;display:inline-block;border-radius:50%;margin-right:5px;"></span> Nisja
            </div>
            <div style="margin:5px 0;">
                <span style="background:#3498db;width:15px;height:15px;display:inline-block;border-radius:50%;margin-right:5px;"></span> Udhëtim
            </div>
            <div style="margin:5px 0;">
                <span style="background:#e67e22;width:15px;height:15px;display:inline-block;border-radius:50%;margin-right:5px;"></span> Kthesë
            </div>
            <div style="margin:5px 0;">
                <span style="background:#9b59b6;width:15px;height:15px;display:inline-block;border-radius:50%;margin-right:5px;"></span> Pushim
            </div>
            <div style="margin:5px 0;">
                <span style="background:#e74c3c;width:15px;height:15px;display:inline-block;border-radius:50%;margin-right:5px;"></span> Destinacion
            </div>
            <div style="margin:5px 0;">
                <span style="background:#95a5a6;width:15px;height:15px;display:inline-block;border-radius:50%;margin-right:5px;"></span> Kthim
            </div>
            <div style="margin:5px 0;">
                <span style="background:#2c3e50;width:15px;height:15px;display:inline-block;border-radius:50%;margin-right:5px;"></span> Fund
            </div>
        `;
        div.style.background = 'white';
        div.style.padding = '10px';
        div.style.borderRadius = '5px';
        div.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        div.style.fontSize = '0.85rem';
        return div;
    };
    
    legend.addTo(map);
}

// Popullo timeline-in
function populateTimeline() {
    console.log('📋 Duke populuar timeline...');
    
    const listElement = document.getElementById('location-list');
    
    itineraryData.locations.forEach((location, index) => {
        const li = document.createElement('li');
        li.setAttribute('data-index', index);
        
        const besaClass = location.besaStatus.includes('Vogël') ? 'besa-vogel' : 
                          location.besaStatus.includes('Madhe') && !location.besaStatus.includes('përfund') ? 'besa-madhe' : 
                          'besa-fund';
        
        li.innerHTML = `
            <span class="location-name">${index + 1}. ${location.name}</span>
            <div class="besa-status ${besaClass}">
                ${location.besaStatus}
            </div>
            <span class="location-description">${location.event}</span>
            ${location.timeFromPrevious !== '-' ? 
                `<small style="color:#666;"><br>⏱️ ${location.timeFromPrevious}</small>` 
                : ''}
        `;
        
        li.addEventListener('click', function() {
            focusOnLocation(index);
            highlightTimelineItem(index);
        });
        
        listElement.appendChild(li);
    });
    
    console.log('✅ Timeline u populua');
}

// Shfaq informacionin e detajuar
function showLocationInfo(location) {
    if (typeof location === 'number') {
        location = itineraryData.locations.find(loc => loc.id === location);
    }
    
    const panel = document.getElementById('info-panel');
    const content = document.getElementById('info-content');
    
    const besaClass = location.besaStatus.includes('Vogël') ? 'besa-vogel' : 
                      location.besaStatus.includes('Madhe') && !location.besaStatus.includes('përfund') ? 'besa-madhe' : 
                      'besa-fund';
    
    content.innerHTML = `
        <h2>${location.name}</h2>
        <h3>${location.localName}</h3>
        <p class="altitude">🏔️ Lartësia: ${location.altitude}</p>
        <p class="chapter-info">${location.chapter}</p>
        
        <div class="besa-status ${besaClass}">
            ${location.besaStatus}
        </div>
        
        <p><em>${location.besaDetail}</em></p>
        
        <div style="background:#f9f9f9;padding:1rem;border-left:4px solid #e74c3c;margin:1rem 0;">
            <p style="font-style:italic;">${location.quote}</p>
        </div>
        
        <h4>📍 Ngjarja:</h4>
        <p><strong>${location.event}</strong></p>
        
        <h4>Përshkrimi:</h4>
        <p>${location.description}</p>
        
        <h4>🏛️ Elementë kulturorë:</h4>
        <div class="cultural-grid">
            ${location.culturalElements.map(el => `<div class="cultural-item">• ${el}</div>`).join('')}
        </div>
        
        <h4>ℹ️ Informacion turistik:</h4>
        <p><strong>Vendndodhja moderne:</strong> ${location.modernLocation}</p>
        <p>${location.touristInfo}</p>
        
        ${location.timeFromPrevious !== '-' ? `
            <h4>🚶 Nga pika e mëparshme:</h4>
            <p>⏱️ Kohëzgjatja: ${location.timeFromPrevious}<br>
            📏 Distanca: ${location.distanceFromPrevious}</p>
        ` : ''}
    `;
    
    panel.classList.remove('hidden');
}

// Event listeners
function setupEventListeners() {
    console.log('🎯 Duke vendosur event listeners...');
    
    document.getElementById('close-panel').addEventListener('click', function() {
        document.getElementById('info-panel').classList.add('hidden');
    });
    
    document.getElementById('reset-view').addEventListener('click', function() {
        const bounds = L.latLngBounds(itineraryData.locations.map(loc => loc.coords));
        map.fitBounds(bounds, { padding: [50, 50] });
    });
    
    document.getElementById('animate-route').addEventListener('click', animateRoute);
    
    console.log('✅ Event listeners u vendosën');
}

// Fokuso në vendndodhje
function focusOnLocation(index) {
    const location = itineraryData.locations[index];
    map.setView(location.coords, 14, {
        animate: true,
        duration: 1
    });
    
    markers[index].openPopup();
    showLocationInfo(location);
}

// Highlighto në timeline
function highlightTimelineItem(index) {
    document.querySelectorAll('#location-list li').forEach((li, i) => {
        if (i === index) {
            li.style.backgroundColor = '#fff3cd';
            li.style.borderLeft = '4px solid #e74c3c';
            li.style.paddingLeft = '26px';
        } else {
            li.style.backgroundColor = 'transparent';
            li.style.borderLeft = 'none';
            li.style.paddingLeft = '0';
        }
    });
}

// Animimi i rrugës
function animateRoute() {
    console.log('▶️ Duke animuar rrugën...');
    
    let index = 0;
    const interval = setInterval(() => {
        if (index >= itineraryData.locations.length) {
            clearInterval(interval);
            console.log('✅ Animacioni përfundoi');
            return;
        }
        
        focusOnLocation(index);
        highlightTimelineItem(index);
        index++;
    }, 3500);
}

// Kontrolle me tastierë
document.addEventListener('keydown', function(e) {
    const total = itineraryData.locations.length;
    
    switch(e.key) {
        case 'ArrowRight':
            currentLocation = (currentLocation + 1) % total;
            focusOnLocation(currentLocation);
            break;
        case 'ArrowLeft':
            currentLocation = (currentLocation - 1 + total) % total;
            focusOnLocation(currentLocation);
            break;
        case 'Escape':
            document.getElementById('info-panel').classList.add('hidden');
            break;
    }
});

console.log('✅ map.js u ngarkua me sukses!');
