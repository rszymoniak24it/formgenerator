import styled, { css } from "styled-components";

const sharedInputStyles = css`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  font-size: 16px;
`;

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

export const TabContent = styled.div`
  margin-top: 24px;
`;

export const TextArea = styled.textarea`
  ${sharedInputStyles}
  min-height: 200px;
`;

export const Input = styled.input`
  ${sharedInputStyles}
`;

export const Checkbox = styled.input`
  margin-top: 5px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
`;

export const ErrorText = styled.div`
  color: red;
  margin-top: 4px;
`;

export const Button = styled.button`
  padding: 8px 16px;
  background: var(--main-gray-dark);
  color: var(--main-white);
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: var(--main-gray-hover);
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 24px;
`;

export const FormGroup = styled.div`
  margin-bottom: 16px;
`;

export const FormCard = styled.div`
  padding: 24px;
  border: 1px solid var(--main-gray);
  border-radius: 8px;
  background: var(--main-white);
`;

export const Title = styled.h2`
  margin-bottom: 24px;
`;

export const TabButton = styled.button<{ $active?: boolean }>`
  padding: 10px 20px;
  margin-right: 10px;
  background: ${({ $active }) => ($active ? "var(--main-gray-dark)" : "var(--main-gray-light)")};
  color: ${({ $active }) => ($active ? "var(--main-white)" : "var(--main-black)")};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: ${({ $active }) => ($active ? "var(--main-gray-active)" : "var(--main-gray)")};
  }
`;

export const RadioGroup = styled.div`
  margin-top: 8px;
`;

export const RadioLabel = styled.label`
  display: block;
  margin-top: 5px;
`;