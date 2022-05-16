import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';

// new imports
import * as tf from "@tensorflow/tfjs";
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  // initialisation of the new camera outside of the component
  const TensorCamera = cameraWithTensors(Camera);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <TensorCamera 
        style={styles.camera} 
        type={Camera.Constants.Type.back}
        onReady={() => {}}
        resizeHeight={200}
        resizeWidth={152}
        resizeDepth={3}
        autorender={true}
        cameraTextureHeight={textureDims.height}
        cameraTextureWidth={textureDims.width}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera:{
    flex: 1,
  },
});
const textureDims = Platform.OS === 'ios' ?
{
  height: 1920,
  width: 1080,
} :
{
  height: 1200,
  width: 1600,
};