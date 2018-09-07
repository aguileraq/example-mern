import React, {Component} from 'react'

class Register extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e){
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }
    console.log(newUser);
  }

  render(){
    return (
      <main role="main" id="MainContent">
        <div className="section container">
          <div className="row">
            <div className="col s12 m6 offset-m3">
              <div className="card login-wrapper">
                <div className="card-content">
        
                  <form id="create_customer" acceptCharset="UTF-8" onSubmit={this.onSubmit}>
                  <input type="hidden" name="form_type" value="create_customer"/><input type="hidden" name="utf8" value="✓"/>
                    <h4 className="center">Create Account</h4>
                    <div className="input-field">
                      <label htmlFor="FirstName" className="">
                        Full Name
                      </label>
                      <input type="text" name="name" id="FirstName" value={this.state.name} onChange={this.onChange} autoFocus=""/>
                    </div>

                  <div className="input-field">
                    <label htmlFor="Email">
                      Email
                    </label>
                    <input type="email" name="email" id="Email" className="" value={this.state.email} onChange={this.onChange} spellCheck="false" autoComplete="off" autoCapitalize="off"/>
                  </div>
  
                  <div className="input-field">
                    <label htmlFor="CreatePassword">
                      Password
                    </label>
                    <input type="password" name="password" id="CreatePassword" value={this.state.password} onChange={this.onChange}  className=""/>
                  </div>
  
                  <p>
                    <input type="submit" value="Create" className="btn-large z-depth-0"/>
                  </p>
                </form>
  
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    );
  }
}

export default Register;