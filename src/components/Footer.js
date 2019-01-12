import React, { Component } from 'react';

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="footer__wrap">
        <div className="footer__copyright">
          <div>github: <a href="https://github.com/yxcs">https://github.com/yxcs</a></div>
          <div className="footer__copyright--copy">&copy;yxcs</div>
        </div>
      </div>
    )
  }
}

export default Footer;