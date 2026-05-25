import React from 'react'

function AppBackground({children}) {
  return (
    <section className='min-h-screen max-w-4xl w-full mx-auto'>
    {children}
    </section>
  )
}

export default AppBackground