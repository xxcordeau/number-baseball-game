import { PadGrid, PadKey, ActionRow } from './styles';
import Button from '../../common/Button';

interface NumberPadProps {
  selected: number[];
  onSelect: (digit: number) => void;
  onDelete: () => void;
  onConfirm: () => void;
  disabledDigits?: number[];
  maxDigits?: number;
}

export default function NumberPad({
  selected,
  onSelect,
  onDelete,
  onConfirm,
  disabledDigits = [],
  maxDigits = 3,
}: NumberPadProps) {
  const isFull = selected.length >= maxDigits;

  return (
    <>
      <PadGrid>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => {
          const isSelected = selected.includes(n);
          const isDisabled = (isFull && !isSelected) || disabledDigits.includes(n);
          return (
            <PadKey
              key={n}
              $selected={isSelected}
              $disabled={isDisabled}
              $digit={n}
              onClick={() => {
                if (isSelected) return;
                if (!isFull) onSelect(n);
              }}
            >
              {n}
            </PadKey>
          );
        })}
      </PadGrid>
      <ActionRow>
        <Button variant="ghost" onClick={onDelete} disabled={selected.length === 0}>
          지우기
        </Button>
        <Button onClick={onConfirm} disabled={selected.length !== maxDigits}>
          확인
        </Button>
      </ActionRow>
    </>
  );
}
