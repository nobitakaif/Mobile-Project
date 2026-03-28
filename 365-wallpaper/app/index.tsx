import React, { useRef } from 'react'
import { View, Button } from 'react-native'
import ViewShot from 'react-native-view-shot'
import WallpaperManager from 'react-native-wallpaper-manager';

export default function App() {
  const viewShotRef = useRef(null)

  const setWallpaper = async () => {
    try {
        if(!viewShotRef.current){
            return 
        }
      const uri = await viewShotRef.current.capture()

      console.log(uri)
      
      WallpaperManager.setWallpaper(
        { uri },
        WallpaperManager.HOME_SCREEN,
        () => console.log('Wallpaper set!')
      )
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <ViewShot
      ref={viewShotRef}
      options={{ format: 'png', quality: 1.0 }}
      style={{ flex: 1 }}
    >
      {/* THIS IS YOUR WALLPAPER UI */}
      <View style={{ flex: 1, backgroundColor: 'green' }}>
        {/* your dots grid goes here */}
      </View>

      <Button title="Set as Wallpaper" onPress={setWallpaper} />
    </ViewShot>
  )
}