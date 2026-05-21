import { Mood } from '../../../types/game';

interface FaceData {
  leftEye: string;
  rightEye: string;
  mouth: string;
  extra?: string; // 볼터치, 눈물 등
}

export const faces: Record<Mood, FaceData> = {
  excited: {
    leftEye: 'M33,38 Q37,30 41,38',
    rightEye: 'M59,38 Q63,30 67,38',
    mouth: 'M34,54 Q50,70 66,54',
    extra: 'M26,46 A4,3 0 1,0 34,46 M66,46 A4,3 0 1,0 74,46', // 볼터치
  },
  happy: {
    leftEye: 'M34,40 A3,3 0 1,1 40,40 A3,3 0 1,1 34,40',
    rightEye: 'M60,40 A3,3 0 1,1 66,40 A3,3 0 1,1 60,40',
    mouth: 'M36,56 Q50,66 64,56',
    extra: 'M28,48 A3,2 0 1,0 34,48 M66,48 A3,2 0 1,0 72,48',
  },
  thinking: {
    leftEye: 'M34,40 A3,3 0 1,1 40,40 A3,3 0 1,1 34,40',
    rightEye: 'M60,38 A3.5,3.5 0 1,1 67,38 A3.5,3.5 0 1,1 60,38',
    mouth: 'M40,60 Q50,56 62,60',
  },
  confused: {
    leftEye: 'M35,40 A2.5,2.5 0 1,1 40,40 A2.5,2.5 0 1,1 35,40',
    rightEye: 'M60,36 A3.5,4 0 1,1 67,36 A3.5,4 0 1,1 60,36',
    mouth: 'M42,60 Q48,56 56,60 Q60,62 64,58',
  },
  sad: {
    leftEye: 'M34,42 A2.5,2.5 0 1,1 39,42 A2.5,2.5 0 1,1 34,42',
    rightEye: 'M61,42 A2.5,2.5 0 1,1 66,42 A2.5,2.5 0 1,1 61,42',
    mouth: 'M38,64 Q50,56 62,64',
    extra: 'M36,48 L34,56 M64,48 L66,56', // 눈물
  },
  neutral: {
    leftEye: 'M34,40 A3,3 0 1,1 40,40 A3,3 0 1,1 34,40',
    rightEye: 'M60,40 A3,3 0 1,1 66,40 A3,3 0 1,1 60,40',
    mouth: 'M40,58 L60,58',
  },
  win: {
    leftEye: 'M31,36 Q37,28 43,36',
    rightEye: 'M57,36 Q63,28 69,36',
    mouth: 'M30,52 Q50,74 70,52',
    extra: 'M24,44 A5,3 0 1,0 34,44 M66,44 A5,3 0 1,0 76,44', // 큰 볼터치
  },
};
