import { css } from '../../styled-system/css';

export const containerStyle = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
});

export const formContainerStyle = css({
  width: "90%",
  maxWidth: "400px",
  padding: "20px",
  backgroundColor: "white",
  borderRadius: "md",
  boxShadow: "lg",
});

export const headerStyle = css({
  textAlign: "center",
  marginBottom: "20px",
  fontSize: "xl",
  color: "primary",
});

export const inputItemStyle = css({
  marginBottom: "16px",
});

export const buttonStyle = css({
  marginTop: "16px",
  backgroundColor: "primary.500",
  _hover: { bg: 'primary.600' }
});

export const errorStyle = css({
  color: "red.500",
  textAlign: "center",
  marginBottom: "16px",
});
