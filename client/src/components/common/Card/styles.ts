import styled from 'styled-components';

export const StyledCard = styled.div`
  background: ${p => p.theme.colors.surface};
  border-radius: ${p => p.theme.radii.xl};
  padding: 24px;
  border: 2.5px solid ${p => p.theme.colors.border};
  border-bottom: 5px solid ${p => p.theme.colors.border};
  position: relative;
  overflow: hidden;
`;
