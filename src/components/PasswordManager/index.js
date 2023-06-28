import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import PasswordItem from '../PasswordItem'

class PasswordManager extends Component {
  state = {
    passWordsList: [],
    website: '',
    username: '',
    password: '',
    isPasswordsVisible: false,
    searchVal: '',
  }

  onPasswordAdd = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    if (website !== '' && username !== '' && password !== '') {
      const passwordObj = {
        id: uuidv4(),
        website,
        username,
        password,
        randomNum: Math.floor(Math.random() * 10),
      }
      this.setState(prevState => ({
        passWordsList: [...prevState.passWordsList, passwordObj],
        website: '',
        username: '',
        password: '',
      }))
    } else {
      alert('Mundhu anni fields fill chey bey 😬')
    }
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onToggleCheck = event => {
    this.setState({isPasswordsVisible: event.target.checked})
  }

  onDeletePassword = id => {
    const {passWordsList} = this.state
    const filteredList = passWordsList.filter(
      eachPassword => eachPassword.id !== id,
    )
    this.setState({passWordsList: filteredList})
  }

  onChangeSearchValue = event => {
    this.setState({searchVal: event.target.value})
  }

  getFilteredList = () => {
    const {passWordsList, searchVal} = this.state
    const searchFilteredList = passWordsList.filter(eachPassWordData =>
      eachPassWordData.website.toLowerCase().includes(searchVal.toLowerCase()),
    )
    return searchFilteredList
  }

  render() {
    const {
      website,
      username,
      password,
      searchVal,
      isPasswordsVisible,
    } = this.state
    const filteredPasswordsList = this.getFilteredList()
    const passWordsListLen = filteredPasswordsList.length
    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="logo"
        />
        <div className="top-container">
          <div className="password-manager-img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="password-manager-img"
            />
          </div>
          <div className="form-container">
            <h1 className="form-title"> Add New Password </h1>
            <form onSubmit={this.onPasswordAdd}>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                />
                <input
                  type="text"
                  placeholder="Enter Website"
                  value={website}
                  onChange={this.onChangeWebsite}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                />
                <input
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                  alt="password"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={this.onChangePassword}
                />
              </div>
              <div className="add-btn-container">
                <button type="submit">Add</button>
              </div>
            </form>
          </div>
        </div>
        <div className="bottom-container">
          <div className="header-container">
            <div className="header-left-container">
              <h1 className="bottom-container-title">Your Passwords</h1>
              <p className="count">{passWordsListLen}</p>
            </div>
            <div className="header-right-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                type="search"
                placeholder="Search"
                value={searchVal}
                onChange={this.onChangeSearchValue}
              />
            </div>
          </div>
          <hr />
          <div className="show-passwords-container">
            <input
              type="checkbox"
              id="checkbox"
              className="checkbox"
              checked={isPasswordsVisible}
              onChange={this.onToggleCheck}
            />
            <label htmlFor="checkbox" className="show-password-label">
              Show Passwords
            </label>
          </div>
          <ul className="passwords-section">
            {passWordsListLen === 0 && (
              <div className="no-passwords-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                />
                <p>No Passwords</p>
              </div>
            )}
            {passWordsListLen !== 0 &&
              filteredPasswordsList.map(eachPassWordData => (
                <PasswordItem
                  data={eachPassWordData}
                  key={eachPassWordData.id}
                  isPasswordsVisible={isPasswordsVisible}
                  deletePassword={this.onDeletePassword}
                />
              ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default PasswordManager
