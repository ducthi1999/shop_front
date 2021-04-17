import { useSelector } from 'react-redux'

const Loading = () => {
  const loading = useSelector(state => state.global.loading)
  return (
   <>
   {
    loading &&
    <div id='loading'>
      <div className='loading'>
        <img src='/images/loading.gif' />
      </div>
    </div>
    ||
    null
   }
   </>
  )
}

export default Loading