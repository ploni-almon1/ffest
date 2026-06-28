import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, TextInput, ActivityIndicator, Linking, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Footer from './Footer';
import { THEME } from '../../theme'; // 🎨 Načtení centrálního vzorníku

export default function EventDetail({
  item,
  isDesktop,
  themeColor,
  mojeRezervace,
  oblibeneIds,
  rezervaceJmeno,
  setRezervaceJmeno,
  rezervaceEmail,
  setRezervaceEmail,
  odesilaRezervaci,
  rezervaceOdeslana,
  rezervaceChyba,
  chciDalsiRezervaci,
  setChciDalsiRezervaci,
  handleOdeslatRezervaci,
  setDetailAkce,
  handleLocationClick,
  sdiletAkci,
  clickTagNaProgram,
  prepniOblibene,
  setAktivniSelectedSpeaker,
  setSpeakerModalVisible,
  stahniKalendar,
  detailScrollViewRef
}) {
  const casParts = item.cas.split(' | ');
  const timeText = casParts.length > 2 ? `${casParts[0]} | ${casParts[1]}` : item.cas;
  const mistoText = casParts.length > 2 ? casParts[2] : null;
  const maRezervaci = mojeRezervace.includes(item.id);
  
  const jePlno = item.kapacita && item.pocetRezervaci >= item.kapacita;

  const getKapacitaText = () => {
    if (!item.rezervace) return null;
    if (item.kapacita) {
      const volnaMista = Math.max(0, item.kapacita - (item.pocetRezervaci || 0));
      let mistoSlovo = 'volných míst';
      if (volnaMista === 1) mistoSlovo = 'volné místo';
      else if (volnaMista >= 2 && volnaMista <= 4) mistoSlovo = 'volná místa';

      return (
        <Text style={styles.capacityText}>
          <Text style={styles.capacityBold}>{volnaMista} {mistoSlovo}</Text>
          <Text style={styles.capacityLight}> / kapacita {item.kapacita}</Text>
        </Text>
      );
    } else {
      return (
        <Text style={styles.capacityText}>
          <Text style={styles.capacityLight}>Počet rezervací: </Text>
          <Text style={styles.capacityBold}>{item.pocetRezervaci || 0}</Text>
        </Text>
      );
    }
  };

  return (
    <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled" ref={detailScrollViewRef} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={isDesktop ? styles.desktopDetailScrollView : styles.content}>
          {isDesktop ? (
            <View style={styles.desktopBreadcrumbsContainer}>
              <TouchableOpacity onPress={() => setDetailAkce(null)} activeOpacity={0.6}>
                <Text style={styles.desktopBreadcrumbLink}>PROGRAM</Text>
              </TouchableOpacity>
              <Text style={styles.desktopBreadcrumbText}> &gt; {item.nazev.toUpperCase()}</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.backBtn} onPress={() => setDetailAkce(null)}>
              <Ionicons name="arrow-back" size={20} color={themeColor} />
              <Text style={[styles.backBtnText, { color: themeColor }]}>Zpět</Text>
            </TouchableOpacity>
          )}

          {isDesktop ? (
            <View style={styles.desktopDetailLayout}>
              {/* LEVÝ SLOUPEC - DESKTOP */}
              <View style={{ flex: 1, marginRight: 20 }}>
                {/* 1. BÍLÁ KARTA: ANOTACE A KAPACITA */}
                <View style={styles.desktopDetailCard}>
                  <View style={[styles.desktopTimeLocationRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.desktopCardTime}>{timeText}</Text>
                      {mistoText && (
                        <>
                          <Text style={styles.desktopCardTime}> | </Text>
                          <TouchableOpacity onPress={() => handleLocationClick(mistoText)} activeOpacity={0.6}>
                            <Text style={styles.desktopCardTime}>{mistoText}</Text>
                          </TouchableOpacity>
                        </>
                      )}
                    </View>
                    
                    {/* 🎨 NAPOJENÉ TLAČÍTKO SDÍLET (DESKTOP) */}
                    <TouchableOpacity onPress={() => sdiletAkci(item)} style={styles.actionButton} activeOpacity={0.6}>
                      <Ionicons name="share-social-outline" size={16} color={THEME.colors.tlacitkoText} />
                      <Text style={styles.actionButtonText}>Sdílet</Text>
                    </TouchableOpacity>
                  </View>
                  
                  <Text style={styles.desktopDetailMainTitle}>{item.nazev}</Text>
                  
                  {item.hoste.length > 0 && (
                    <Text style={styles.desktopDetailHost}>
                      {item.hoste.length > 1 ? 'Hosté' : item.hoste[0].role}: {item.hoste.map(h => h.jmeno).join(', ')}
                    </Text>
                  )}

                  <Text style={styles.desktopDetailDescription}>
                    {item.popis ? item.popis : 'Další informace o této akci připravujeme...'}
                  </Text>

                  <View style={styles.detailTagsWrapper}>
                    <View style={styles.tagsContainer}>
                      {item.tag && item.tag.map((t, index) => (
                        <TouchableOpacity key={index} style={[styles.detailTagPill, { backgroundColor: themeColor, borderColor: themeColor }]} onPress={() => clickTagNaProgram(t)} activeOpacity={0.7}>
                          <Text style={styles.detailTagText}>{t}</Text>
                        </TouchableOpacity>
                      ))}
                      
                      {item.odkaz && (
                        <TouchableOpacity style={[styles.detailTagPillOutline, { borderColor: themeColor }]} onPress={() => Linking.openURL(item.odkaz)} activeOpacity={0.7}>
                          <Text style={[styles.detailTagTextOutline, { color: themeColor }]}>VSTUPENKY</Text>
                        </TouchableOpacity>
                      )}

                      {item.rezervace && (
                        <View style={[
                          styles.detailTagPillOutline, 
                          { borderColor: themeColor }, 
                          maRezervaci ? styles.tagPillRezervovano : (jePlno ? styles.tagPillPlno : null)
                        ]}>
                          <Text style={[
                            styles.detailTagTextOutline, 
                            { color: themeColor }, 
                            maRezervaci ? styles.tagTextRezervovano : (jePlno ? styles.tagTextPlno : null)
                          ]}>
                            {maRezervaci ? 'REZERVOVÁNO' : (jePlno ? 'OBSAZENO' : 'NUTNÁ REZERVACE')}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>

                  {item.rezervace && (
                    <View style={{ marginTop: 5 }}>
                      {getKapacitaText()}
                    </View>
                  )}
                </View>

                {/* 2. BÍLÁ KARTA: REZERVACE */}
                {item.rezervace && (
                  <View style={[styles.desktopDetailCard, { backgroundColor: '#F9FAFB', padding: 20 }]}>
                    <Text style={styles.formTitle}>Rezervace</Text>
                    
                    {(maRezervaci || rezervaceOdeslana) && !chciDalsiRezervaci ? (
                      <View style={{ backgroundColor: '#ECFDF5', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#10B981' }}>
                         <Text style={{ fontFamily: THEME.fonts.regular, color: '#065F46', textAlign: 'center', fontWeight: 'bold' }}>
                           Na tuto akci máte úspěšně zajištěnou rezervaci.
                         </Text>
                         {!jePlno && (
                           <TouchableOpacity 
                             style={{ marginTop: 12, alignSelf: 'center', backgroundColor: '#10B981', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 }}
                             onPress={() => {
                               setChciDalsiRezervaci(true);
                               setRezervaceJmeno(''); 
                             }}
                           >
                             <Text style={{ color: 'white', fontFamily: THEME.fonts.regular, fontSize: 13, fontWeight: 'bold' }}>Vytvořit další rezervaci</Text>
                           </TouchableOpacity>
                         )}
                      </View>
                    ) : jePlno ? (
                      <View style={{ backgroundColor: '#F3F4F6', padding: 15, borderRadius: 8 }}>
                         <Text style={{ fontFamily: THEME.fonts.regular, color: THEME.colors.textDoplnkovy, textAlign: 'center' }}>
                           Kapacita této akce již byla naplněna.
                         </Text>
                      </View>
                    ) : (
                      <>
                        {rezervaceChyba && <Text style={styles.errorText}>{rezervaceChyba}</Text>}
                        <TextInput style={styles.input} placeholder="Celé jméno a příjmení" value={rezervaceJmeno} onChangeText={setRezervaceJmeno} placeholderTextColor="#9CA3AF" />
                        <TextInput style={styles.input} placeholder="E-mail (např. jan.novak@email.cz)" keyboardType="email-address" autoCapitalize="none" value={rezervaceEmail} onChangeText={setRezervaceEmail} placeholderTextColor="#9CA3AF" />
                        <TouchableOpacity style={[styles.submitBtn, { backgroundColor: themeColor }]} onPress={handleOdeslatRezervaci} disabled={odesilaRezervaci}>
                          {odesilaRezervaci ? <ActivityIndicator color="white" /> : <Text style={styles.submitBtnText}>Odeslat rezervaci</Text>}
                        </TouchableOpacity>

                        {chciDalsiRezervaci && (
                          <TouchableOpacity onPress={() => setChciDalsiRezervaci(false)} style={{marginTop: 15, alignSelf: 'center'}}>
                            <Text style={{color: THEME.colors.textDoplnkovy, fontFamily: THEME.fonts.regular, fontSize: 14}}>Zrušit zadávání další rezervace</Text>
                          </TouchableOpacity>
                        )}
                      </>
                    )}
                  </View>
                )}
              </View>

              {/* PRAVÝ SLOUPEC (OBRÁZEK A IKONY) - DESKTOP */}
              <View style={styles.desktopDetailRightColumn}>
                {item.image ? (
                  <Image source={{ uri: item.image }} style={styles.desktopDetailImage} resizeMode="cover" />
                ) : (
                  <View style={[styles.desktopDetailImage, {backgroundColor: THEME.colors.kartaAkceOhraniceni, justifyContent: 'center', alignItems: 'center'}]}>
                    <Text style={{color: THEME.colors.textDoplnkovy}}>Obrázek zatím není</Text>
                  </View>
                )}
                
                {item.hoste.map((h, idx) => {
                  if (!h.fotka && h.popis === '' && h.profese === '') return null;
                  return (
                    <View key={idx} style={{ width: '100%', marginTop: 15 }}>
                      <Text style={{ fontFamily: THEME.fonts.regular, fontSize: 15, color: THEME.colors.textHlavni, marginBottom: 10, fontWeight: 'bold' }}>
                        {h.role}
                      </Text>
                      <View style={styles.speakerCard}>
                        <View style={[styles.speakerImageContainer, !h.fotka && { backgroundColor: themeColor }]}>
                          {h.fotka && <Image source={{ uri: h.fotka }} style={styles.speakerImage} resizeMode="cover" />}
                        </View>
                        <View style={styles.speakerInfo}>
                          <Text style={styles.speakerName}>{h.jmeno}</Text>
                          {h.profese !== '' && <Text style={styles.speakerJob}>{h.profese}</Text>}
                          {h.popis !== '' && <Text style={styles.speakerDesc}>{h.popis}</Text>}
                        </View>
                      </View>
                    </View>
                  );
                })}

                <View style={[styles.desktopDetailBottomActions, { justifyContent: 'flex-end', width: '100%', alignItems: 'flex-start', marginTop: 25 }]}>
                  <View style={styles.detailHeartWrapper}>
                    <TouchableOpacity onPress={() => prepniOblibene(item.id)} style={styles.detailHeartIconBtn}>
                      <Ionicons name={oblibeneIds.includes(item.id) ? "heart" : "heart-outline"} size={28} color={THEME.colors.textHlavni} />
                    </TouchableOpacity>
                    {item.pocetOblibenych > 0 && (
                      <Text style={styles.detailHeartCount}>{item.pocetOblibenych}</Text>
                    )}
                  </View>
                </View>
              </View>
            </View>
          ) : (
            /* MOBILNÍ LAYOUT */
            <>
              <View style={styles.detailTitleRow}>
                <Text style={styles.detailMainTitle}>{item.nazev}</Text>
              </View>

              {item.hoste.length > 0 && (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 15, marginTop: -5 }}>
                  <Text style={styles.detailHost}>
                    {item.hoste.length > 1 ? 'Hosté' : item.hoste[0].role}:{' '}
                  </Text>
                  {item.hoste.map((h, hIdx) => (
                    <TouchableOpacity 
                      key={hIdx} 
                      activeOpacity={0.7} 
                      onPress={() => {
                        setAktivniSelectedSpeaker(h);
                        setSpeakerModalVisible(true);
                      }}
                    >
                      <Text style={styles.detailHost}>
                        {h.jmeno}{hIdx < item.hoste.length - 1 ? ', ' : ''}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              <View style={[styles.detailTimeLocationRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', flex: 1, top: !isDesktop ? 3 : 0 }}>
                  <Text style={styles.cardTime}>{timeText}</Text>
                  {mistoText && (
                    <>
                      <Text style={styles.cardTime}> | </Text>
                      <TouchableOpacity onPress={() => handleLocationClick(mistoText)} activeOpacity={0.6}>
                        <Text style={styles.locationLink}>{mistoText}</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  
                  {/* 🎨 NAPOJENÉ IKONY KALENDÁŘE A SDÍLENÍ (MOBIL) */}
                  <TouchableOpacity onPress={() => stahniKalendar(item)} style={styles.iconButton} activeOpacity={0.6}>
                    <Ionicons name="calendar-outline" size={16} color={THEME.colors.tlacitkoText} />
                  </TouchableOpacity>
                  
                  <TouchableOpacity onPress={() => sdiletAkci(item)} style={[styles.actionButton, { marginLeft: 8 }]} activeOpacity={0.6}>
                    <Ionicons name="share-social-outline" size={16} color={THEME.colors.tlacitkoText} />
                    <Text style={styles.actionButtonText}>Sdílet</Text>
                  </TouchableOpacity>

                </View>
              </View>

              {item.image && (
                <Image source={{ uri: item.image }} style={styles.wireframeImage} resizeMode="cover" />
              )}

              <Text style={styles.detailDescription}>
                {item.popis ? item.popis : 'Další informace o této akci připravujeme...'}
              </Text>

              <View style={styles.detailTagsWrapper}>
                <View style={styles.tagsContainer}>
                  {item.tag && item.tag.map((t, index) => (
                    <TouchableOpacity key={index} style={[styles.tagPill, { backgroundColor: themeColor, borderColor: themeColor }]} onPress={() => clickTagNaProgram(t)} activeOpacity={0.7}>
                      <Text style={styles.tagText}>{t}</Text>
                    </TouchableOpacity>
                  ))}
                  
                  {item.odkaz && (
                    <TouchableOpacity style={[styles.tagPillOutline, { borderColor: themeColor }]} onPress={() => Linking.openURL(item.odkaz)} activeOpacity={0.7}>
                      <Text style={[styles.tagTextOutline, { color: themeColor }]}>VSTUPENKY</Text>
                    </TouchableOpacity>
                  )}
                  {item.rezervace && (
                    <View style={[
                      styles.tagPillOutline, 
                      { borderColor: themeColor }, 
                      maRezervaci ? styles.tagPillRezervovano : (jePlno ? styles.tagPillPlno : null)
                    ]}>
                      <Text style={[
                        styles.tagTextOutline, 
                        { color: themeColor }, 
                        maRezervaci ? styles.tagTextRezervovano : (jePlno ? styles.tagTextPlno : null)
                      ]}>
                        {maRezervaci ? 'REZERVOVÁNO' : (jePlno ? 'OBSAZENO' : 'NUTNÁ REZERVACE')}
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              <View style={[styles.detailBottomRowInfo, { alignItems: 'flex-start', marginTop: 10, marginBottom: 25 }]}>
                <View style={styles.detailCapacityWrapper}>
                  {getKapacitaText()}
                </View>
                <View style={styles.detailHeartWrapper}>
                  <TouchableOpacity onPress={() => prepniOblibene(item.id)} style={styles.detailHeartIconBtn}>
                    <Ionicons name={oblibeneIds.includes(item.id) ? "heart" : "heart-outline"} size={28} color={THEME.colors.textHlavni} />
                  </TouchableOpacity>
                  {item.pocetOblibenych > 0 && (
                    <Text style={styles.detailHeartCount}>{item.pocetOblibenych}</Text>
                  )}
                </View>
              </View>

              {item.hoste.map((h, idx) => {
                if (!h.fotka && h.popis === '' && h.profese === '') return null;
                return (
                  <View key={idx} style={{ width: '100%', marginBottom: 25 }}>
                    <Text style={{ fontFamily: THEME.fonts.regular, fontSize: 15, color: THEME.colors.textHlavni, marginBottom: 10, fontWeight: 'bold' }}>
                      {h.role}
                    </Text>
                    <TouchableOpacity style={styles.mobileSpeakerTrigger} onPress={() => { setAktivniSelectedSpeaker(h); setSpeakerModalVisible(true); }} activeOpacity={0.7}>
                      <View style={[styles.mobileSpeakerTriggerAvatar, !h.fotka && { backgroundColor: themeColor }]}>
                        {h.fotka && <Image source={{ uri: h.fotka }} style={styles.speakerImage} resizeMode="cover" />}
                      </View>
                      <View style={{ flex: 1, paddingLeft: 15, justifyContent: 'center' }}>
                        <Text style={styles.speakerName}>{h.jmeno}</Text>
                        <Text style={{ fontFamily: THEME.fonts.regular, fontSize: 13, color: themeColor, fontWeight: 'bold', marginTop: 4 }}>
                          Zobrazit více
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}

              {item.rezervace && (
                <View style={styles.formContainer}>
                  <Text style={styles.formTitle}>Rezervace</Text>
                  
                  {(maRezervaci || rezervaceOdeslana) && !chciDalsiRezervaci ? (
                    <View style={{ backgroundColor: '#ECFDF5', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#10B981' }}>
                       <Text style={{ fontFamily: THEME.fonts.regular, fontSize: 16, color: '#065F46', textAlign: 'center', fontWeight: 'bold' }}>
                         Na tuto akci máte úspěšně zajištěnou rezervaci.
                       </Text>
                       {!jePlno && (
                         <TouchableOpacity 
                           style={{ marginTop: 12, alignSelf: 'center', backgroundColor: '#10B981', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 }}
                           onPress={() => {
                             setChciDalsiRezervaci(true);
                             setRezervaceJmeno(''); 
                           }}
                         >
                           <Text style={{ color: 'white', fontFamily: THEME.fonts.regular, fontSize: 13, fontWeight: 'bold' }}>Vytvořit další rezervaci</Text>
                         </TouchableOpacity>
                       )}
                    </View>
                  ) : jePlno ? (
                    <View style={{ backgroundColor: '#F3F4F6', padding: 15, borderRadius: 8 }}>
                       <Text style={{ fontFamily: THEME.fonts.regular, fontSize: 16, color: THEME.colors.textDoplnkovy, textAlign: 'center' }}>
                         Kapacita této akce již byla naplněna.
                       </Text>
                    </View>
                  ) : (
                    <>
                      {rezervaceChyba && (
                        <Text style={styles.errorText}>{rezervaceChyba}</Text>
                      )}
                      
                      <TextInput
                        style={styles.input}
                        placeholder="Celé jméno a příjmení"
                        value={rezervaceJmeno}
                        onChangeText={setRezervaceJmeno}
                        placeholderTextColor="#9CA3AF"
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="E-mail (např. jan.novak@email.cz)"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={rezervaceEmail}
                        onChangeText={setRezervaceEmail}
                        placeholderTextColor="#9CA3AF"
                      />
                      <TouchableOpacity style={[styles.submitBtn, { backgroundColor: themeColor }]} onPress={handleOdeslatRezervaci} disabled={odesilaRezervaci}>
                        {odesilaRezervaci ? (
                          <ActivityIndicator color="white" />
                        ) : (
                          <Text style={styles.submitBtnText}>Odeslat rezervaci</Text>
                        )}
                      </TouchableOpacity>

                      {chciDalsiRezervaci && (
                        <TouchableOpacity onPress={() => setChciDalsiRezervaci(false)} style={{marginTop: 15, alignSelf: 'center'}}>
                          <Text style={{color: THEME.colors.textDoplnkovy, fontFamily: THEME.fonts.regular, fontSize: 14}}>Zrušit zadávání další rezervace</Text>
                        </TouchableOpacity>
                      )}
                    </>
                  )}
                </View>
              )}
            </>
          )}

          <View style={{ height: 40 }} />
        </View> 
      </View>
      {isDesktop && <Footer isDesktop={isDesktop} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, paddingHorizontal: 15 },
  desktopDetailScrollView: { flex: 1, width: '100%', maxWidth: 1270, alignSelf: 'center', paddingHorizontal: 15 },
  desktopBreadcrumbsContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 20 },
  desktopBreadcrumbLink: { fontFamily: THEME.fonts.regular, fontSize: 16, color: THEME.colors.textDoplnkovy },
  desktopBreadcrumbText: { fontFamily: THEME.fonts.regular, fontSize: 16, color: THEME.colors.textHlavni },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 15, alignSelf: 'flex-start' },
  backBtnText: { fontFamily: THEME.fonts.regular, fontSize: 16, marginLeft: 5 },
  desktopDetailLayout: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%' },
  
  // Napojeno pozadí karty akce
  desktopDetailCard: { backgroundColor: THEME.colors.kartaAkcePozadi, borderRadius: 16, padding: 30, marginBottom: 20, ...Platform.select({ web: { boxShadow: '0px 2px 6px rgba(0,0,0,0.05)' }, default: { elevation: 2 } }) },
  desktopTimeLocationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  desktopCardTime: { fontFamily: THEME.fonts.regular, fontSize: 14, color: THEME.colors.textDoplnkovy },
  desktopDetailMainTitle: { fontFamily: THEME.fonts.regular, fontSize: 32, color: THEME.colors.textHlavni, fontWeight: 'bold', marginBottom: 10, lineHeight: 38 },
  desktopDetailHost: { fontFamily: THEME.fonts.regular, fontSize: 16, color: THEME.colors.textHlavni, marginBottom: 25 },
  desktopDetailDescription: { fontFamily: THEME.fonts.regular, fontSize: 18, color: THEME.colors.textHlavni, lineHeight: 28, marginBottom: 30 },
  detailTagsWrapper: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 25 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', flex: 1, paddingRight: 10 },
  detailTagPill: { alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 18, marginRight: 8, marginTop: 8, borderWidth: 1 },
  detailTagText: { fontFamily: THEME.fonts.regular, color: 'white', fontSize: 13, fontWeight: '600' },
  detailTagPillOutline: { backgroundColor: 'transparent', alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 18, marginRight: 8, marginTop: 8, borderWidth: 1 },
  detailTagTextOutline: { fontFamily: THEME.fonts.regular, fontSize: 13, fontWeight: '600' },
  tagPillRezervovano: { backgroundColor: 'transparent', borderColor: '#10B981' },
  tagTextRezervovano: { color: '#10B981' },
  tagPillPlno: { backgroundColor: '#D1D5DB', borderColor: '#D1D5DB' },
  tagTextPlno: { color: THEME.colors.textDoplnkovy },
  capacityText: { fontFamily: THEME.fonts.regular, fontSize: 15, color: THEME.colors.textDoplnkovy },
  capacityBold: { fontWeight: 'bold', color: THEME.colors.textHlavni },
  capacityLight: { color: THEME.colors.textDoplnkovy },
  formTitle: { fontFamily: THEME.fonts.regular, fontSize: 18, marginBottom: 15, color: THEME.colors.textHlavni, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 12, marginBottom: 12, fontFamily: THEME.fonts.regular, fontSize: 14, color: THEME.colors.textHlavni, backgroundColor: '#F9FAFB' },
  submitBtn: { padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 5 },
  submitBtnText: { color: 'white', fontFamily: THEME.fonts.regular, fontSize: 14, fontWeight: 'bold' },
  errorText: { color: '#EF4444', fontFamily: THEME.fonts.regular, fontSize: 13, marginBottom: 12, lineHeight: 18 },
  desktopDetailRightColumn: { flex: 1, flexDirection: 'column', alignItems: 'flex-end' },
  desktopDetailImage: { width: '100%', aspectRatio: 1.5, borderRadius: 16, marginBottom: 15 },
  
  // Napojeno pozadí a okraj vizitky řečníka
  speakerCard: { backgroundColor: THEME.colors.kartaAkcePozadi, borderRadius: 12, flexDirection: 'row', overflow: 'hidden', borderWidth: 1, borderColor: THEME.colors.kartaAkceOhraniceni, minHeight: 220 },
  speakerImageContainer: { width: 200 },
  speakerImage: { width: '100%', height: '100%' },
  speakerInfo: { flex: 1, padding: 25, justifyContent: 'flex-start' },
  speakerName: { fontFamily: THEME.fonts.regular, fontSize: 18, fontWeight: 'bold', color: THEME.colors.textHlavni, marginBottom: 4 },
  speakerJob: { fontFamily: THEME.fonts.regular, fontSize: 16, color: THEME.colors.textDoplnkovy, marginBottom: 8 },
  speakerDesc: { fontFamily: THEME.fonts.regular, fontSize: 15, color: THEME.colors.textDoplnkovy, lineHeight: 22 },
  desktopDetailBottomActions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' },
  detailHeartWrapper: { alignItems: 'center', minWidth: 40 },
  detailHeartIconBtn: { justifyContent: 'center', alignItems: 'center' },
  detailHeartCount: { fontFamily: THEME.fonts.regular, fontSize: 14, color: THEME.colors.textDoplnkovy, marginTop: 4 },
  detailTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 15 },
  detailMainTitle: { flex: 1, fontFamily: THEME.fonts.regular, fontSize: 26, fontWeight: 'bold', color: THEME.colors.textHlavni, lineHeight: 32 },
  detailHost: { fontFamily: THEME.fonts.regular, fontSize: 18, color: THEME.colors.textDoplnkovy, marginBottom: 15, marginTop: -5 },
  detailTimeLocationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, flexWrap: 'wrap' },
  cardTime: { fontFamily: THEME.fonts.regular, fontSize: 16, color: THEME.colors.textDoplnkovy },
  locationLink: { fontFamily: THEME.fonts.regular, fontSize: 16, color: THEME.colors.textDoplnkovy },
  wireframeImage: { width: '100%', height: 200, backgroundColor: THEME.colors.kartaAkceOhraniceni, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 20, overflow: 'hidden' },
  detailDescription: { fontFamily: THEME.fonts.regular, fontSize: 16, color: THEME.colors.textDoplnkovy, lineHeight: 24, marginBottom: 15 },
  tagPill: { alignSelf: 'flex-start', paddingVertical: 4, paddingHorizontal: 9, borderRadius: 15, marginRight: 6, marginTop: 6, borderWidth: 1 },
  tagText: { fontFamily: THEME.fonts.regular, color: 'white', fontSize: 11, fontWeight: '600' },
  tagPillOutline: { backgroundColor: 'transparent', alignSelf: 'flex-start', paddingVertical: 4, paddingHorizontal: 9, borderRadius: 15, marginRight: 6, marginTop: 6, borderWidth: 1 },
  tagTextOutline: { fontFamily: THEME.fonts.regular, fontSize: 11, fontWeight: '600' },
  detailBottomRowInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 30 },
  detailCapacityWrapper: { flex: 1, justifyContent: 'flex-start', paddingTop: 4 },
  
  // Mobilní vizitka řečníka napojena
  mobileSpeakerTrigger: { flexDirection: 'row', backgroundColor: THEME.colors.kartaAkcePozadi, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: THEME.colors.kartaAkceOhraniceni, alignItems: 'center' },
  mobileSpeakerTriggerAvatar: { width: 60, height: 60, borderRadius: 30, overflow: 'hidden' },
  formContainer: { backgroundColor: '#fff', padding: 20, borderRadius: 10, marginBottom: 30, borderWidth: 1, borderColor: THEME.colors.kartaAkceOhraniceni, ...Platform.select({ web: { boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }, default: { elevation: 1 }}) },

  // 👇 TADY JSOU NOVÉ, SDÍLENÉ STYLY PRO TLAČÍTKA A IKONY (SDÍLET, KALENDÁŘ) 👇
  // Obsahují poznámky k úpravě ohraničení přímo z tvého manuálu
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.tlacitkoVypln,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: THEME.borders.radiusTlacitka,
    // Manuál k ohraničení (Border):
    // 1. Viditelný: necháš borderWidth a borderColor nastavené (viz níže)
    // 2. Neviditelný, ale stejná velikost: borderColor: 'transparent'
    // 3. Úplně bez okraje: borderWidth: 0
    borderWidth: THEME.borders.tloustkaTlacitka,
    borderColor: THEME.colors.tlacitkoOhraniceni,
  },
  actionButtonText: {
    fontFamily: THEME.fonts.medium,
    fontSize: 12,
    marginLeft: 5,
    color: THEME.colors.tlacitkoText,
    fontWeight: 'bold'
  },
  iconButton: {
    width: 30,
    height: 30,
    borderRadius: 15, // Kulaté tlačítko pro kalendář
    backgroundColor: THEME.colors.tlacitkoVypln,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    // Manuál k ohraničení zde platí úplně stejně
    borderWidth: THEME.borders.tloustkaTlacitka,
    borderColor: THEME.colors.tlacitkoOhraniceni,
  }
});