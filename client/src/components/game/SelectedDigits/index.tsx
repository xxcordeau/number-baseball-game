import { DigitsRow, Slot } from './styles';

const SLOT_COLORS = ['#FFF0F3', '#FFF8E1', '#F0F8FF'];

interface SelectedDigitsProps {
  digits: number[];
  maxSlots?: number;
}

export default function SelectedDigits({ digits, maxSlots = 3 }: SelectedDigitsProps) {
  return (
    <DigitsRow>
      {Array.from({ length: maxSlots }).map((_, i) => (
        <Slot key={i} $filled={i < digits.length} $color={SLOT_COLORS[i]}>
          {digits[i] ?? ''}
        </Slot>
      ))}
    </DigitsRow>
  );
}
