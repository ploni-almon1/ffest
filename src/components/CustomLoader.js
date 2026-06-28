import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, Platform } from 'react-native';
import { THEME } from '../../theme'; // 🎨 Import centrálního vzorníku

export default function CustomLoader({ themeColor }) {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animace běží na pozadí vždy, ale vizuálně se aplikuje jen tehdy, pokud je to v theme.js povoleno.
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000, 
        easing: Easing.linear,
        useNativeDriver: Platform.OS !== 'web', 
      })
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  /* 🛠️ AUTOMATICKÉ NASTAVENÍ STYLŮ PODLE ŠABLONY (Tady už nic nepřepisuj!)
    Tento kód se sám podívá do theme.js a zařídí se podle tvého nastavení.
  */
  
  // 1. Kontrola rotace: Pokud je v theme.js tocitObrazek: false, transformace bude prázdná a obrázek zůstane stát.
  const transformStyle = THEME.loaderNastaveni.tocitObrazek 
    ? [{ rotate: spin }] 
    : [];

  // 2. Kontrola barev: Pokud je v theme.js prebarvitBarvou: false, vrátí se undefined a obrázek/GIF bude mít své původní barvy.
  const tintColorStyle = THEME.loaderNastaveni.prebarvitBarvou 
    ? (themeColor || THEME.colors.primarniMotiv) 
    : undefined; 

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: THEME.colors.pozadiAplikace }}>
      <Animated.Image
        source={THEME.images.loaderObrazek} // Načítá obrázek specifikovaný v theme.js
        style={{
          width: 60, // Šířka loaderu (můžeš zvětšit/zmenšit podle potřeby v budoucnu)
          height: 60, // Výška loaderu
          tintColor: tintColorStyle, // Aplikuje jednobarevný filtr, nebo nechá původní barvy obrázku
          transform: transformStyle // Roztočí obrázek, nebo ho nechá v klidu
        }}
        resizeMode="contain"
      />
    </View>
  );
}