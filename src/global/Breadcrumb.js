import { Link } from 'react-router-dom'

const Breadcrumb = ({ category, item }) => {
  return (
    <div id='breadcrumb'>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><Link to="/">HOME</Link></li>
          <li class="breadcrumb-item"><Link to="/">{category || 'Đang cập nhật'}</Link></li>
          {
            item &&
            <li class="breadcrumb-item active" aria-current="page">{item || 'Đang cập nhật'}</li>
          }
        </ol>
      </nav>
    </div>
  )
}

export default Breadcrumb