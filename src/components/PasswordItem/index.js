import './index.css'

const PasswordItem = props => {
  const {data, isPasswordsVisible, deletePassword} = props
  const {id, website, username, password, randomNum} = data

  const onDeleteBtnClick = () => {
    deletePassword(id)
  }

  return (
    <li>
      <div className={`profile-pic-container color-${randomNum}`}>
        {website[0].toUpperCase()}
      </div>
      <div className="password-txt-container">
        <p className="website">{website}</p>
        <p className="username">{username}</p>
        {isPasswordsVisible ? (
          <p className="password">{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="mask-img"
          />
        )}
      </div>
      <button
        type="button"
        className="delete-btn"
        onClick={onDeleteBtnClick}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}

export default PasswordItem
