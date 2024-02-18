import User  from "../../src/models/User"

describe("testando a model user", () => {
    
    let user: User

    beforeEach(()=> {
        user = new User(
             "id-mock-user",
             "user",
             "user@email.com",
             "hash-mock-user", // senha = "user123"
        )
    })
    
    test("deve instanciar corretamente", () => {
        expect(user).toBeInstanceOf(User)
    })

    test("deve encapsular id", () => {  
        user.setId("id-mock-user") 
        expect(user.getId()).toEqual("id-mock-user")
    })


    test("deve encapsular email", () => {
        user.setEmail("user@email.com")    
        expect(user.getEmail()).toEqual("user@email.com")
    })
    
    test("deve encapsular senha", () => {
        user.setPassword("hash-mock-user")    
        expect(user.getPassword()).toEqual("hash-mock-user")
    })
})