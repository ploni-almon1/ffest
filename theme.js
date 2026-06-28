// theme.js
export const THEME = {
  // 🎨 CENTRÁLNÍ BARVY CELÉ APLIKACE
  colors: {
    primarniMotiv: '#3A24DC',      // Tvoje původní výchozí barva festivalu, musím změnit i v app.json a přepíšeš HEX kód u "primaryColor" a "themeColor" v sekci "web", aby se lišty na telefonech obarvily do stejné barvy jako vnitřek aplikace. (A samozřejmě zde změníš jméno z "DŽKO 2026" na nové)
    pozadiAplikace: '#F3F4F6',     // Tvé původní světle šedé pozadí aplikace

    // Horní navigační lišta (Hlavička) - VRÁCENO NA PŮVODNÍ
    pozadiHlavicky: '#FFFFFF',
    textHlavickyAktivni: '#000000',
    textHlavickyPasivni: '#6B7280',
    textHlavickyHover: '#000000',  

    // Spodní navigační lišta (pro mobily)
    pozadiSpodniListy: '#FFFFFF',
    ikonaSpodniListyAktivni: '#3A24DC',
    ikonaSpodniListyPasivni: '#6B7280',

    // Bubliny se dny (např. PO 12, ÚT 13)
    bublinaDenVyplnAktivni: '#3A24DC',
    bublinaDenTextAktivni: '#FFFFFF',
    bublinaDenTextPasivni: '#000000',

    // Univerzální styl pro 3 typy tlačítek (Filtrovat, Sdílet...)
    tlacitkoVypln: '#E0E7FF',      // Původní světlá výplň
    tlacitkoText: '#3A24DC',       // Barva textu v tlačítku
    tlacitkoOhraniceni: '#E0E7FF', // Barva okraje (rámečku)
    /* 📖 MANUÁL PRO OKRAJE (BORDERS) U TLAČÍTEK:
       - VIDITELNÝ OKRAJ: v komponentě necháš borderWidth a borderColor napojené na šablonu.
       - NEVIDITELNÝ OKRAJ (zachová velikost tlačítka): v komponentě dáš borderColor: 'transparent'
       - ZRUŠENÝ OKRAJ: v komponentě dáš borderWidth: 0
    */

    // Kontejnery (karty) jednotlivých akcí v programu
    kartaAkcePozadi: '#FFFFFF',
    kartaAkceOhraniceni: '#E5E7EB', 
    kartaAkceStín: 'rgba(0, 0, 0, 0.12)',
    
    // Obecné texty
    textHlavni: '#111827',
    textDoplnkovy: '#4B5563',      
  },

  // 📐 ROZMĚRY, OHRANIČENÍ A TVARY (BORDER STYLES)
  borders: {
    tloustkaDny: 1,
    radiusDny: 16,                 

    tloustkaTlacitka: 1,           // Tloušťka okraje univerzálních tlačítek
    radiusTlacitka: 20,            // Zaoblení univerzálních tlačítek

    tloustkaKartyAkce: 1,
    radiusKartyAkce: 10,           
  },

  // 📝 TYPOGRAFIE (FONTY A VELIKOSTI)
  fonts: {
    regular: 'Inter_400Regular',   
    medium: 'Inter_400Regular',    
  },

  fontSizes: {
    velkyNadpis: 32,              
    nazevAkce: 16,                
    obecnyText: 14,               
    doplnkovyText: 13,            
  },

  // 🖼️ OBRÁZKY A LOGA
  images: {
    logoHlavni: require('./assets/star.png'), 
    
    /* 🚨 NÁVOD PRO ZMĚNU OBRÁZKU/GIFU V LOADERU:
      1. Nový obrázek nebo animovaný .gif nahraj fyzicky do složky 'assets'.
      2. Tady níže přepiš název souboru (např. './assets/muj_loader.gif').
    */
    loaderObrazek: require('./assets/star.png'), 
  },

  // ⚙️ NASTAVENÍ CHOVÁNÍ LOADERU (PRO BUDOUCÍ SPECIÁLNÍ GIFy / OBRÁZKY)
  loaderNastaveni: {
    /* 🚨 ROTACE (TOČENÍ DOKOLA):
      - true  = Obrázek se bude mechanicky točit dokola (ideální pro statické ikony jako je hvězda).
      - false = Obrázek se NEBUDE točit (POUŽIJ PRO GIFy, které už animaci mají v sobě, nebo statické obrázky, co mají jen stát).
    */
    tocitObrazek: true,  

    /* 🚨 PŘEBARVENÍ PODLE TÉMATU FESTIVALU (tintColor):
      - true  = Celý obrázek se jednobarevně maskuje/přebarví podle aktuální barvy festivalu.
      - false = Obrázek si zachová své původní barvy (POUŽIJ PRO GIFy nebo barevná loga, u kterých nechceš, aby ztratila barvy).
    */
    prebarvitBarvou: true, 
  }
};