class User{

    constructor(){
        this.url = 'https://petstore.swagger.io/v2'
        this.userEndpoint ='/user/'
        this.methods = ['GET','POST','PUT','DELETE']
        this.statusCodes = [200,404,500]
    }

    createAnUser(userBody){
        cy.request({
            method: this.methods[1],
            url: this.url+this.userEndpoint,
            body: userBody
        }).its('status').should('eq',this.statusCodes[0])
    }

    getUserByUsername(expectedBody){
        cy.request({
            method: this.methods[0],
            url: this.url+this.userEndpoint+expectedBody.username,
        }).then((response) => {
            expect(response.body).to.deep.equal(expectedBody)
            expect(response.status).to.equal(200)
        })
    }

    tryToDeleteAnNonExistUser(username){
        cy.request({
            method: this.methods[3],
            url: this.url+this.userEndpoint+username,
            failOnStatusCode: false
        }).its('status').should('eq',this.statusCodes[1])
    }




    

}

module.exports = new User();