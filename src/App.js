import './App.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function App() {

  const [formValues, setFormValues] = useState({ email: "", password: "", favClass: "1" });
  const [validationStates, setValidationStates] = useState({ emailState: true, passwordState: true });



  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormValues({ ...formValues, password });
    setValidationStates({
      ...validationStates,
      passwordState: validatePassword(password)
    });
  };

  const handleSelectChange = (e) => {
    setFormValues({ ...formValues, favClass: e.target.value });
  };

  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email); 
  };

  const validatePassword = (password) => {
    return password.length >= 9 && /\d/.test(password) && /[a-zA-Z]/.test(password);
  };

  const handleEmailChange = (e) => {
    setFormValues({ ...formValues, email: e.target.value });
  };
  
  const clickSubmit = () => {
    const isEmailValid = validateEmail(formValues.email);
    const isPasswordValid = validatePassword(formValues.password);
  
    setValidationStates({
      emailState: isEmailValid,
      passwordState: isPasswordValid
    });
  
    if (isEmailValid && isPasswordValid) {
      alert(JSON.stringify(formValues));

    } else {
      alert("Por favor, corrige los errores en el formulario.");
    }
  };
  

  return (
    <div>
      <h1>Ejemplo de formularios!</h1>
      
      <Form>
        <Form.Group className="mb-6" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} value={formValues.email} />
          { !validationStates.emailState && <Form.Text className="text-danger">Please check the email format. We'll never share your email with anyone else.</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} value={formValues.password} />
          { !validationStates.passwordState && (
            <Form.Text className="text-danger">
              Your password should be have numbers and letters and should be at least 9 char long
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicSelect">
          <Form.Label>Favorite Class</Form.Label>
          <Form.Select onChange={handleSelectChange} value={formValues.favClass}>
            <option value="1">ISIS3710</option>
            <option value="2">Programación con tecnologías web</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" onClick={clickSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default App;
