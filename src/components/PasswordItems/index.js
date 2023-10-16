import './index.css'

const PasswordItems = props => {
  const {details, onDelete, showStatus} = props
  const {id, website, userName, password} = details
  const DeletePasswordList = () => {
    onDelete(id)
  }
  return (
    <li>
      <h1 className="letter">{website.slice(0, 1).toUpperCase()}</h1>
      <div className="middle-part">
        <p className="web-heading">{website}</p>
        <p className="user-para">{userName}</p>
        {showStatus && <p className="user-para">{password}</p>}
        {!showStatus && (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="stars"
          />
        )}
      </div>
      <button
        type="button"
        onClick={DeletePasswordList}
        className="delete-btn"
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default PasswordItems
