import React from 'react';
import { View, Text, TouchableOpacity, Image, Linking, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../../theme'; // 🎨 Import centrálního vzorníku

export default function EventCard({ 
  item, 
  forceGrid, 
  zobrazitObrazky, 
  isDesktop, 
  mojeRezervace, 
  themeColor, 
  oblibeneIds, 
  otevriDetail, 
  handleLocationClick, 
  clickTagNaProgram, 
  prepniOblibene 
}) {
  const casParts = item.cas.split(' | ');
  const timeText = casParts.length > 2 ? `${casParts[0]} | ${casParts[1]}` : item.cas;
  const mistoText = casParts.length > 2 ? casParts[2] : null;
  const maRezervaci = mojeRezervace.includes(item.id);
  
  const jePlno = item.kapacita && item.pocetRezervaci >= item.kapacita;
  const isGrid = (forceGrid === true) ? true : zobrazitObrazky; 

  const wrapperStyle = isGrid
    ? (isDesktop ? styles.desktopCardWrapper : styles.mobileCardWrapper)
    : { width: '100%', paddingHorizontal: isDesktop ? 8 : 0, marginBottom: 15 };

  return (
    <View style={wrapperStyle}>
      <TouchableOpacity 
        style={[
          styles.card, 
          !isGrid && isDesktop && { flexDirection: 'row', height: 270 }
        ]} 
        onPress={() => otevriDetail(item)} 
        activeOpacity={0.7}
      >
        {item.image ? (
          <Image 
            source={{ uri: item.image }} 
            style={
              isGrid 
                ? (isDesktop ? styles.desktopCardImage : styles.cardImage) 
                : (isDesktop ? styles.listCardImageDesktop : styles.cardImage)
            } 
            resizeMode="cover" 
          />
        ) : (
          <View style={[
            isGrid 
              ? (isDesktop ? styles.desktopCardImage : styles.cardImage) 
              : (isDesktop ? styles.listCardImageDesktop : styles.cardImage),
            { backgroundColor: THEME.colors.kartaAkceOhraniceni, justifyContent: 'center', alignItems: 'center' }
          ]}>
            <Text style={{color: THEME.colors.textDoplnkovy}}>Bez obrázku</Text>
          </View>
        )}

        <View style={[styles.cardContent, !isGrid && isDesktop && { flex: 1, paddingHorizontal: 25, paddingVertical: 20 }]}>
          <View style={styles.timeLocationRow}>
            <Text style={styles.cardTime}>{timeText}</Text>
            {mistoText && (
              <>
                <Text style={styles.desktopCardTime}> | </Text>
                <TouchableOpacity onPress={(e) => { e.stopPropagation?.(); handleLocationClick(mistoText); }} activeOpacity={0.6} style={{ zIndex: 10 }}>
                  <Text style={styles.desktopCardTime}>{mistoText}</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
          
          <Text style={[styles.cardTitle, !isGrid && isDesktop && { fontSize: 22, marginTop: 5 }]} numberOfLines={isGrid ? undefined : 2}>{item.nazev}</Text>
          
          {item.host !== '' && <Text style={styles.cardHost} numberOfLines={isGrid ? undefined : 1}>{item.roleHosta}: {item.host}</Text>}
          
          {!isGrid && item.popis && (
            <Text style={styles.listAnnotation} numberOfLines={3}>
              {item.popis}
            </Text>
          )}
          
          <View style={[styles.cardBottomRow, !isGrid && isDesktop && { marginTop: 'auto', paddingTop: 10 }]}>
            <View style={styles.tagsContainer}>
              {item.tag && item.tag.map((t, index) => (
                <TouchableOpacity key={index} style={[styles.tagPill, { backgroundColor: themeColor, borderColor: themeColor }]} onPress={(e) => { e.stopPropagation?.(); clickTagNaProgram(t); }} activeOpacity={0.7}>
                  <Text style={styles.tagText}>{t}</Text>
                </TouchableOpacity>
              ))}
              
              {item.odkaz && (
                <TouchableOpacity style={[styles.tagPillOutline, { borderColor: themeColor }]} onPress={(e) => { e.stopPropagation?.(); Linking.openURL(item.odkaz); }} activeOpacity={0.7}>
                  <Text style={[styles.tagTextOutline, { color: themeColor }]}>VSTUPENKY</Text>
                </TouchableOpacity>
              )}

              {item.rezervace && (
                <TouchableOpacity 
                  style={[
                    styles.tagPillOutline, 
                    { borderColor: themeColor }, 
                    maRezervaci ? styles.tagPillRezervovano : (jePlno ? styles.tagPillPlno : null)
                  ]} 
                  onPress={(e) => { e.stopPropagation?.(); otevriDetail(item, true); }} 
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.tagTextOutline, 
                    { color: themeColor }, 
                    maRezervaci ? styles.tagTextRezervovano : (jePlno ? styles.tagTextPlno : null)
                  ]}>
                    {maRezervaci ? 'REZERVOVÁNO' : (jePlno ? 'OBSAZENO' : 'NUTNÁ REZERVACE')}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity onPress={(e) => { e.stopPropagation?.(); prepniOblibene(item.id); }} style={styles.heartIconBtn}>
              <Ionicons name={oblibeneIds.includes(item.id) ? "heart" : "heart-outline"} size={26} color={THEME.colors.textHlavni} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  desktopCardWrapper: {
    width: '25%', 
    paddingHorizontal: 8,
    marginBottom: 20, 
  },
  mobileCardWrapper: {
    width: '100%',
    marginBottom: 15,
  },
  card: { 
    backgroundColor: THEME.colors.kartaAkcePozadi, 
    borderRadius: THEME.borders.radiusKartyAkce, 
    marginBottom: 0, 
    ...Platform.select({
      web: { boxShadow: `0px 4px 8px ${THEME.colors.kartaAkceStín}` },
      default: { elevation: 5 }
    })
  },
  cardContent: { padding: 15 },
  cardImage: { width: '100%', height: 160, borderTopLeftRadius: THEME.borders.radiusKartyAkce, borderTopRightRadius: THEME.borders.radiusKartyAkce, backgroundColor: THEME.colors.kartaAkceOhraniceni },
  desktopCardImage: {
    width: '100%',
    aspectRatio: 1.5, 
    borderTopLeftRadius: THEME.borders.radiusKartyAkce, 
    borderTopRightRadius: THEME.borders.radiusKartyAkce, 
    backgroundColor: THEME.colors.kartaAkceOhraniceni
  },
  listCardImageDesktop: {
    width: 360,
    height: 270,
    borderTopLeftRadius: THEME.borders.radiusKartyAkce,
    borderBottomLeftRadius: THEME.borders.radiusKartyAkce,
    backgroundColor: THEME.colors.kartaAkceOhraniceni
  },
  timeLocationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5, flexWrap: 'wrap' },
  cardTime: { fontFamily: THEME.fonts.regular, fontSize: 16, color: THEME.colors.textDoplnkovy },
  desktopCardTime: { fontFamily: THEME.fonts.regular, fontSize: 14, color: THEME.colors.textDoplnkovy },
  cardTitle: { fontFamily: THEME.fonts.regular, fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: THEME.colors.textHlavni },
  cardHost: { fontFamily: THEME.fonts.regular, fontSize: 14, color: THEME.colors.textDoplnkovy, marginBottom: 10 },
  listAnnotation: { fontFamily: THEME.fonts.regular, fontSize: 15, color: THEME.colors.textDoplnkovy, lineHeight: 22, marginTop: 10, marginBottom: 15 },
  cardBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', flex: 1, paddingRight: 10 },
  tagPill: { alignSelf: 'flex-start', paddingVertical: 4, paddingHorizontal: 9, borderRadius: 15, marginRight: 6, marginTop: 6, borderWidth: 1 },
  tagText: { fontFamily: THEME.fonts.regular, color: 'white', fontSize: 11, fontWeight: '600' },
  tagPillOutline: { backgroundColor: 'transparent', alignSelf: 'flex-start', paddingVertical: 4, paddingHorizontal: 9, borderRadius: 15, marginRight: 6, marginTop: 6, borderWidth: 1 },
  tagTextOutline: { fontFamily: THEME.fonts.regular, fontSize: 11, fontWeight: '600' },
  tagPillRezervovano: { backgroundColor: 'transparent', borderColor: '#10B981' },
  tagTextRezervovano: { color: '#10B981' },
  tagPillPlno: { backgroundColor: THEME.colors.kartaAkceOhraniceni, borderColor: THEME.colors.kartaAkceOhraniceni },
  tagTextPlno: { color: THEME.colors.textDoplnkovy },
  heartIconBtn: { paddingBottom: 0, paddingLeft: 10, marginBottom: -4 }
});