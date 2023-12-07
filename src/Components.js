import styled from "styled-components";

export const Container = styled.div`
background-color: #fff;
 border-radius: 10px;
 display: flex;
 align-items: center;
 justify-content: center;
 width: 678px;
 max-width: 100%;
 min-height: 400px;
 `;

export const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${(props) =>
    props.signinIn !== true
      ? 'transform: translateX(100%); opacity: 1; z-index: 5;'
      : null}

  @media (max-width: 768px) {
    width: 100%;
    left: 0%;
    top: -12%;
    ${(props) =>
      props.signinIn !== true ? 'transform: translateY(0%);' : null}
  }
`;

export const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${(props) =>
    props.signinIn !== true ? 'transform: translateX(100%);' : null}

  @media (max-width: 768px) {
    width: 100%;
    top: 5%;
    overflow: hidden;
    ${(props) =>
      props.signinIn !== true ? 'transform: translateY(-100%);' : null}
  }
`;

export const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  font-size: 18px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

export const Title = styled.h1`
  font-weight: bold;
  font-size: 20px;
  margin: 0;
`;

export const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 60%;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

export const Button = styled.button`
  border-radius: 20px;
  border: 1px solid #13003c;
  background-color: #13003c;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
`;

export const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #ffffff;
`;

export const Anchor = styled.a`
  color: #333;
  font-size: 16px;
  text-decoration: none;
  margin: 15px 0;
`;

export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  font-size: 18px;

  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${(props) =>
    props.signinIn !== true ? 'transform: translateX(-100%);' : null}

  @media (max-width: 768px) {
    top: -25%;
    width: 100%;
    height: 50%;
    left: 0;
    border-radius: 0% 0% 0% 0%;
    ${(props) =>
      props.signinIn !== true
        ? 'transform: translateY(330%); border-radius: 0% 0% 0% 0%; height: 30%;'
        : null}
  }
`;

export const Overlay = styled.div`
  background: #412777;
  background: -webkit-linear-gradient(to right, #13003c, #412777);
  background: linear-gradient(to right, #13003c, #412777);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;

  transform: translateX(0%);
  transition: transform 0.6s ease-in-out;
  ${(props) => (props.signinIn !== true ? 'transform: translateX(50%);' : null)}

  @media (max-width: 768px) {
    ${(props) => (props.signinIn !== true ? 'transform: translateX(0%);' : null)}
    transition: transform 2s ease-in-out;
  }
`;

export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;

  @media (max-width: 768px) {
    transition: transform 2s ease-in-out;
  }
`;

export const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);

  ${(props) => (props.signinIn !== true ? 'transform: translateX(0);' : null)}

  @media (max-width: 768px) {
    top: -50%;
    left: 60%;
    ${(props) => (props.signinIn !== true ? 'transform: translateX(-20%); top: -5%;' : null)}
  }
`;

export const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);

  ${(props) => (props.signinIn !== true ? 'transform: translateX(20%);' : null)}

  @media (max-width: 768px) {
    top: 25%;
    ${(props) => (props.signinIn !== true ? 'transform: translateX(0%); top: 100%;' : null)}
  }
`;

export const Paragraph = styled.p`
  font-size: 18px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;