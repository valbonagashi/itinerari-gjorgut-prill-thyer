const map = L.map("map").setView([41.84, 19.98], 10);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

const places = [
  {
    id: 1,
    name: "Kulla e Berishajve",
    type: "home",
    typeLabel: "Kullë / pikënisje",
    coords: [41.87, 19.90],
    short: "Pika e nisjes së fatit të Gjorgut.",
    narrative: "Pikënisja e itinerarit dhe qendra e botës fisnore.",
    heritage: "Fisi, nderi, organizimi familjar, përkatësia komunitare."
  },
  {
    id: 2,
    name: "Vendi i vrasjes së Zef Kryeqyqit",
    type: "violence",
    typeLabel: "Vend i vrasjes",
    coords: [41.89, 19.96],
    short: "Nyja që e fut personazhin në ciklin tragjik.",
    narrative: "Momenti themelor që e vendos Gjorgun nën afatin e gjakmarrjes.",
    heritage: "Kanuni, gjakmarrja, detyrimi zakonor, nderi."
  },
  {
    id: 3,
    name: "Rruga e malësisë",
    type: "transit",
    typeLabel: "Tranzit / rrugë",
    coords: [41.86, 20.01],
    short: "Hapësira e kalimit dhe e pritjes së fatit.",
    narrative: "Rruga si trajektore e kohës së besës dhe e ekspozimit ndaj vdekjes.",
    heritage: "Besa, kufijtë e lëvizjes, peizazhi kulturor malor."
  },
  {
    id: 4,
    name: "Hani",
    type: "transit",
    typeLabel: "Han / ndalesë",
    coords: [41.84, 20.03],
    short: "Hapësirë kalimtare e lajmit dhe e mikpritjes.",
    narrative: "Nyje komunikimi ku ndërthuren udhëtimi individual dhe kodi kolektiv.",
    heritage: "Mikpritja, etika e udhëtarit, komunikimi social."
  },
  {
    id: 5,
    name: "Oroshi",
    type: "canon",
    typeLabel: "Qendër zakonore",
    coords: [41.81, 19.98],
    short: "Qendra simbolike e rendit të Kanunit.",
    narrative: "Institucionalizimi i gjakut dhe i fatit tragjik të personazhit.",
    heritage: "Kanuni, besa, tatimi i gjakut, rendi juridiko-zakonor."
  },
  {
    id: 6,
    name: "Udhëkryqi",
    type: "transit",
    typeLabel: "Hapësirë kalimi",
    coords: [41.79, 20.05],
    short: "Figura e pasigurisë dhe e zgjedhjes së pamundur.",
    narrative: "Pikë ku rruga merr vlerë simbolike si kufi dhe si ndarje botësh.",
    heritage: "Topografia kulturore, kufiri simbolik, orientimi në territor."
  },
  {
    id: 7,
    name: "Hapësira e fundit tragjike",
    type: "tragic",
    typeLabel: "Përmbyllje tragjike",
    coords: [41.76, 20.00],
    short: "Pika e përmbushjes së fatit të Gjorgut.",
    narrative: "Mbyllja e itinerarit dhe konsumimi i kohës tragjike.",
    heritage: "Memoria kolektive, cikli i gjakmarrjes, fundi ritual i trajektores."
  }
];

const colors = {
  home: "#2e7d32",
  violence: "#b71c1c",
  transit: "#1565c0",
  canon: "#6a1b9a",
  tragic: "#ef6c00"
};

function createCircleIcon(color) {
  return L.divIcon({
    className: "custom-div-icon",
    html: `
      <div style="
        background:${color};
        width:18px;
        height:18px;
        border-radius:50%;
        border:2px solid white;
        box-shadow:0 0 4px rgba(0,0,0,0.35);
      "></div>
    `,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -10]
  });
}

const markers = [];

places.forEach(place => {
  const marker = L.marker(place.coords, {
    icon: createCircleIcon(colors[place.type])
  }).addTo(map);

  marker.bindPopup(`
    <div>
      <h3 class="popup-title">${place.id}. ${place.name}</h3>
      <div class="popup-type">${place.typeLabel}</div>
      <p><strong>Funksioni narrativ:</strong> ${place.narrative}</p>
      <p><strong>Trashëgimia jomateriale:</strong> ${place.heritage}</p>
    </div>
  `);

  markers.push(marker);
});

const routeCoords = places.map(p => p.coords);

L.polyline(routeCoords, {
  color: "#1e4fa3",
  weight: 4,
  opacity: 0.85,
  dashArray: "8, 6"
}).addTo(map);

map.fitBounds(routeCoords, { padding: [30, 30] });

const placeList = document.getElementById("place-list");

places.forEach((place, index) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <span class="place-title">${place.id}. ${place.name}</span>
    <span class="place-subtitle">${place.short}</span>
  `;

  li.addEventListener("click", () => {
    map.flyTo(place.coords, 12, { duration: 1.2 });
    markers[index].openPopup();
  });

  placeList.appendChild(li);
});