import { Link } from 'react-router-dom'

const Breadcrumb = () => {
  return (
    <div id='breadcrumb'>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><Link to="/">Home</Link></li>
          <li class="breadcrumb-item"><Link to="/">Library</Link></li>
          <li class="breadcrumb-item active" aria-current="page">Data</li>
        </ol>
      </nav>
    </div>
  )
}

export default Breadcrumb