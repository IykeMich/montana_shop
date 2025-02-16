'use client'

import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast';
import { addItem } from '@/store/cartSlice';
import { Product } from '@/typing';
import React from 'react'
import { useDispatch } from 'react-redux';

const AddToCart = ({ product }:{product:Product}) => {
  const dispatch = useDispatch();
  const {toast} = useToast()

  const addCartHandler = () => {
    toast ({
      description: "Item Added to the cart",
      variant: "success"
    })
    dispatch(addItem(product))
  }
  return (
    <Button 
      onClick={() => {addCartHandler()}}
      className='mt-6'>
      Add To Cart
    </Button>
  )
}

export default AddToCart
