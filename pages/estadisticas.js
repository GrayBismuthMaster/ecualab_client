import Layout from '../components/Layout'
import Link from 'next/link'
import { gql, useQuery } from '@apollo/client'
import Pedido from '../components/pedidos/Pedido'
import { useEffect, useState } from 'react'
import { useData } from '../hooks/useData'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const OBTENER_PEDIDOS = gql`
    query obtenerPedidosVendedor{
        obtenerPedidosVendedor{
            id
            pedido{
                id
                nombre
                cantidad
            }
            cliente{
                id
                nombre
                apellido
                telefono
                direccion
                empresa
            }
            aportes{
                id
                valor 
                creado
            }
            vendedor
            total
            saldo
            creado
            estado
        }
    }
`
    const pedidos = () => {
        
    const {data, loading, error} = useQuery(OBTENER_PEDIDOS);
    const [pedidosVendedor, setPedidosVendedor] = useState([])
    const [pedidosVendedorFiltrado, setPedidosVendedorFiltrado] = useState([]);
    const [stateFiltering, setStateFiltering]= useState(false);
    useEffect(()=>{
        console.log("pedidos del vendedor")
        console.log(pedidosVendedor);
        return ()=>{

        }
    },[pedidosVendedor])
    useEffect(()=>{
        if(stateFiltering){
            console.log("Pedidos", pedidosVendedor)
            let filterItems= (arr, query) => {
                return arr.filter((el) => el.estado == query);
            }
            let endFilterItems = filterItems(pedidosVendedor,'PENDIENTE');
            console.log("filtrados", endFilterItems);
            
            console.log('Longitud de filtrado',endFilterItems)
                setPedidosVendedorFiltrado(endFilterItems);
            
        }
    },[pedidosVendedor, stateFiltering])
    
    if(loading) return 'Cargando'
    const{obtenerPedidosVendedor} = data;
    
const dataNew = [
    {
      name: 'Carlos',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Marco',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Jorge',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Pedro',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Saúl',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
  ];
  
    // const {arrayData} = useData(obtenerPedidosVendedor)
    
        return (
        
            <ResponsiveContainer width="100%" height="100%">
            <Layout>
                <h1 className = "text-2xl text-gray-800 font-light">Pedidos</h1>
                <h2 className = "text-l text-gray-800 font-light">Compra total de clientes</h2>
                    <LineChart
                    width={500}
                    height={300}
                    data={dataNew}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
            </Layout>
        
            </ResponsiveContainer>
    )
    
    }
  
export default pedidos
