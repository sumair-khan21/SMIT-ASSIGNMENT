import React from 'react'
import { useGetProductQuery } from '../services/products'

const AllProducts = () => {
    const { data} = useGetProductQuery()
    console.log(data    );
    
  return (
    <>
    {/* {data.map((product)=>(
        <div key={product.id}>
            <h1>{product.title}</h1>
            <p>{product.price}</p>
            <p>{product.description}</p>
        </div>
    ))} */}
    </>
  )
}

export default AllProducts