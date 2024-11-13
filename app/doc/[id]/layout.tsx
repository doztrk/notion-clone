import { auth } from '@clerk/nextjs/server'
import React from 'react'

function DocLayout({children,params: {id}}: {children: React.ReactNode,params: {id: string}}) {

    auth();
  return (
    <div>
      {children}
    </div>
  )
}

export default DocLayout