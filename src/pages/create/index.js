import { useState, useRef, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { createProduct } from '../../services/global'
import { useSelector, useDispatch } from 'react-redux'
import { toggleLoading, triggerNotif } from '../../redux/actions'
import ExtraLayout from '../../layouts/ExtraLayout'

const Create = () => {
  const history = useHistory()

  const categories = useSelector(state => state.global.categories)
  const login = useSelector(state => state.global.login)
  const socket = useSelector(state => state.global.socket)
  const dispatch = useDispatch()

  const [file, setFile] = useState(null)
  const [data, getData] = useState({ name: '', path: '/images/product_default_img.png' })
  const [desc, setDesc] = useState('')

  const nameEl = useRef(null)
  const cateEl = useRef(null)
  const priceEl = useRef(null)
  const passEl = useRef(null)

  useEffect(() => {
    if (!login) {
      setTimeout(() => {
        history.replace('/login')
      }, 1000)
    }
  }, [])

  const handleChange = (e) => {
    const selectedFile = e.target.files[0]
    const reader = new FileReader()
    reader.onloadend = (e) => {
      const url = reader.result
      setFile(url)
      getData({ name: 'manh', path: url })
    }

    if (selectedFile && selectedFile.type.match('image.*')) {
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const name = nameEl.current.value.trim()
    const cate = cateEl.current.value !== 'choose' && JSON.parse(cateEl.current.value) || null
    const price = priceEl.current.value
    const password = passEl.current.value
    const data = {
      name, category: cate && cate._id || null, price, image: file, desc, password
    }

    dispatch(toggleLoading(true))
    createProduct(data)
      .then(res => {
        if (res.data && res.data.status) {
          socket.emit('create-product')
          history.replace('/')
        } else {
          dispatch(triggerNotif({
            type: 'ERROR',
            content: res.data.message
          }))
        }
      })
      .catch(err => {
        dispatch(triggerNotif({
          type: 'ERROR',
          content: 'SERVER_ERROR!'
        }))
      })
      .then(() => {
        dispatch(toggleLoading(false))
      })
  }

  return (
    <ExtraLayout category={'Đăng bán nick'}>
      <div className='create-product'>
        <div className='container'>
          <div className='create-container'>
            <form onSubmit={handleSubmit} className='create-form'>
              <div className='row' style={{ justifyContent: 'center', alignItems: 'center' }}>
                <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4'>
                  <div className='create-name'>
                    <label htmlFor='create_name'>Tên: </label>
                    <input required ref={nameEl} id='create_name' />
                  </div>
                  <div className='create-name'>
                    <label htmlFor='create_pass'>Mật khẩu: </label>
                    <input required ref={passEl} id='create_pass' />
                  </div>
                  <div className='create-category'>
                    <div>
                      <label htmlFor='crate-cate-select'>Thể loại:</label>
                      <select required defaultValue='choose' id='create-cate-select' ref={cateEl} name="categories" id="categories">
                        <option value="choose" disabled hidden>choose</option>
                        {
                          categories && categories.length > 0 &&
                          categories.map(item =>
                            <option key={item._id} value={JSON.stringify(item)}>
                              {item.title}
                            </option>
                          )
                          ||
                          <option defaultValue="" disabled>Thêm mới</option>
                        }
                      </select>
                    </div>
                  </div>
                  <div className='create-price'>
                    <label htmlFor='create_price'>Giá: </label>
                    <input required ref={priceEl} type='number' id='create_price' />
                  </div>
                </div>
                <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4'>
                  <div className='file-upload'>
                    <div className='image-container'>
                      <img src={data.path} />
                      <label htmlFor='product_image'>
                        <i className="fas fa-camera"></i>
                        <input onChange={handleChange} hidden type='file' id='product_image' />
                      </label>
                    </div>
                  </div>
                </div>
                <div className='col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8'>
                  <div className='create-content'>
                    <label style={{ fontWeight: 'bolder' }} htmlFor='create_content'>Mô tả: </label>
                    <CKEditor
                      className='about'
                      editor={ClassicEditor}
                      data=""
                      onReady={editor => {
                        // You can store the "editor" and use when it is needed.
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setDesc(data)
                      }}
                      onBlur={(event, editor) => {
                      }}
                      onFocus={(event, editor) => {
                      }}
                    />
                  </div>
                </div>
                <div className='col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 form-btn'>
                  <button type='submit'>Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div >
      </div>
    </ExtraLayout>
  )
}

export default Create