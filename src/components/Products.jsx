import React from 'react'
import { Card } from 'antd'
import { getProducts } from '../context/ProductContext/ProductContext'


export const Products = ({Card,getProducts}) => {


const ProductPintados = Products.map((product)=>(
    <Card key={product.id} title={product.name} img={product.image}></Card>
))

  return (
    <div><ProductPintados></ProductPintados></div>
  )
}
