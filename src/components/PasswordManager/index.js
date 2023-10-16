import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import PasswordItems from '../PasswordItems'

import './index.css'

function getPasswordsListFromLocalStorage() {
  const stringifiedPasswordList = localStorage.getItem('passwordArray')
  const parsedPasswordList = JSON.parse(stringifiedPasswordList)
  if (parsedPasswordList === null) {
    return []
  }
  return parsedPasswordList
}

const initialPasswordList = getPasswordsListFromLocalStorage()

class PasswordManager extends Component {
  state = {
    website: '',
    userName: '',
    password: '',
    search: '',
    passwordList: initialPasswordList,
    isShowPasswords: false,
  }

  onDetailsSubmit = event => {
    event.preventDefault()
    const {website, userName, password, passwordList} = this.state
    if (website !== '' && userName !== '' && password !== '') {
      const newPassword = {
        id: uuidv4(),
        website,
        userName,
        password,
      }
      const temparayList = [...passwordList, newPassword]
      this.setState({
        passwordList: temparayList,
        website: '',
        userName: '',
        password: '',
      })
    }
  }

  onWebsite = event => {
    this.setState({website: event.target.value})
  }

  onUsername = event => {
    this.setState({userName: event.target.value})
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  onWebSearch = event => {
    this.setState({search: event.target.value})
  }

  onToggleCheckbox = () => {
    this.setState(prevState => ({
      isShowPasswords: !prevState.isShowPasswords,
    }))
  }

  onDelete = id => {
    const {passwordList} = this.state
    this.setState({passwordList: passwordList.filter(each => each.id !== id)})
  }

  render() {
    const {
      website,
      userName,
      password,
      search,
      passwordList,
      isShowPasswords,
    } = this.state
    const searchResults = passwordList.filter(each =>
      each.website.toLowerCase().includes(search.toLowerCase()),
    )
    localStorage.setItem('passwordArray', JSON.stringify(passwordList))

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="submit-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png "
            alt="password manager"
            className="sm-img"
          />
          <form onSubmit={this.onDetailsSubmit} className="form">
            <h1 className="add-heading">Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="icons"
              />
              <input
                type="text"
                value={website}
                className="data-input"
                placeholder="Enter Website"
                onChange={this.onWebsite}
              />
            </div>
            <br />
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="icons"
              />
              <input
                type="text"
                value={userName}
                className="data-input"
                placeholder=" Enter Username"
                onChange={this.onUsername}
              />
            </div>
            <br />
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="icons"
              />
              <input
                type="password"
                value={password}
                className="data-input"
                placeholder="Enter Password"
                onChange={this.onPassword}
              />
            </div>
            <br />
            <button type="submit" className="add-btn">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="lg-img"
          />
        </div>

        <div className="output-container">
          <div className="top">
            <div className="count-cont">
              <h1 className="password-para">Your Passwords</h1>
              <p className="count">{searchResults.length}</p>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icons"
              />
              <input
                type="search"
                value={search}
                className="search-input"
                placeholder="Search"
                onChange={this.onWebSearch}
              />
            </div>
          </div>
          <hr />
          <div className="list-container">
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="showpassword"
                defaultChecked={isShowPasswords}
                onClick={this.onToggleCheckbox}
              />
              <label htmlFor="showpassword">Show passwords</label>
            </div>
            {searchResults.length === 0 && (
              <div className="no-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="no-password-img"
                />
                <p className="no-heading">No Passwords</p>
              </div>
            )}
            {searchResults.length !== 0 && (
              <ul>
                {searchResults.map(each => (
                  <PasswordItems
                    key={each.id}
                    details={each}
                    onDelete={this.onDelete}
                    showStatus={isShowPasswords}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
