import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './nav.css';

class TheNavbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      positionY: window.pageYOffset,
      movedY: 0,
      isHidden: false,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const lastPositonY = this.state.positionY; // 取得舊位置
    this.setState({
      positionY: window.pageYOffset,
    }, () => this.calculateScrollWidth(lastPositonY)); // 取得新位置
  }

  calculateScrollWidth = (lastPositonY) => {
    const { movedY } = this.state;
    const ScrollWidth = window.pageYOffset - lastPositonY; // 當前位置扣掉原始位置的高度
    this.setState({ movedY: movedY + ScrollWidth, }, this.shouldHidden)
  }

  shouldHidden = () => {
    const { movedY, positionY } = this.state;
    if (movedY >= 80) {
      this.setState({
        movedY: 0,
        isHidden: true,
      })
    } else if (movedY <= -175 || positionY <= 35) {
      this.setState({
        movedY: 0,
        isHidden: false,
      })
    }
  }

  render() {
    const { isHidden } = this.state;
    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        fixed="top"
        className={isHidden && "navbar--hide"}
      >
        <Navbar.Brand>React-Blog</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/" exact={true}>
              <Nav.Link>首頁</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/posts">
              <Nav.Link>文章列表</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>關於我</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  };
}

export default TheNavbar;
