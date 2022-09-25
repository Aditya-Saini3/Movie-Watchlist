function Header(props) {
    return (
        <div className="header-section">
          <div className="headings">
              <h1 className="app-title">{props.appTitle}</h1>
              <h3 className="app-subtitle" onClick={() => props.toggle()}>{props.appSubtitle}</h3>
          </div>
        </div>
    )
}

export default Header;