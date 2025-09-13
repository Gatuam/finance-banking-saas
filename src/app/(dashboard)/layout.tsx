import Headrer from '@/components/dashboard-components/header'
import React from 'react'

const layout = ({children}: {children : React.ReactNode}) => {
  return (
    <>
    <Headrer/>
    <main className='px-3 lg:px-14'>
      {children}
    </main> 
    </>
   
  )
}

export default layout
