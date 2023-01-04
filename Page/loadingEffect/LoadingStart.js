import React, { useEffect, useState, useRef } from 'react';
import { Animated,Text, View, StyleSheet, Button } from 'react-native-web';
import { colors } from '../../src/constants';
import { useNavigation } from '@react-navigation/native';
 
export const LoadingEffect = () => {
  const counter = useRef(new Animated.Value(0)).current;
  const countInterval = useRef(null);
  const [count, setCount] = useState(0); 
  // const [showSplash,setShowSplash]=useState(false)
  const navigation=useNavigation();
  useEffect(() => {
    countInterval.current = setInterval(() => setCount((old) => old + 5), 100);
    return () => {
      clearInterval(countInterval);
    };
  }, []);

  useEffect(() => {
    load(count)
    if (count == 100) {
      clearInterval(countInterval);
      navigation.navigate('SplashScreen');
    }
  }, [count]);
  const load = (count) => {
    Animated.timing(counter, {
      toValue: count,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const width = counter.interpolate({
  inputRange: [0, 100],
  outputRange: ["0%", "100%"],
  extrapolate: "clamp"
})

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <Animated.View
          style={
            ([StyleSheet.absoluteFill], 
            { backgroundColor: colors.yellowLg, width,borderRadius:25 })
          }></Animated.View>
      </View>

      {/* <Text>{count}%</Text> */}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'Column',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingTop:10,
    backgroundColor: colors.bgColor,
    padding: 8,
    width:'70%'
  },
  progressBar: {
    height: 20,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: colors.grayDark,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 25,
  },
});
