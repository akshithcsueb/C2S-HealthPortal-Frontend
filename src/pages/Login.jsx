import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-image: url("../doctor-patient.jpg"); /* Update the path to your image */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

function Login() {
  return (
    <LoginLayout>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
