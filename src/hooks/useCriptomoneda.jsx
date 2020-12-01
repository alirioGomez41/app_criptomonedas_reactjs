import React, {Fragment, useState} from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color:#fff;
    text-transform:uppercase;
    font-weight:bold;
    font-size:2.4rem;
    margin-top: 2rem;
    display:block;
`;

const Select = styled.select`
    width:100%;
    display:block;
    padding: 1rem;
    -webkit-appearance:none;
    border-radius:10px;
    border:none;
    font-size:1.2rem;
`;
const useCriptomoneda = (label, stateInitial, opciones) => {

    const [state, actualizarState] = useState(stateInitial);

    
    const SelectCripto = () => {
        const guardarOpcion = e => {
            actualizarState(e.target.value);
        }
        return(
            <Fragment>
            <Label>{label}</Label>
            <Select
                onChange={guardarOpcion}
                value={state}
            >
                <option value="">--Selecciona una Moneda--</option>
                {opciones.map(opcion => (
                    <option key={opcion.CoinInfo.id} value={opcion.CoinInfo.Name}>{opcion.CoinInfo.FullName}</option>
                ))}
            </Select>
        </Fragment>
        );
    };

    return[state, SelectCripto, actualizarState];
}

export default useCriptomoneda;