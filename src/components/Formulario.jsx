import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import Axios from 'axios';

import Error from './Error';


const Boton = styled.input`
    margin-top:20px;
    font-weight:bold;
    font-size:20px;
    padding:10px;
    background-color: #66a2fe;
    border:none;
    width: 100%;
    border-radius: 10px;
    color:#fff;
    transition:background-color .3s ease;

    &:hover {
        background-color: #326ac0;
        cursor:pointer;
    }
`;


const Formulario = ({guardarMoneda, saveCriptomoneda}) => {

    const [listacripto, guardarCriptomoneda] = useState([]);
    const[error, guardarError] = useState(false);
    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'},

    ]
    const [moneda, Seleccionar] = useMoneda('Elige tu Moneda', '', MONEDAS);
    const [criptomoneda, SeleccionarCripto] = useCriptomoneda('Elige tu Criptomoneda', '', listacripto);

    useEffect(()=>{
        consultarAPI();
    },[])

    const consultarAPI = async () => {
        const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;
        const resultado = await Axios.get(url);
        guardarCriptomoneda(resultado.data.Data);
    }

    const cotizarMoneda = e => {
        e.preventDefault();

        if(moneda.trim() === '' || criptomoneda.trim() ===''){
            guardarError(true);
            return;
        }

        guardarError(false);
        guardarMoneda(moneda);
        saveCriptomoneda(criptomoneda);
    }
    return ( 
        <form onSubmit={cotizarMoneda}>
            {error?<Error mensaje="Todo los campos son obligatorios"/>  :null}
                <Seleccionar/>
                <SeleccionarCripto/>
                <Boton
                    type="submit"
                    value="Calcular"
                />
        </form>
     );
}
 
export default Formulario;