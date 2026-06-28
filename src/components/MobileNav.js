import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../../theme'; // 🎨 Import centrálního vzorníku

export default function MobileNav({
  isDesktop,
  aktivniTab,
  setAktivniTab,
  detailAkce,
  setDetailAkce,
  themeColor,
  setVybranyDen,
  setVybranyTag,
  setActiveFilters,
  vychoziFiltry,
  setMapFocus,
  setHistorieAkce
}) {
  // Pokud jsme na počítači (isDesktop), navigace se vůbec nevykreslí
  if (isDesktop) return null;

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem} onPress={() => { setAktivniTab('Program'); setVybranyDen('VŠE'); setVybranyTag(null); setActiveFilters(vychoziFiltry); setDetailAkce(null); }}>
        <Ionicons name={aktivniTab === 'Program' && !detailAkce ? "calendar" : "calendar-outline"} size={24} color={aktivniTab === 'Program' && !detailAkce ? themeColor : THEME.colors.ikonaSpodniListyPasivni} />
        <Text style={[styles.navText, { color: aktivniTab === 'Program' && !detailAkce ? themeColor : THEME.colors.ikonaSpodniListyPasivni }]}>Program</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navItem} onPress={() => { setAktivniTab('Oblíbené'); setDetailAkce(null); }}>
        <Ionicons name={aktivniTab === 'Oblíbené' && !detailAkce ? "heart" : "heart-outline"} size={24} color={aktivniTab === 'Oblíbené' && !detailAkce ? themeColor : THEME.colors.ikonaSpodniListyPasivni} />
        <Text style={[styles.navText, { color: aktivniTab === 'Oblíbené' && !detailAkce ? themeColor : THEME.colors.ikonaSpodniListyPasivni }]}>Oblíbené</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => { setAktivniTab('Mapa'); setMapFocus(null); setDetailAkce(null); setHistorieAkce(null); }}>
        <Ionicons name={aktivniTab === 'Mapa' ? "map" : "map-outline"} size={24} color={aktivniTab === 'Mapa' ? themeColor : THEME.colors.ikonaSpodniListyPasivni} />
        <Text style={[styles.navText, { color: aktivniTab === 'Mapa' ? themeColor : THEME.colors.ikonaSpodniListyPasivni }]}>Mapa</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => { setAktivniTab('Další'); setDetailAkce(null); }}>
        <Ionicons name={aktivniTab === 'Další' ? "grid" : "grid-outline"} size={24} color={aktivniTab === 'Další' ? themeColor : THEME.colors.ikonaSpodniListyPasivni} />
        <Text style={[styles.navText, { color: aktivniTab === 'Další' ? themeColor : THEME.colors.ikonaSpodniListyPasivni }]}>Další</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: THEME.colors.pozadiSpodniListy,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.kartaAkceOhraniceni,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    paddingTop: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontFamily: THEME.fonts.regular,
    fontSize: 12,
    marginTop: 4,
  }
});