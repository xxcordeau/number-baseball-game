import styled from 'styled-components';

export const StyledBadge = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 14px;
  border-radius: ${p => p.theme.radii.full};
  font-size: 13px;
  font-weight: ${p => p.theme.fontWeights.black};
  color: #fff;
  background: ${p => p.$color};
  border-bottom: 3px solid rgba(0,0,0,0.15);
  min-width: 48px;
  letter-spacing: 0.5px;
`;
