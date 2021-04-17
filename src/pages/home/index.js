import MainLayout from '../../layouts/MainLayout'
import GameCollection from './gameCollection'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProductsAsync } from '../../redux/actions'

const Home = () => {
  const products = useSelector(state => state.global.products)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProductsAsync())
  }, [])

  return (
    <MainLayout>
      <GameCollection banner='/images/lol.png' />
    </MainLayout>
  )
}

export default Home