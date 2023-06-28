class Login{

    constructor(){
        this.url = 'index.php?route=account/login'
    }
    element = {
        emailField: () => cy.get('#input-email'),
        passwordField: () => cy.get('#input-password'),
        loginButton: () => cy.get('form > .btn'),
    }

    visit(){
        cy.visit(this.url);
    }

    loginProcess(email,password){

        this.typeLoginEmail(email);
        this.typeLoginPassword(password)
        this.clickLoginButton()

    }

    typeLoginEmail(email){
        this.element.emailField().clear().type(email)
    }

    typeLoginPassword(password){
        this.element.passwordField().clear().type(password)
    }

    clickLoginButton(){
        this.element.loginButton().click()
    }

    

}

module.exports = new Login();