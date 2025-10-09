import Headrer from '@/components/dashboard-components/header'
import React, { Suspense } from 'react'

const layout = ({children}: {children : React.ReactNode}) => {
  return (
    <>
    <Headrer/>
    <main className='px-3 lg:px-14 py-3'>
      <Suspense fallback={<div>Loading...</div>}>
        {children}
      </Suspense>
      
    </main> 
    </>
   
  )
}

export default layout
