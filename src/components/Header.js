import React from 'react';
import { View, Text, TouchableOpacity, Image, Linking, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../../theme';

export default function Header({
  isDesktop,
  themeColor,
  aktivniTab,
  setAktivniTab,
  detailAkce,
  setDetailAkce,
  oblibeneIds,
  setVybranyDen,
  setVybranyTag,
  setActiveFilters,
  vychoziFiltry,
  programDropdownVisible,
  setProgramDropdownVisible,
  hoveredMenuItem,
  setHoveredMenuItem,
  setRozbaleno
}) {
  return (
    <View style={isDesktop ? styles.desktopHeader : styles.header}>
      {isDesktop ? (
        <View style={styles.desktopHeaderInner}>
          <TouchableOpacity 
            style={styles.headerLeft}
            activeOpacity={0.7}
            onPress={() => { setAktivniTab('Home'); setDetailAkce(null); }}
          >
            <Image 
              source={require('../../assets/star.png')} 
              style={[styles.headerLogo, { tintColor: themeColor }]} 
            />
            <Text style={styles.headerText}>DNY ŽIDOVSKÉ KULTURY OLOMOUC</Text>
          </TouchableOpacity>

          <View style={styles.desktopHeaderMenu}>
            <TouchableOpacity onPress={() => { setDetailAkce(null); setAktivniTab('Home'); }}>
              <Text style={[styles.desktopMenuText, aktivniTab === 'Home' && !detailAkce && { color: themeColor, fontWeight: 'bold' }]}>O FESTIVALU</Text>
            </TouchableOpacity>
            
            <View 
              onMouseEnter={() => setProgramDropdownVisible(true)}
              onMouseLeave={() => setProgramDropdownVisible(false)}
              style={{ position: 'relative', height: '100%', justifyContent: 'center' }}
            >
              <TouchableOpacity onPress={() => { setAktivniTab('Program'); setVybranyDen('VŠE'); setVybranyTag(null); setActiveFilters(vychoziFiltry); setDetailAkce(null); }}>
                <Text style={[styles.desktopMenuText, (aktivniTab === 'Program' || aktivniTab === 'Hoste') && !detailAkce && { color: themeColor, fontWeight: 'bold' }]}>PROGRAM</Text>
              </TouchableOpacity>

              {Platform.OS === 'web' && programDropdownVisible && (
                <View style={styles.dropdownContainer}>
                  <TouchableOpacity 
                    style={styles.dropdownItem}
                    onMouseEnter={() => setHoveredMenuItem('Program')}
                    onMouseLeave={() => setHoveredMenuItem(null)}
                    onPress={() => { setAktivniTab('Program'); setVybranyDen('VŠE'); setVybranyTag(null); setActiveFilters(vychoziFiltry); setDetailAkce(null); setProgramDropdownVisible(false); }}
                  >
                    <Text style={[styles.dropdownItemText, hoveredMenuItem === 'Program' && { color: THEME.colors.textHlavickyHover, fontWeight: 'bold' }]}>PROGRAM</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.dropdownItem}
                    onMouseEnter={() => setHoveredMenuItem('Hoste')}
                    onMouseLeave={() => setHoveredMenuItem(null)}
                    onPress={() => { setAktivniTab('Hoste'); setDetailAkce(null); setProgramDropdownVisible(false); }}
                  >
                    <Text style={[styles.dropdownItemText, hoveredMenuItem === 'Hoste' && { color: THEME.colors.textHlavickyHover, fontWeight: 'bold' }]}>HOSTÉ</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <TouchableOpacity onPress={() => Linking.openURL('https://muo.cz/central/dzko-2025/dzko-archiv-2025/')}>
              <Text style={styles.desktopMenuText}>ARCHIV</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setDetailAkce(null); setAktivniTab('Partneri'); }}>
              <Text style={[styles.desktopMenuText, aktivniTab === 'Partneri' && { color: themeColor, fontWeight: 'bold' }]}>POŘADATELÉ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.desktopHeaderFavBtn} onPress={() => { setDetailAkce(null); setAktivniTab('Oblíbené'); }}>
              <Ionicons name={oblibeneIds.length > 0 || (aktivniTab === 'Oblíbené' && !detailAkce) ? "heart" : "heart-outline"} size={24} color={aktivniTab === 'Oblíbené' && !detailAkce ? themeColor : THEME.colors.textHlavickyAktivni} />
              {oblibeneIds.length > 0 && <Text style={[styles.desktopHeaderFavCount, aktivniTab === 'Oblíbené' && !detailAkce && { color: themeColor }]}>{oblibeneIds.length}</Text>}
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity 
          style={styles.headerLeft}
          activeOpacity={0.7}
          onPress={() => { setDetailAkce(null); setAktivniTab('Další'); setRozbaleno('O festivalu'); }}
        >
          <Image source={require('../../assets/star.png')} style={[styles.headerLogo, { tintColor: themeColor }]} />
          <Text style={styles.headerText}>DŽKO</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  desktopHeader: { 
    height: 55,
    width: '100%',
    backgroundColor: THEME.colors.pozadiHlavicky, 
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    zIndex: 50,
    ...Platform.select({
      web: { boxShadow: '0px 4px 12px rgba(0,0,0,0.08)' },
      default: { elevation: 4 }
    })
  },
  header: { 
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: THEME.colors.pozadiHlavicky, 
    paddingHorizontal: 15, 
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.kartaAkceOhraniceni,
  },
  desktopHeaderInner: {
    width: '100%',
    maxWidth: 1240, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -5, 
  },
  headerLogo: { width: 36, height: 36, marginRight: 10, resizeMode: 'contain' },
  headerText: { 
    fontFamily: THEME.fonts.regular, 
    color: THEME.colors.textHlavickyAktivni, 
    fontSize: 22, 
    includeFontPadding: false 
  },
  desktopHeaderMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 25,
  },
  desktopMenuText: {
    fontFamily: THEME.fonts.regular,
    fontSize: 16,
    color: THEME.colors.textHlavickyAktivni,
    letterSpacing: 0.5,
  },
  dropdownContainer: {
    position: 'absolute',
    top: '100%',
    left: -15,
    backgroundColor: THEME.colors.pozadiHlavicky,
    minWidth: 150,
    borderRadius: 8,
    paddingVertical: 8,
    zIndex: 100,
    ...Platform.select({
      web: { boxShadow: '0px 4px 15px rgba(0,0,0,0.15)' },
      default: { elevation: 5 }
    })
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  dropdownItemText: {
    fontFamily: THEME.fonts.regular,
    fontSize: 14,
    color: THEME.colors.textHlavickyPasivni,
  },
  desktopHeaderFavBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  desktopHeaderFavCount: {
    fontFamily: THEME.fonts.regular,
    fontSize: 18,
    color: THEME.colors.textHlavickyAktivni,
    marginLeft: 6, 
  }
});