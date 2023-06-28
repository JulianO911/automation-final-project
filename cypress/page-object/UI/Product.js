class Product{

    constructor(){
        this.contentMessage = 'Your shopping cart is empty!'
        this.checkoutInputWarnings = {
            firstname:"First Name must be between 1 and 32 characters!",
            lastname: "Last Name must be between 1 and 32 characters!",
            email: "E-Mail address does not appear to be valid!",
            telephone: "Telephone must be between 3 and 32 characters!",
            password: "Password must be between 4 and 20 characters!",
            address_1: "Address 1 must be between 3 and 128 characters!",
            city: "City must be between 2 and 128 characters!",
            postcode: "Postcode must be between 2 and 10 characters!"
        }
        this.orderMessage = ' Your order has been placed!'
        this.wrongPassMessage = 'Password confirmation does not match password!'
    }

    element = {
        product: () => cy.get('a[id="mz-product-listing-image-37213259-0-0"]'),
        productAction: () => this.element.product().parent('div')
        .siblings('.product-action'),
        cart: () => cy.get('button[title="Add to Cart"]').first(),
        viewCart: () => cy.get('#notification-box-top .toast-body .form-row > .col > .btn-primary'),
        deleteProduct: () => cy.get('.btn-danger > .fas'),
        content: () => cy.get('#content p'),
        checkout: () => cy.get('#checkout-cart #content [class="buttons d-flex"] > a').last(),
        continueCheckout: () =>  cy.get('#button-save'),
        privacyPolicy: () => cy.get('#input-account-agree'),
        termsConditions: () => cy.get('#input-agree'),
        confirm: () => cy.get('#button-confirm'),
        succesOrder: () => cy.get('#content > h1'),
        buyNow: () => cy.get('#entry_216843'),
        inputs: {
            firstname: () => cy.get('#input-payment-firstname'),
            lastname: () => cy.get('#input-payment-lastname'),
            email: () => cy.get('#input-payment-email'),
            telephone: () => cy.get('#input-payment-telephone'),
            password: () => cy.get('#input-payment-password'),
            address_1: () => cy.get('#input-payment-address-1'),
            city: () => cy.get('#input-payment-city'),
            postcode: () => cy.get('#input-payment-postcode'),
            country: () => cy.get('#input-payment-country'),
            region: () => cy.get('#input-payment-zone'),
            passConfirm: () => cy.get('#input-payment-confirm')
        },
        inputWarnings: {
            firstname: () => this.element.inputs.firstname().siblings('.invalid-feedback'),
            lastname: () => this.element.inputs.lastname().siblings('.invalid-feedback'),
            email: () => this.element.inputs.email().siblings('.invalid-feedback'),
            telephone: () => this.element.inputs.telephone().siblings('.invalid-feedback'),
            password: () => this.element.inputs.password().siblings('.invalid-feedback'),
            address_1: () => this.element.inputs.address_1().siblings('.invalid-feedback'),
            city: () => this.element.inputs.city().siblings('.invalid-feedback'),
            postcode: () => this.element.inputs.postcode().siblings('.invalid-feedback'),
            wrongPassword: () => this.element.inputs.passConfirm().siblings('.invalid-feedback')
        }

    }

    visit(){
        cy.visit("")
    }

    addProductToCart(){
        this.removeProductActionClass()
        this.clickOnAddToCart()
        this.clickOnViewCart()
    }

    removeProductActionClass(){
        this.element.productAction().invoke('removeClass', 'product-action');
    }

    clickOnAddToCart(){
        this.element.cart().click()
    }

    clickOnViewCart(){
        this.element.viewCart().click()
    }

    clickOnDeleteProduct(){
        this.element.deleteProduct().click()
    }

    verifyContentMessage(){
        this.element.content().should('have.text',this.contentMessage)
    }

    clickOnCheckout(){
        this.element.checkout().click()
    }

    clickOnContinueCheckoutButton(){
        this.element.continueCheckout().click()
    }

    verifyCheckoutInputWarnings(){
        Object.entries(this.checkoutInputWarnings).forEach(([inputName,inputValue]) => {
            this.element.inputWarnings[inputName]().should('have.text',inputValue)
        })
    }

    inputRegisterFields(data){
        Object.entries(data).forEach(([inputName,inputValue]) => {
            if(inputName != 'wrongPassword'){
                this.element.inputs[inputName]().type(data[inputName])
            }
        })
        this.countryAndRegionSelect(data.country,data.region)
    }

    confirmPassword(password){
        this.element.inputs.passConfirm().type(password)
    }

    countryAndRegionSelect(country,region){
        this.element.inputs.country().select(country)
        this.element.inputs.region().select(region)
    }

    finishingCheckoutCheckboxes(){
        this.privacyPolicyChecbox()
        this.termsConditionsCheckbox()
    }

    privacyPolicyChecbox(){
        this.element.privacyPolicy().check({force: true})
    }

    termsConditionsCheckbox(){
        this.element.termsConditions().check({force: true})
    }

    buttonConfirm(){
        this.element.confirm().click()
    }

    succesOrderVerification(){
        this.element.succesOrder().should('have.text',this.orderMessage)
    }

    verifyWrongPasswordMessage(){
        this.element.inputWarnings.wrongPassword().should('have.text',this.wrongPassMessage)
    }

    clickOnProduct(){
        this.element.product().click()
    }
    clickOnBuyNow(){
        this.element.buyNow().click()
    }

    quickBuy(){
        this.clickOnProduct()
        this.clickOnBuyNow()
    }




}
module.exports = new Product();