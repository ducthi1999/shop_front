
const SearchModal = (props) => {
  return (
    <div className={status ? 'search-modal active' : 'search-modal'}>
      <div className='search-modal-overlay' onClick={() => props.setSearchModal(false)}>
      </div>
      <div className='search-form-container'>
        <form ref={formEl} onKeyPress={submitHandle} action='/products/v1/search' method='GET'>
          <input ref={inputEl} autoFocus={true} name='q' placeholder='What are you looking for?' />
        </form>
      </div>
    </div>
  )
}

export default SearchModal