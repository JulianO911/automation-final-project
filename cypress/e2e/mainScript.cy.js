const User = require("../page-object/API/User")
const Login = require("../page-object/UI/Login")
const Product = require("../page-object/UI/Product")


context('UI testing suit', () => {
    it('Add product to basket and cancel',() => {
        Product.visit()
        Product.addProductToCart()
        Product.clickOnDeleteProduct()
        Product.verifyContentMessage()
    })

    it('Buy a product - form is not filled', () => {
        Product.visit()
        Product.addProductToCart()
        Product.clickOnCheckout()
        Product.clickOnContinueCheckoutButton()
        Product.verifyCheckoutInputWarnings()
    })

    it('Buy a product - passwords dont match', () => {
        Product.visit()
        Product.addProductToCart()
        Product.clickOnCheckout()
        cy.fixture("productData").then((data)=>{
            Product.inputRegisterFields(data.testCasePasswordsDontMatch)
            Product.confirmPassword(data.testCasePasswordsDontMatch.wrongPassword)
        })
        Product.finishingCheckoutCheckboxes()
        Product.clickOnContinueCheckoutButton()
        Product.verifyWrongPasswordMessage()
    })

    it('Buy a product - order placed', () => {
        Product.visit()
        Product.addProductToCart()
        Product.clickOnCheckout()
        cy.fixture("productData").then((data)=>{
            Product.inputRegisterFields(data.testCaseBuyProductSuccesfully)
            Product.confirmPassword(data.testCaseBuyProductSuccesfully.password)
        })
        Product.finishingCheckoutCheckboxes()
        Product.clickOnContinueCheckoutButton()
        Product.buttonConfirm()
        Product.succesOrderVerification()

    })

    it('Buy a product after logged: quick buy',() => {
        Login.visit()
        cy.fixture("productData").then((data)=>{
            Login.loginProcess(data.testCaseBuyProductSuccesfully.email,data.testCaseBuyProductSuccesfully.password)
        })
        Product.visit()
        Product.quickBuy()
        Product.termsConditionsCheckbox()
        Product.clickOnContinueCheckoutButton()
        Product.buttonConfirm()
        Product.succesOrderVerification()

    })
})

context('API testing suit', () => {
    it('create an user', () => {
        cy.fixture("userData").then((data)=>{
            User.createAnUser(data.userBody)
        })
    })

    it('get user by username', () => {
        cy.fixture("userData").then((data)=>{
            User.getUserByUsername(data.userBody)
        })
    })

    it('trying to delete an user that doesnt exist', () => {
        cy.fixture("userData").then((data)=>{
            User.tryToDeleteAnNonExistUser(data.invalidUser.username)
        })
    })


})