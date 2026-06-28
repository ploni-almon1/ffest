import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import EventCard from './EventCard';
import Footer from './Footer';
import { THEME } from '../../theme'; // 🎨 Import vzorníku

export default function ProgramScreen({
  isDesktop,
  themeColor,
  dny,
  vybranyDen,
  setVybranyDen,
  vybranyTag,
  setVybranyTag,
  activeFilters,
  setActiveFilters,
  vychoziFiltry,
  hasActiveFilters,
  zobrazitObrazky,
  prepniObrazky,
  setTempFilters,
  setFilterModalVisible,
  zobrazenePrednasky,
  mojeRezervace,
  oblibeneIds,
  otevriDetail,
  handleLocationClick,
  clickTagNaProgram,
  prepniOblibene,
  hlavniScrollViewRef,
  hlavniScrollY
}) {
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} ref={hlavniScrollViewRef} scrollEventThrottle={16} onScroll={(e) => { hlavniScrollY.current = e.nativeEvent.contentOffset.y; }}>
      <View style={{ flex: 1, width: '100%', maxWidth: 1270, alignSelf: 'center', paddingHorizontal: 15 }}>
          <View style={isDesktop ? styles.desktopContainer : null}>
            <View style={styles.pageTitleContainer}>
              <TouchableOpacity onPress={() => { setVybranyDen('VŠE'); setVybranyTag(null); setActiveFilters(vychoziFiltry); }} activeOpacity={0.7} style={{ flex: 1 }}>
                <Text style={styles.pageTitle}>{vybranyTag ? `PROGRAM: ${vybranyTag}` : 'PROGRAM'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={prepniObrazky} style={styles.toggleViewBtn}>
                <Ionicons name={zobrazitObrazky ? "reorder-three-outline" : "grid-outline"} size={24} color={THEME.colors.textHlavni} />
              </TouchableOpacity>
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.daysContainer, isDesktop && styles.desktopDaysContainer, !isDesktop && { marginBottom: 8 }]}>
              {dny.map((den, index) => {
                const isActive = (vybranyDen === den && !vybranyTag && !hasActiveFilters);
                return (
                  <TouchableOpacity key={index} 
                    style={[
                      styles.dayPill, 
                      isDesktop && styles.desktopDayPill, 
                      { borderColor: themeColor }, 
                      isActive && { backgroundColor: themeColor }
                    ]}
                    onPress={() => { setVybranyDen(isActive ? 'VŠE' : den); setVybranyTag(null); setActiveFilters(vychoziFiltry); }}>
                    <Text style={[
                      styles.dayText, 
                      isDesktop && styles.desktopDayText, 
                      { color: themeColor }, 
                      isActive && styles.dayTextActive
                    ]}>{den}</Text>
                  </TouchableOpacity>
                )
              })}
            </ScrollView>

            {isDesktop && (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 20, justifyContent: 'flex-start', zIndex: 10 }}>
                <TouchableOpacity 
                  onPress={() => { setTempFilters(activeFilters); setFilterModalVisible(true); }} 
                  style={styles.filterTriggerBtn}
                  activeOpacity={0.7}
                >
                  <Ionicons name="filter" size={16} color={themeColor} />
                  <Text style={[styles.filterTriggerText, { color: themeColor }]}>Filtrovat</Text>
                </TouchableOpacity>
                {hasActiveFilters && (
                  <TouchableOpacity onPress={() => setActiveFilters(vychoziFiltry)} style={{ marginLeft: 15 }}>
                    <Text style={{ fontFamily: THEME.fonts.regular, color: THEME.colors.textDoplnkovy, fontSize: 13 }}>Zrušit filtry</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
            
            <View style={{ paddingBottom: 20, marginTop: !isDesktop ? 15 : 0 }}>
              {zobrazenePrednasky.length > 0 ? (
                dny.map((den, index) => {
                  if (!hasActiveFilters && vybranyDen !== 'VŠE' && vybranyDen !== den) return null;
                  const akceDne = zobrazenePrednasky.filter(item => item.den === den);
                  if (akceDne.length === 0) return null;
                  
                  return (
                    <View key={index} style={{ marginBottom: 25 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 15 }}>
                        <Text style={[styles.favoriteDayHeader, { marginBottom: 0, top: !isDesktop ? 4 : 0 }]}>{den}</Text>
                        
                        {!isDesktop && (
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity 
                              onPress={() => { setTempFilters(activeFilters); setFilterModalVisible(true); }} 
                              style={styles.mobileFilterShareBtn}
                            >
                              <Ionicons name="filter" size={16} color={themeColor} />
                              <Text style={[styles.mobileFilterShareText, { color: themeColor }]}>Filtrovat</Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>

                      <View style={isDesktop ? styles.desktopGrid : undefined}>
                        {akceDne.map(item => <EventCard 
                          key={item.id}
                          item={item} 
                          zobrazitObrazky={zobrazitObrazky} 
                          isDesktop={isDesktop} 
                          mojeRezervace={mojeRezervace} 
                          themeColor={themeColor} 
                          oblibeneIds={oblibeneIds} 
                          otevriDetail={otevriDetail} 
                          handleLocationClick={handleLocationClick} 
                          clickTagNaProgram={clickTagNaProgram} 
                          prepniOblibene={prepniOblibene} 
                        />)}
                      </View>
                    </View>
                  );
                })
              ) : (
                <Text style={styles.emptyText}>Zvoleným filtrům neodpovídá žádný program.</Text>
              )}
            </View>
          </View>
      </View>
      {isDesktop && <Footer isDesktop={isDesktop} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pageTitleContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginBottom: 15 },
  pageTitle: { fontFamily: THEME.fonts.regular, fontSize: THEME.fontSizes.velkyNadpis, letterSpacing: 1 },
  toggleViewBtn: { width: 44, height: 44, marginLeft: 10, justifyContent: 'center', alignItems: 'center' },
  
  // 🔘 BUBLINY DNŮ (Napojeno na THEME)
  daysContainer: { flexDirection: 'row', marginBottom: 20 },
  dayPill: { 
    height: 36, 
    paddingHorizontal: 16, 
    borderRadius: THEME.borders.radiusDny, 
    borderWidth: THEME.borders.tloustkaDny, 
    marginRight: 8, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  dayText: { fontFamily: THEME.fonts.regular, fontSize: 13 },
  dayTextActive: { color: 'white' },
  desktopDayPill: { width: 100 },
  desktopDayText: { fontSize: 14 },

  // 🧪 TLAČÍTKO FILTROVAT (Napojeno na THEME)
  filterTriggerBtn: {
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: THEME.colors.tlacitkoVypln, 
    paddingVertical: 8, 
    paddingHorizontal: 16, 
    borderRadius: THEME.borders.radiusTlacitka,
    borderWidth: THEME.borders.tloustkaTlacitka,
    borderColor: THEME.colors.tlacitkoOhraniceni,
  },
  filterTriggerText: { fontFamily: THEME.fonts.regular, marginLeft: 6, fontWeight: 'bold', fontSize: 13 },
  mobileFilterShareBtn: {
    height: 36, 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: THEME.colors.tlacitkoVypln, 
    paddingHorizontal: 16, 
    borderRadius: THEME.borders.radiusTlacitka,
    borderWidth: THEME.borders.tloustkaTlacitka,
    borderColor: THEME.colors.tlacitkoOhraniceni,
  },
  mobileFilterShareText: { fontFamily: THEME.fonts.regular, marginLeft: 6, fontWeight: 'bold', fontSize: 13 },
  
  favoriteDayHeader: { fontFamily: THEME.fonts.regular, fontSize: 20, color: THEME.colors.textHlavni, marginBottom: 15 },
  emptyText: { fontFamily: THEME.fonts.regular, color: THEME.colors.textDoplnkovy, textAlign: 'center', marginTop: 30 },
  desktopGrid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -8 },
  desktopContainer: { width: '100%', maxWidth: 1240, alignSelf: 'center', paddingTop: 10 }
});