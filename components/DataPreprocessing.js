import { InferenceSession } from 'onnxruntime-react-native';

// untuk Load Model ONNX
const LoadModel = async() => {
  const modelPath = require('./assets/siamese_cnn1d_1layer_100epoch_20video_KataHurufAngka_mediapipe_lr0001.onnx');
  const session = await InferenceSession.create(modelPath);
  return session;
}

// ambil frame dari video
