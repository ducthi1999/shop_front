import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProductsAsync, toggleLoading } from '../redux/actions'


const ManageFilter = () => {
  const [checkPassed, setCheckPassed] = useState(2)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProductsAsync({ passed: checkPassed }))
  }, [checkPassed])

  return (
    <div id='admin-filter'>
      <div className='filter-list'>
        <button onClick={() => setCheckPassed(1)} className={checkPassed === 1 && 'active' || ''}>Nick hiện có</button>
        <button onClick={() => setCheckPassed(2)} className={checkPassed === 2 && 'active' || ''}>Đang đợi duyệt</button>
      </div>
    </div>
  )
}

export default ManageFilter
