class Service:
    def __init__(self, repo):
        self.repo = repo 

    def createAccount(self,user):
        self.repo.create_client(user)

    def loginUser(self,username,password):
        return  self.repo.loginbyUsernameAndPassword(username,password)
    def getAllProducts(self):
        return self.repo.get_all_products()
    def insertProducts(self):
        return self.repo.insert_products()
    def getproductbyid(self,id):
        return self.repo.getproductbyid(id)