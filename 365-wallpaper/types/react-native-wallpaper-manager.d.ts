declare module 'react-native-wallpaper-manager' {
  const WallpaperManager: {
    HOME_SCREEN: number
    LOCK_SCREEN: number
    BOTH: number

    setWallpaper(
      options: { uri: string },
      screen: number,
      callback?: () => void
    ): void
  }

  export default WallpaperManager
}
