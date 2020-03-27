class LoginContext {
  constructor(user_info) {
    this.logged = null;
    this.user_info = user_info;
    this.context = null;
  }

  setContext(ctx) {
    this.context = ctx;
  }

  async checkLogin() {
    try {
        let response = await fetch("/users/check/login", {
            method: "POST",
        })
        if(response.ok) {
            let data = await response.json();
            // if user is not logged in, we receive an object with error attribute set
            if (!data.error) {
              this.onLogin(data);
            } else {
              this.onLogout();
            }
        } 
    } catch (e) {
        console.error(e);
    }
  }

  onLogin(user_info) {
    this.logged = true;
    this.user_info = user_info;
    this.context.setState({
      loginContext: this
    });
  }

  onLogout() {
    this.logged = false;
    this.user_info = null;
    this.context.setState({
      loginContext: this
    })
  }
}

export default LoginContext;