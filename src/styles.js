import { StyleSheet, Platform } from 'react-native';
import { THEME } from '../theme'; // 🎨 Import centrálního vzorníku

export const styles = StyleSheet.create({
  homeHeroContainer: {
    width: '100%',
    aspectRatio: 2/1, 
    position: 'relative',
  },
  homeHeroImage: {
    width: '100%',
    height: '100%',
  },
  homeHeroOverlay: {
    position: 'absolute',
    bottom: 170,
    width: '100%',
    alignItems: 'center',
  },
  homeHeroBtn: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 2, 
    backgroundColor: 'transparent', 
  },
  homeHeroBtnText: {
    fontFamily: THEME.fonts.regular,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  homeContentSection: {
    width: '100%',
    maxWidth: 1270, 
    alignSelf: 'center',
    paddingHorizontal: 15, 
    paddingTop: 60,
  },
  homeSectionTitle: {
    fontFamily: THEME.fonts.regular,
    fontSize: THEME.fontSizes.velkyNadpis,
    letterSpacing: 1,
    marginBottom: 20,
    color: THEME.colors.textHlavni,
  },
  homeText: {
    fontFamily: THEME.fonts.regular,
    fontSize: 18,
    color: THEME.colors.textHlavni,
    lineHeight: 28,
  },

  desktopCardImage: {
    width: '100%',
    aspectRatio: 1.5, 
    borderTopLeftRadius: THEME.borders.radiusKartyAkce, 
    borderTopRightRadius: THEME.borders.radiusKartyAkce, 
    backgroundColor: THEME.colors.kartaAkceOhraniceni
  },

  detailTagPill: {
    alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 18, marginRight: 8, marginTop: 8, borderWidth: 1
  },
  detailTagText: {
    fontFamily: THEME.fonts.regular, color: 'white', fontSize: 13, fontWeight: '600'
  },
  detailTagPillOutline: {
    backgroundColor: 'transparent', alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 18, marginRight: 8, marginTop: 8, borderWidth: 1
  },
  detailTagTextOutline: {
    fontFamily: THEME.fonts.regular, fontSize: 13, fontWeight: '600'
  },

  desktopDetailScrollView: {
    flex: 1, 
    width: '100%',
    maxWidth: 1270, 
    alignSelf: 'center',
    paddingHorizontal: 15,
  },
  desktopBreadcrumbsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  desktopBreadcrumbLink: {
    fontFamily: THEME.fonts.regular,
    fontSize: 16,
    color: THEME.colors.textDoplnkovy, 
  },
  desktopBreadcrumbText: {
    fontFamily: THEME.fonts.regular,
    fontSize: 16,
    color: THEME.colors.textHlavni,
  },
  desktopDetailLayout: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
  },
  
  desktopDetailCard: {
    backgroundColor: THEME.colors.kartaAkcePozadi,
    borderRadius: 16,
    padding: 30,
    marginBottom: 20, 
    ...Platform.select({
      web: { boxShadow: `0px 2px 6px ${THEME.colors.kartaAkceStín}` },
      default: { elevation: 2 }
    })
  },

  desktopTimeLocationRow: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10,
  },
  desktopCardTime: {
    fontFamily: THEME.fonts.regular,
    fontSize: 14,
    color: THEME.colors.textDoplnkovy,
  },
  desktopDetailMainTitle: {
    fontFamily: THEME.fonts.regular, 
    fontSize: THEME.fontSizes.velkyNadpis, 
    color: THEME.colors.textHlavni, 
    fontWeight: 'bold',
    marginBottom: 10,
    lineHeight: 38,
  },
  desktopDetailHost: {
    fontFamily: THEME.fonts.regular, 
    fontSize: 16, 
    color: THEME.colors.textHlavni, 
    marginBottom: 25,
  },
  desktopDetailDescription: {
    fontFamily: THEME.fonts.regular, 
    fontSize: 18, 
    color: THEME.colors.textHlavni, 
    lineHeight: 28, 
    marginBottom: 30,
  },
  desktopDetailRightColumn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end', 
  },
  desktopDetailImage: {
    width: '100%',
    aspectRatio: 1.5, 
    borderRadius: 16,
    marginBottom: 15,
  },
  desktopDetailBottomActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  detailBottomRowInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', 
    marginBottom: 30,
  },
  detailCapacityWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 4, 
  },
  capacityText: {
    fontFamily: THEME.fonts.regular,
    fontSize: 15,
    color: THEME.colors.textDoplnkovy,
  },
  capacityBold: {
    fontWeight: 'bold',
    color: THEME.colors.textHlavni,
  },
  capacityLight: {
    color: THEME.colors.textDoplnkovy,
  },
  detailHeartWrapper: {
    alignItems: 'center',
    minWidth: 40,
  },
  detailHeartIconBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailHeartCount: {
    fontFamily: THEME.fonts.regular,
    fontSize: 14,
    color: THEME.colors.textDoplnkovy,
    marginTop: 4,
  },

  desktopHeaderFavBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  desktopHeaderFavCount: {
    fontFamily: THEME.fonts.regular,
    fontSize: 18,
    color: THEME.colors.textHlavni,
    marginLeft: 6, 
  },

  desktopGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8, 
  },
  desktopCardWrapper: {
    width: '25%', 
    paddingHorizontal: 8,
    marginBottom: 20, 
  },
  mobileCardWrapper: {
    width: '100%',
    marginBottom: 15,
  },

  desktopHeader: { 
    height: 55,
    width: '100%',
    backgroundColor: THEME.colors.pozadiHlavicky, 
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    zIndex: 50,
    ...Platform.select({
      web: { boxShadow: `0px 4px 12px ${THEME.colors.kartaAkceStín}` },
      default: { elevation: 4 }
    })
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
      web: { boxShadow: `0px 4px 15px ${THEME.colors.kartaAkceStín}` },
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

  desktopContainer: {
    width: '100%',
    maxWidth: 1240,
    alignSelf: 'center',
    paddingTop: 10,
  },

  mainContainer: { flex: 1 }, 
  container: { flex: 1, backgroundColor: THEME.colors.pozadiAplikace },
  
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
  headerLogo: { width: 36, height: 36, marginRight: 10, resizeMode: 'contain' },
  headerText: { fontFamily: THEME.fonts.regular, color: THEME.colors.textHlavickyAktivni, fontSize: 22, includeFontPadding: false },
  
  content: { flex: 1, paddingHorizontal: 15 },
  mapTabContainer: { flex: 1, paddingHorizontal: 15 },

  pageTitleContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginBottom: 15 },
  pageTitle: { fontFamily: THEME.fonts.regular, fontSize: THEME.fontSizes.velkyNadpis, letterSpacing: 1 },

  toggleViewBtn: {
    width: 44,
    height: 44,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  favoriteDayHeader: { fontFamily: THEME.fonts.regular, fontSize: 20, color: THEME.colors.textHlavni, marginBottom: 15, marginTop: 0 }, 
  
  webMap: { flex: 1, width: '100%', borderRadius: 15, marginBottom: 15, borderWidth: 0, minHeight: 350 },
  daysContainer: { flexDirection: 'row', marginBottom: 20 },
  dayPill: { height: 29, paddingHorizontal: 12, borderRadius: THEME.borders.radiusDny, borderWidth: THEME.borders.tloustkaDny, marginRight: 8, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' },
  dayText: { fontFamily: THEME.fonts.regular, fontSize: 13 },
  dayTextActive: { fontFamily: THEME.fonts.regular, color: 'white' },
  
  desktopDaysContainer: { marginBottom: 30 },
  desktopDayPill: { width: 86, height: 36, borderRadius: 18, marginRight: 16, paddingVertical: 0, paddingHorizontal: 0 },
  desktopDayText: { fontSize: 14 },
  
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
  
  timeLocationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5, flexWrap: 'wrap' },
  cardTime: { fontFamily: THEME.fonts.regular, fontSize: 16, color: THEME.colors.textDoplnkovy },
  locationLink: { fontFamily: THEME.fonts.regular, fontSize: 16, color: THEME.colors.textDoplnkovy },
  cardTitle: { fontFamily: THEME.fonts.regular, fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: THEME.colors.textHlavni },
  cardHost: { fontFamily: THEME.fonts.regular, fontSize: 14, color: THEME.colors.textDoplnkovy, marginBottom: 10 },
  cardBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', flex: 1, paddingRight: 10 },
  
  tagPill: { alignSelf: 'flex-start', paddingVertical: 4, paddingHorizontal: 9, borderRadius: 15, marginRight: 6, marginTop: 6, borderWidth: 1 },
  tagText: { fontFamily: THEME.fonts.regular, color: 'white', fontSize: 11, fontWeight: '600' },
  
  tagPillOutline: { backgroundColor: 'transparent', alignSelf: 'flex-start', paddingVertical: 4, paddingHorizontal: 9, borderRadius: 15, marginRight: 6, marginTop: 6, borderWidth: 1 },
  tagTextOutline: { fontFamily: THEME.fonts.regular, fontSize: 11, fontWeight: '600' },
  
  tagPillRezervovano: { backgroundColor: 'transparent', borderColor: '#10B981' }, // Zelená nechána úmyslně
  tagTextRezervovano: { color: '#10B981' }, // Zelená nechána úmyslně
  tagPillPlno: { backgroundColor: THEME.colors.kartaAkceOhraniceni, borderColor: THEME.colors.kartaAkceOhraniceni },
  tagTextPlno: { color: THEME.colors.textDoplnkovy },

  heartIconBtn: { paddingBottom: 0, paddingLeft: 10, marginBottom: -4 },
  emptyText: { fontFamily: THEME.fonts.regular, color: THEME.colors.textDoplnkovy, textAlign: 'center', marginTop: 30, lineHeight: 22 },
  
  backBtn: { flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 15, alignSelf: 'flex-start' },
  backBtnText: { fontFamily: THEME.fonts.regular, fontSize: 16, marginLeft: 5 },
  
  detailTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 15 },
  detailMainTitle: { flex: 1, fontFamily: THEME.fonts.regular, fontSize: 26, fontWeight: 'bold', color: THEME.colors.textHlavni, lineHeight: 32 },
  
  detailHost: { fontFamily: THEME.fonts.regular, fontSize: 18, color: THEME.colors.textDoplnkovy, marginBottom: 15, marginTop: -5 },
  
  detailTimeLocationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, flexWrap: 'wrap' },
  wireframeImage: { width: '100%', height: 200, backgroundColor: THEME.colors.kartaAkceOhraniceni, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 20, overflow: 'hidden' },
  wireframeText: { fontFamily: THEME.fonts.regular, color: THEME.colors.textDoplnkovy, marginTop: 10 },
  detailDescription: { fontFamily: THEME.fonts.regular, fontSize: 16, color: THEME.colors.textDoplnkovy, lineHeight: 24, marginBottom: 15 },
  
  detailTagsWrapper: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 25 },
  
  formContainer: { backgroundColor: THEME.colors.kartaAkcePozadi, padding: 20, borderRadius: 10, marginBottom: 30, borderWidth: 1, borderColor: THEME.colors.kartaAkceOhraniceni, ...Platform.select({ web: { boxShadow: `0px 1px 2px ${THEME.colors.kartaAkceStín}` }, default: { elevation: 1 }}) },
  formTitle: { fontFamily: THEME.fonts.regular, fontSize: 18, marginBottom: 15, color: THEME.colors.textHlavni, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: THEME.colors.kartaAkceOhraniceni, borderRadius: 8, padding: 12, marginBottom: 12, fontFamily: THEME.fonts.regular, fontSize: 14, color: THEME.colors.textHlavni, backgroundColor: '#F9FAFB' },
  submitBtn: { padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 5 },
  submitBtnText: { color: 'white', fontFamily: THEME.fonts.regular, fontSize: 14, fontWeight: 'bold' },
  successText: { color: '#10B981', fontFamily: THEME.fonts.regular, fontSize: 15, textAlign: 'center', marginVertical: 10, fontWeight: 'bold' },
  errorText: { color: '#EF4444', fontFamily: THEME.fonts.regular, fontSize: 13, marginBottom: 12, lineHeight: 18 }, 

  dalsiContainer: { paddingTop: 20, paddingBottom: 40 },
  dalsiHlavniNadpis: { fontFamily: THEME.fonts.regular, fontSize: THEME.fontSizes.velkyNadpis, letterSpacing: 1, color: THEME.colors.textHlavni, marginBottom: 30, lineHeight: 38 },
  menuList: { marginBottom: 30 },
  menuItemWrapper: { marginBottom: 15 },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5 },
  menuItemText: { fontFamily: THEME.fonts.regular, fontSize: 20, color: THEME.colors.textHlavni },
  menuExpandedContent: { marginTop: 10, paddingLeft: 10, borderLeftWidth: 2 },
  menuExpandedText: { fontFamily: THEME.fonts.regular, fontSize: 16, color: THEME.colors.textDoplnkovy, lineHeight: 22 },
  contentLinkRow: { paddingVertical: 6, paddingLeft: 5 },
  contentInlineLink: { fontFamily: THEME.fonts.regular, fontSize: 14, color: THEME.colors.textDoplnkovy },
  
  socialContainer: { flexDirection: 'row', gap: 15, marginTop: 10 },
  socialCircleBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: THEME.colors.textHlavni, justifyContent: 'center', alignItems: 'center' },
  customSocialIcon: { width: 36, height: 36, borderRadius: 18, resizeMode: 'cover' },
  customFacebookIconImg: { width: 36, height: 36, borderRadius: 18, resizeMode: 'cover' },
  
  colorPickerContainer: { marginTop: 25, padding: 15, backgroundColor: THEME.colors.kartaAkcePozadi, borderRadius: 10, borderWidth: 1, borderColor: THEME.colors.kartaAkceOhraniceni },
  colorPickerTitle: { fontFamily: THEME.fonts.regular, fontSize: 16, marginBottom: 10, color: THEME.colors.textHlavni, fontWeight: 'bold' },

  bottomNav: { flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: THEME.colors.pozadiSpodniListy, borderTopWidth: 1, borderColor: THEME.colors.kartaAkceOhraniceni, height: Platform.OS === 'web' ? 60 : 'auto', alignItems: Platform.OS === 'web' ? 'center' : 'stretch', paddingTop: Platform.OS === 'web' ? 0 : 10, paddingBottom: Platform.OS === 'web' ? 0 : (Platform.OS === 'android' ? 50 : 40) },
  navItem: { flex: 1, alignItems: 'center', justifyContent: Platform.OS === 'web' ? 'center' : 'flex-start' },
  navText: { fontFamily: THEME.fonts.regular, fontSize: 10, marginTop: Platform.OS === 'web' ? 2 : 4 },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  modalContent: {
    backgroundColor: THEME.colors.kartaAkcePozadi,
    borderRadius: 16,
    padding: 25,
    width: '85%',
    maxWidth: 340,
    alignItems: 'center',
    ...Platform.select({ web: { boxShadow: '0px 4px 10px rgba(0,0,0,0.15)' }, default: { elevation: 8 } })
  },
  modalCloseBtn: {
    position: 'absolute',
    top: 15,
    right: 15,
    padding: 5,
    zIndex: 10
  },
  modalTitle: {
    fontFamily: THEME.fonts.regular,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: THEME.colors.textHlavni,
    textAlign: 'center'
  },
  modalText: {
    fontFamily: THEME.fonts.regular,
    fontSize: 15,
    color: THEME.colors.textDoplnkovy,
    textAlign: 'center',
    lineHeight: 22
  },
  
  mapModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.4)', 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    ...(Platform.OS === 'web' ? { backdropFilter: 'blur(12px)' } : {}), 
  },
  mapModalContent: {
    width: '100%',
    maxWidth: 900,
    height: '80%',
    backgroundColor: THEME.colors.kartaAkcePozadi,
    borderRadius: 16,
    position: 'relative',
    borderWidth: 1,
    borderColor: THEME.colors.kartaAkceOhraniceni,
    ...Platform.select({ web: { boxShadow: '0px 10px 40px rgba(0,0,0,0.15)' }, default: { elevation: 10 } })
  },
  mapModalCloseBtn: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: THEME.colors.kartaAkcePozadi,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999, 
    ...Platform.select({ web: { boxShadow: '0px 2px 5px rgba(0,0,0,0.15)' }, default: { elevation: 5 } })
  },

  listCardImageDesktop: {
    width: 360,
    height: 270,
    borderTopLeftRadius: THEME.borders.radiusKartyAkce,
    borderBottomLeftRadius: THEME.borders.radiusKartyAkce,
    backgroundColor: THEME.colors.kartaAkceOhraniceni
  },
  listAnnotation: {
    fontFamily: THEME.fonts.regular,
    fontSize: 15,
    color: THEME.colors.textDoplnkovy,
    lineHeight: 22,
    marginTop: 10,
    marginBottom: 15,
  },

  footerContainer: {
    backgroundColor: '#000000',
    width: '100%',
    paddingVertical: 25, 
    alignItems: 'center',
    marginTop: 60,
  },
  footerInner: {
    width: '100%',
    maxWidth: 1270,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
  },
  footerLogoCol: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerLogo: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
    marginRight: 15,
  },
  footerTitleText: {
    fontFamily: THEME.fonts.regular,
    fontSize: 15,
    color: '#FFFFFF',
    lineHeight: 20,
    letterSpacing: 0.5,
  },
  footerTextCol: {
    justifyContent: 'flex-start',
  },
  footerLabel: {
    fontFamily: THEME.fonts.regular,
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  footerText: {
    fontFamily: THEME.fonts.regular,
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 22,
  },
  footerSocialCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  footerSocialBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex', 
  },
  footerSocialIconImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover',
  },

  speakerCard: {
    backgroundColor: THEME.colors.kartaAkcePozadi,
    borderRadius: 12,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: THEME.colors.kartaAkceOhraniceni,
    minHeight: 220, 
  },
  speakerImageContainer: {
    width: 200, 
  },
  speakerImage: {
    width: '100%',
    height: '100%',
  },
  speakerInfo: {
    flex: 1,
    padding: 25,
    justifyContent: 'flex-start',
  },
  speakerName: {
    fontFamily: THEME.fonts.regular,
    fontSize: 18,
    fontWeight: 'bold',
    color: THEME.colors.textHlavni,
    marginBottom: 4,
  },
  speakerJob: {
    fontFamily: THEME.fonts.regular,
    fontSize: 16,
    color: THEME.colors.textDoplnkovy,
    marginBottom: 8,
  },
  speakerDesc: {
    fontFamily: THEME.fonts.regular,
    fontSize: 15,
    color: THEME.colors.textDoplnkovy,
    lineHeight: 22,
  },

  mobileSpeakerTrigger: {
    flexDirection: 'row',
    backgroundColor: THEME.colors.kartaAkcePozadi,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: THEME.colors.kartaAkceOhraniceni,
    alignItems: 'center',
  },
  mobileSpeakerTriggerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
  },
  
  mobileSpeakerOverlay: {
    position: 'absolute',
    top: 0, 
    bottom: 0, 
    left: 0, 
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.4)', 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25, 
    zIndex: 1000,
    ...(Platform.OS === 'web' ? { backdropFilter: 'blur(12px)' } : {}), 
  },
  desktopSpeakerModalContent: {
    width: '100%',
    maxWidth: 1000, 
    height: 500,    
    backgroundColor: THEME.colors.kartaAkcePozadi,
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row', 
    ...Platform.select({ web: { boxShadow: '0px 10px 40px rgba(0,0,0,0.15)' }, default: { elevation: 10 } })
  },
  desktopSpeakerModalImageContainer: {
    flex: 1, 
    height: '100%',
  },
  desktopSpeakerModalTextContainer: {
    flex: 1, 
    position: 'relative',
    backgroundColor: THEME.colors.kartaAkcePozadi,
  },
  desktopSpeakerCloseBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: THEME.colors.kartaAkcePozadi,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    ...Platform.select({ web: { boxShadow: '0px 2px 5px rgba(0,0,0,0.2)' }, default: { elevation: 5 } })
  },
  desktopSpeakerModalInfo: {
    padding: 40,
    paddingTop: 60, 
    paddingBottom: 40,
  },

  mobileSpeakerModalContent: {
    width: '100%',
    maxWidth: 400,
    maxHeight: '100%', 
    backgroundColor: THEME.colors.kartaAkcePozadi,
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({ web: { boxShadow: '0px 10px 40px rgba(0,0,0,0.15)' }, default: { elevation: 10 } })
  },
  mobileSpeakerModalImageContainer: {
    width: '100%',
    aspectRatio: 1, 
    position: 'relative',
  },
  mobileSpeakerCloseBtn: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: THEME.colors.kartaAkcePozadi,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    ...Platform.select({ web: { boxShadow: '0px 2px 5px rgba(0,0,0,0.2)' }, default: { elevation: 5 } })
  },
  mobileSpeakerModalInfo: {
    padding: 25,
  },
  mobileSpeakerModalName: {
    fontFamily: THEME.fonts.regular,
    fontSize: 24,
    fontWeight: 'bold',
    color: THEME.colors.textHlavni,
    marginBottom: 6,
  },
  mobileSpeakerModalJob: {
    fontFamily: THEME.fonts.regular,
    fontSize: 15,
    color: THEME.colors.textDoplnkovy,
    marginBottom: 15,
  },
  mobileSpeakerModalDesc: {
    fontFamily: THEME.fonts.regular,
    fontSize: 16,
    color: THEME.colors.textDoplnkovy,
    lineHeight: 24,
  },

  speakerEventsSection: {
    marginTop: 30,
  },
  speakerEventCard: {
    backgroundColor: THEME.colors.kartaAkcePozadi,
    borderWidth: 1,
    borderColor: THEME.colors.kartaAkceOhraniceni,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  speakerEventTime: {
    fontFamily: THEME.fonts.regular,
    fontSize: 12,
    color: THEME.colors.textDoplnkovy,
    marginBottom: 4,
  },
  speakerEventTitle: {
    fontFamily: THEME.fonts.regular,
    fontSize: 15,
    fontWeight: 'bold',
    color: THEME.colors.textHlavni,
  },

  filterTriggerBtn: {
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: THEME.colors.tlacitkoVypln, 
    paddingVertical: 6, 
    paddingHorizontal: 12, 
    borderRadius: THEME.borders.radiusTlacitka,
    borderWidth: THEME.borders.tloustkaTlacitka,
    borderColor: THEME.colors.tlacitkoOhraniceni,
    alignSelf: 'flex-start'
  },
  filterTriggerText: {
    fontFamily: THEME.fonts.regular, 
    marginLeft: 6, 
    fontWeight: 'bold', 
    fontSize: 13,
    color: THEME.colors.tlacitkoText
  },

  mobileFilterShareBtn: {
    height: 29, 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: THEME.colors.tlacitkoVypln, 
    paddingHorizontal: 12, 
    borderRadius: THEME.borders.radiusTlacitka,
    borderWidth: THEME.borders.tloustkaTlacitka,
    borderColor: THEME.colors.tlacitkoOhraniceni,
  },
  mobileFilterShareText: {
    fontFamily: THEME.fonts.regular, 
    marginLeft: 6, 
    fontWeight: 'bold', 
    fontSize: 13,
    color: THEME.colors.tlacitkoText
  },

  filterModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    ...(Platform.OS === 'web' ? { backdropFilter: 'blur(5px)' } : {}), 
  },
  filterModalContent: {
    backgroundColor: THEME.colors.kartaAkcePozadi,
    borderRadius: 16,
    padding: 25,
    width: '100%',
    maxWidth: 400,
    ...Platform.select({ web: { boxShadow: '0px 4px 15px rgba(0,0,0,0.1)' }, default: { elevation: 8 } })
  },
  filterHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  filterMainTitle: {
    fontFamily: THEME.fonts.regular,
    fontSize: 22,
    color: THEME.colors.textHlavni,
    fontWeight: 'bold'
  },
  filterResetBtn: {
    borderWidth: 1,
    borderColor: THEME.colors.kartaAkceOhraniceni,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12
  },
  filterResetText: {
    fontFamily: THEME.fonts.regular,
    fontSize: 13,
    color: THEME.colors.textDoplnkovy
  },
  filterFieldWrapper: {
    marginBottom: 20
  },
  filterFieldLabel: {
    fontFamily: THEME.fonts.regular,
    fontSize: 15,
    color: THEME.colors.textHlavni,
    marginBottom: 8
  },
  filterFieldBox: {
    backgroundColor: THEME.colors.kartaAkceOhraniceni,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  filterFieldText: {
    fontFamily: THEME.fonts.regular,
    fontSize: 14,
    color: THEME.colors.textDoplnkovy
  },
  filterConfirmBtn: {
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: 30
  },
  filterConfirmBtnText: {
    fontFamily: THEME.fonts.regular,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15
  },
  filterCheckboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12
  },
  filterCheckboxText: {
    fontFamily: THEME.fonts.regular,
    fontSize: 15,
    color: THEME.colors.textDoplnkovy,
    marginLeft: 10
  },
  filterSubModalActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 20,
    borderTopWidth: 1,
    borderColor: THEME.colors.kartaAkceOhraniceni
  },
  filterSubConfirmBtn: {
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    paddingHorizontal: 25,
    marginRight: 15
  },
  filterSubCancelBtn: {
    paddingVertical: 12,
    paddingHorizontal: 15
  },
  filterSubCancelText: {
    fontFamily: THEME.fonts.regular,
    fontSize: 15,
    color: THEME.colors.textHlavni
  }
});