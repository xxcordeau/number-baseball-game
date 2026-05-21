import { Mood } from '../../../types/game';
import { moodColors } from '../../../utils/mood';
import { blobShapes, BlobShape } from './shapes';
import { faces } from './faces';
import { BlobSvg, BlobWrapper } from './styles';

const moodToShape: Record<Mood, BlobShape> = {
  neutral: 'circle',
  excited: 'flower',
  happy: 'drop',
  thinking: 'square',
  confused: 'hex',
  sad: 'triangle',
  win: 'heart',
};

interface BlobCharacterProps {
  mood?: Mood;
  size?: number;
  animate?: boolean;
  color?: string;
}

export default function BlobCharacter({
  mood = 'neutral',
  size = 80,
  animate = true,
  color,
}: BlobCharacterProps) {
  const shape = moodToShape[mood];
  const fillColor = color || moodColors[mood];
  const face = faces[mood];

  return (
    <BlobWrapper>
      <BlobSvg
        viewBox="0 0 100 100"
        $animate={animate}
        $size={size}
      >
        {/* 블롭 본체 */}
        <path d={blobShapes[shape]} fill={fillColor} />
        {/* 하이라이트 */}
        <ellipse cx="38" cy="28" rx="8" ry="5" fill="rgba(255,255,255,0.35)" transform="rotate(-20 38 28)" />
        {/* 눈 */}
        <path d={face.leftEye} fill="#1A1A1A" stroke="#1A1A1A" strokeWidth="1.2" />
        <path d={face.rightEye} fill="#1A1A1A" stroke="#1A1A1A" strokeWidth="1.2" />
        {/* 입 */}
        <path
          d={face.mouth}
          fill="none"
          stroke="#1A1A1A"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        {/* 볼터치/눈물 등 */}
        {face.extra && (
          <path
            d={face.extra}
            fill={mood === 'sad' ? '#38B6FF' : `${fillColor}cc`}
            stroke="none"
            opacity={mood === 'sad' ? 0.6 : 0.5}
          />
        )}
      </BlobSvg>
    </BlobWrapper>
  );
}
