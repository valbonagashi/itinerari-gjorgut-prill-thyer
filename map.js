/* ==========================================
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