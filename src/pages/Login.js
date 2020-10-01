import React, { useState } from 'react'
import { Container, Button, InputGroup, FormControl } from 'react-bootstrap'

function Login() { 

    const [ formType, toggleFormType ] = useState(0);

    return (
            <Container className='login-form'>
                <h1> <span role="img" aria-label="books">📚</span> My Reads </h1> 
                <InputGroup>
                    <FormControl
                        placeholder='Usuário'
                    />
                </InputGroup>
                <InputGroup>
                    <FormControl
                        placeholder='Senha'
                        type='password'
                    />
                </InputGroup> 
                { formType === 1 && 
                    <InputGroup>
                        <FormControl
                            placeholder='Confirmar Senha'
                            type='password'
                        />
                    </InputGroup> 
                }
                <Button > { formType === 1 ? 'Confirmar' : 'Entrar' } </Button> 
                <div className='login-form-footer'>
                    { 
                        formType === 0 ? 
                        <p> Não possui conta? <span onClick={ () => toggleFormType(1) }>Cadastre-se</span>.</p>
                        : 
                        <p> Já possui conta? <span onClick={ () => toggleFormType(0) }>Entrar</span>.</p>
                    }                
                </div>
            </Container>
    )
}

export default Login