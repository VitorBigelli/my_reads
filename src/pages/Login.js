import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Container, Button, InputGroup, FormControl } from 'react-bootstrap'

function Login({ history }) { 

    const [ formType, toggleFormType ] = useState(0);

    const onConfirm = () => {

        history.push('/home')

    }

    return (
            <Container className='login-form'>
                <InputGroup>
                    <FormControl
                        placeholder='E-mail'
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
                <Button onClick={() => onConfirm() }> { formType === 1 ? 'Confirmar' : 'Entrar' } </Button> 
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

export default withRouter(Login)