import Header from '../global/Header'
import Footer from '../global/Footer'

const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <main style={{marginTop: 24}}>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout