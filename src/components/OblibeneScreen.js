import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import EventCard from './EventCard';
import Footer from './Footer';
import { THEME } from '../../theme'; // 🎨 Import vzorníku

export default function OblibeneScreen({
  isDesktop,
  themeColor,
  dny,
  vybranyDen,
  setVybranyDen,
  vybranyTag,
  setVybranyTag,
  sdilenyVyberIds,
  setSdilenyVyberIds,
  zobrazitObrazky,
  prepniObrazky,
  oblibeneIds,
  oblibeneZobrazeni,
  sdiletOblibene,
  mojeRezervace,
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
          <View style={[isDesktop ? styles.desktopContainer : null, { paddingBottom: 20 }]}>
            
            <View style={styles.pageTitleContainer}>
              <TouchableOpacity onPress={() => { setVybranyDen('VŠE'); setVybranyTag(null); }} activeOpacity={0.7} style={{ flex: 1 }}>
                <Text style={styles.pageTitle}>{sdilenyVyberIds ? 'SDÍLENÝ VÝBĚR' : 'OBLÍBENÉ'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={prepniObrazky} style={styles.toggleViewBtn}>
                <Ionicons name={zobrazitObrazky ? "reorder-three-outline" : "grid-outline"} size={24} color={THEME.colors.textHlavni} />
              </TouchableOpacity>
            </View>

            {sdilenyVyberIds && (
              <View style={styles.sharedBanner}>
                <Text style={styles.sharedBannerText}>
                  Prohlížíš si sdílený výběr akcí. Tvoje vlastní oblíbené akce zůstaly nedotčeny.
                </Text>
                <TouchableOpacity onPress={() => setSdilenyVyberIds(null)} style={styles.sharedBannerBtn}>
                  <Text style={styles.sharedBannerBtnText}>Zavřít</Text>
                </TouchableOpacity>
              </View>
            )}
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.daysContainer, isDesktop && styles.desktopDaysContainer, !isDesktop && { marginBottom: 8 }]}>
              {dny.map((den, index) => {
                const isActive = (vybranyDen === den && !vybranyTag);
                return (
                  <TouchableOpacity key={index} 
                    style={[
                      styles.dayPill, 
                      isDesktop && styles.desktopDayPill, 
                      { borderColor: themeColor }, 
                      isActive && { backgroundColor: themeColor }
                    ]}
                    onPress={() => { setVybranyDen(isActive ? 'VŠE' : den); setVybranyTag(null); }}>
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

            {isDesktop && !sdilenyVyberIds && oblibeneIds.length > 0 && (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 20, justifyContent: 'flex-start', zIndex: 10 }}>
                {/* 🎨 NAPOJENÉ TLAČÍTKO SDÍLET VÝBĚR (DESKTOP) */}
                <TouchableOpacity onPress={sdiletOblibene} style={styles.filterTriggerBtn} activeOpacity={0.7}>
                  <Ionicons name="share-social-outline" size={16} color={themeColor} />
                  <Text style={[styles.filterTriggerText, { color: themeColor }]}>Sdílet výběr</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={{ paddingBottom: 20, marginTop: !isDesktop ? 15 : 0 }}>
              {oblibeneZobrazeni.length > 0 ? (
                dny.map((den, index) => {
                  if (vybranyDen !== 'VŠE' && vybranyDen !== den) return null;
                  const akceDne = oblibeneZobrazeni.filter(item => item.den === den);
                  if (akceDne.length === 0) return null;

                  const isFirstVisibleDay = dny.find(d => 
                    (vybranyDen !== 'VŠE' && vybranyDen !== d) ? false : oblibeneZobrazeni.some(item => item.den === d)
                  ) === den;
                  
                  return (
                    <View key={index} style={{ marginBottom: 25 }}>
                      
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 15 }}>
                        <Text style={[styles.favoriteDayHeader, { marginBottom: 0 }]}>{den}</Text>
                        
                        {!isDesktop && isFirstVisibleDay && !sdilenyVyberIds && oblibeneIds.length > 0 && (
                          <TouchableOpacity onPress={sdiletOblibene} style={styles.mobileFilterShareBtn} activeOpacity={0.7}>
                            <Ionicons name="share-social-outline" size={16} color={themeColor} />
                            <Text style={[styles.mobileFilterShareText, { color: themeColor }]}>Sdílet výběr</Text>
                          </TouchableOpacity>
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
                <Text style={[styles.emptyText, { fontSize: 16, lineHeight: 24, marginTop: 120 }]}>Sem si můžete uložit oblíbené akce z programu kliknutím na srdíčko.</Text>
              )}
              {oblibeneZobrazeni.length > 0 && vybranyDen !== 'VŠE' && oblibeneZobrazeni.filter(item => item.den === vybranyDen).length === 0 && (
                <Text style={styles.emptyText}>Pro vybraný den nemáte uložené žádné oblíbené akce.</Text>
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
  dayPill: { height: 36, paddingHorizontal: 16, borderRadius: THEME.borders.radiusDny, borderWidth: THEME.borders.tloustkaDny, marginRight: 8, alignItems: 'center', justifyContent: 'center' },
  dayText: { fontFamily: THEME.fonts.regular, fontSize: 13 },
  dayTextActive: { color: 'white' },
  desktopDayPill: { width: 100 },
  desktopDayText: { fontSize: 14 },

  // 🧪 TLAČÍTKA SDÍLET/FILTROVAT (Napojeno na THEME)
  filterTriggerBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: THEME.colors.tlacitkoVypln, paddingVertical: 8, paddingHorizontal: 16, borderRadius: THEME.borders.radiusTlacitka, borderWidth: THEME.borders.tloustkaTlacitka, borderColor: THEME.colors.tlacitkoOhraniceni },
  filterTriggerText: { fontFamily: THEME.fonts.regular, marginLeft: 6, fontWeight: 'bold', fontSize: 13 },
  mobileFilterShareBtn: { height: 36, flexDirection: 'row', alignItems: 'center', backgroundColor: THEME.colors.tlacitkoVypln, paddingHorizontal: 16, borderRadius: THEME.borders.radiusTlacitka, borderWidth: THEME.borders.tloustkaTlacitka, borderColor: THEME.colors.tlacitkoOhraniceni },
  mobileFilterShareText: { fontFamily: THEME.fonts.regular, marginLeft: 6, fontWeight: 'bold', fontSize: 13 },
  
  // ✉️ SDÍLENÝ VÝBĚR BANNER
  sharedBanner: { backgroundColor: THEME.colors.tlacitkoVypln, padding: 15, borderRadius: 10, marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sharedBannerText: { fontFamily: THEME.fonts.regular, color: THEME.colors.tlacitkoText, flex: 1, paddingRight: 10, lineHeight: 20 },
  sharedBannerBtn: { backgroundColor: THEME.colors.tlacitkoText, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  sharedBannerBtnText: { color: 'white', fontFamily: THEME.fonts.regular, fontWeight: 'bold' },

  favoriteDayHeader: { fontFamily: THEME.fonts.regular, fontSize: 20, color: THEME.colors.textHlavni, marginBottom: 15 },
  emptyText: { fontFamily: THEME.fonts.regular, color: THEME.colors.textDoplnkovy, textAlign: 'center', marginTop: 30 },
  desktopGrid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -8 },
  desktopContainer: { width: '100%', maxWidth: 1240, alignSelf: 'center', paddingTop: 10 }
});