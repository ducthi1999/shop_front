import MainLayout from '../../layouts/MainLayout'
import GameCollection from './gameCollection'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProductsAsync } from '../../redux/actions'

const Home = () => {
  const products = useSelector(state => state.global.products)
  const categories = useSelector(state => state.global.categories)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProductsAsync({passed: 1}))
  }, [])

  return (
    <MainLayout>
      {
        categories && categories.length > 0 &&
        categories.map(item => {
          return (
            <GameCollection key={item._id} category={item} />
          )
        })
      }
    </MainLayout>
  )
}

export default Home