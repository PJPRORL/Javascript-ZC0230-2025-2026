const kaarten = [
  { naam: "Vuurdrake Brutus",    serie: "Vuurdraak",    type: "Wezen",   zeldzaamheid: "zeldzaam",    aanvalskracht: 2400, waarde: 12.50 },
  { naam: "Lavalord Ignus",      serie: "Vuurdraak",    type: "Wezen",   zeldzaamheid: "legendarisch", aanvalskracht: 3100, waarde: 45.00 },
  { naam: "Vuurpijl",            serie: "Vuurdraak",    type: "Spreuk",  zeldzaamheid: "gewoon",      aanvalskracht: 800,  waarde: 1.50  },
  { naam: "Vuurmuur",            serie: "Vuurdraak",    type: "Val",     zeldzaamheid: "ongewoon",    aanvalskracht: 0,    waarde: 3.00  },
  { naam: "Asfenikse",           serie: "Vuurdraak",    type: "Wezen",   zeldzaamheid: "ongewoon",    aanvalskracht: 1600, waarde: 5.50  },
  { naam: "IJstrol Keldur",      serie: "IJsberg",      type: "Wezen",   zeldzaamheid: "ongewoon",    aanvalskracht: 1400, waarde: 4.50  },
  { naam: "Sneeuwgolem",         serie: "IJsberg",      type: "Wezen",   zeldzaamheid: "zeldzaam",    aanvalskracht: 2000, waarde: 9.00  },
  { naam: "IJskoningin Bora",    serie: "IJsberg",      type: "Wezen",   zeldzaamheid: "legendarisch", aanvalskracht: 2900, waarde: 38.00 },
  { naam: "Vriespijl",           serie: "IJsberg",      type: "Spreuk",  zeldzaamheid: "gewoon",      aanvalskracht: 600,  waarde: 1.00  },
  { naam: "IJsbarrière",         serie: "IJsberg",      type: "Val",     zeldzaamheid: "gewoon",      aanvalskracht: 0,    waarde: 0.75  },
  { naam: "Stormvalk Zephyr",    serie: "Stormwind",    type: "Wezen",   zeldzaamheid: "zeldzaam",    aanvalskracht: 1900, waarde: 8.00  },
  { naam: "Bliksemsteker",       serie: "Stormwind",    type: "Spreuk",  zeldzaamheid: "ongewoon",    aanvalskracht: 1200, waarde: 3.50  },
  { naam: "Windreus Aetas",      serie: "Stormwind",    type: "Wezen",   zeldzaamheid: "legendarisch", aanvalskracht: 2900, waarde: 38.00 },
  { naam: "Orkaan",              serie: "Stormwind",    type: "Val",     zeldzaamheid: "zeldzaam",    aanvalskracht: 0,    waarde: 6.00  },
  { naam: "Stormvleugel",        serie: "Stormwind",    type: "Wezen",   zeldzaamheid: "gewoon",      aanvalskracht: 900,  waarde: 1.50  },
  { naam: "Schaduwsluiper",      serie: "Schaduwwoud",  type: "Wezen",   zeldzaamheid: "ongewoon",    aanvalskracht: 1400, waarde: 3.00  },
  { naam: "Nachtelf Morva",      serie: "Schaduwwoud",  type: "Wezen",   zeldzaamheid: "zeldzaam",    aanvalskracht: 2100, waarde: 10.00 },
  { naam: "Schaduwlord Malachar",serie: "Schaduwwoud",  type: "Wezen",   zeldzaamheid: "legendarisch", aanvalskracht: 3400, waarde: 55.00 },
  { naam: "Duistere Vloek",      serie: "Schaduwwoud",  type: "Spreuk",  zeldzaamheid: "gewoon",      aanvalskracht: 700,  waarde: 1.25  },
  { naam: "Schaduwval",          serie: "Schaduwwoud",  type: "Val",     zeldzaamheid: "ongewoon",    aanvalskracht: 0,    waarde: 2.50  }
];

// Template voor 1 kaart:
// <div class="card">
//     <div class="card-header">
//         <span class="badge serie">Vuurdraak</span>
//         <span class="badge zeldzaamheid zeldzaam">zeldzaam</span>
//     </div>
//     <div class="card-body">
//         <h2 class="card-naam">Vuurdrake Brutus</h2>
//         <p class="card-type">Wezen</p>
//         <p><strong>Aanvalskracht:</strong> 2400</p>
//         <p><strong>Waarde:</strong> €12.50</p>
//     </div>
// </div>

const kaartenContainer = document.getElementById("kaarten-container");
const seriesSelect = document.getElementById("series");

seriesSelect.addEventListener("change", () => {
    const geselecteerdeSerie = seriesSelect.value;
    toonKaartenVoorSerie(geselecteerdeSerie);
});

function maakKaartElement(kaart) {

}

function toonKaartenVoorSerie(serie) {

}
