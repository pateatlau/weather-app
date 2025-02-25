import React, { PropsWithChildren } from 'react'

const Layout: React.FC = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
      <header className="border-b backdrop-blur">
        <div className="container mx-auto px-4 py-2 text-center text-gray-400">
          <p>This is the header</p>
        </div>
      </header>
      <main className="min-h-screen container mx-auto px-4 py-8">
        { children }
      </main>
      <footer className="border-t backdrop-blur">
        <div className="container mx-auto px-4 py-2 text-center text-gray-400">
          <p>Made with 💗 by Lalding</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout;
