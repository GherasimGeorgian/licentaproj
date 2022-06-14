class User:
    def __init__(self,username, firstName,lastName,email,password):
        self.username = username
        self.firstName = firstName
        self.lastName = lastName
        self.email = email
        self.password = password
    def get_UserName(self):
        return self.username


    def get_FirstName(self):
        return self.firstName

    def get_LastName(self):
        return self.lastName
    
    def get_email(self):
        return self.email

    def get_Password(self):
        return self.password