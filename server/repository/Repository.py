from dotenv import load_dotenv, find_dotenv
import os
import pprint
from numpy import insert
from pymongo import MongoClient
from urllib.parse import quote

from domain.Product import Product


class Repository:
     def __init__(self):
            print("load repo") 
            self.client_mongo = self.loadDatabase()
            self.user_collection = self.getUserCollection()
            self.product_collection = self.getProductCollection()
            
     def loadDatabase(self):
            load_dotenv(find_dotenv())
            password = os.environ.get("MONGODB_PWD")
            connection_string = f"mongodb+srv://GherasimGeorgian:"+ quote(password) +"@cluster0.gckzd.mongodb.net/?retryWrites=true&w=majority"
            return  MongoClient(connection_string)

     def getUserCollection(self):
           users_db = self.client_mongo.users
           return users_db.users

     def create_client(self, new_user):
           user_document = {
              "username":new_user.get_UserName(),
              "firstName":new_user.get_FirstName(),
              "lastName":new_user.get_LastName(),
              "email":new_user.get_email(),
              "password":new_user.get_Password(),
           }
           inserted_id = self.getUserCollection().insert_one(user_document).inserted_id
           print(inserted_id)


     def print_databases(self):
           dbs = self.client_mongo.list_database_names()
           print(dbs)
     def getUserCollection(self):
           users_db = self.client_mongo.users
           return users_db.users

     def insert_products(self):
           product1 = Product(1,"Bluza maneci lungi","Bluza maneci lungi, varianta alba si neagra",54,"000001_1.jpg",True)
           self.create_product(product1)
           product2 = Product(2,"Bluza maneci lungi negre","Bluza maneci lungi negre",62,"000010_1.jpg",True)
           self.create_product(product2)
           product3 = Product(3,"Bluza alba maneci scurte","Bluza alba maneci scurte",64,"000020_1.jpg",True)
           self.create_product(product3)
           product4 = Product(4,"Bluza subtire gri","Bluza subtire gri calitatea 1",130,"000028_1.jpg",True)
           self.create_product(product4)
           product5 = Product(5,"Bluza fara maneci","Bluza fara maneci floricele negre",34,"000038_1.jpg",True)
           self.create_product(product5)
           product6 = Product(6,"Bluza galbena fara maneci","Bluza galbena fara maneci perfecta pentru tine",67,"000048_1.jpg",True)
           self.create_product(product6)
           product7 = Product(7,"Bluza maneci lungi","Bluza maneci lungi, varianta alba si neagra",54,"000001_1.jpg",True)
           self.create_product(product7)
           product8 = Product(8,"Bluza maneci lungi negre","Bluza maneci lungi negre",62,"000010_1.jpg",True)
           self.create_product(product8)
           product9 = Product(9,"Bluza alba maneci scurte","Bluza alba maneci scurte",64,"000020_1.jpg",True)
           self.create_product(product9)
           product10 = Product(10,"Bluza subtire gri","Bluza subtire gri calitatea 1",130,"000028_1.jpg",True)
           self.create_product(product10)
           product11 = Product(11,"Bluza fara maneci","Bluza fara maneci floricele negre",34,"000038_1.jpg",True)
           self.create_product(product11)
           product12 = Product(12,"Bluza galbena fara maneci","Bluza galbena fara maneci perfecta pentru tine",67,"000048_1.jpg",True)
           self.create_product(product12)
           product13 = Product(13,"Bluza maneci lungi","Bluza maneci lungi, varianta alba si neagra",54,"000001_1.jpg",True)
           self.create_product(product13)
           product14 = Product(14,"Bluza alba maneci scurte","Bluza alba maneci scurte",64,"000020_1.jpg",True)
           self.create_product(product14)
           
     def getProductCollection(self):
            products_db = self.client_mongo.products
            return products_db.products

     def create_product(self, new_product):
           product_document = {
              "id":new_product.get_Id(),
              "denumire":new_product.get_Denumire(),
              "descriere":new_product.get_Descriere(),
              "pret":new_product.get_Pret(),
              "url_image":new_product.get_Url_image(),
              "stoc":new_product.get_Stoc()
           }
           inserted_id = self.getProductCollection().insert_one(product_document).inserted_id
           print(inserted_id) 

     
     def loginbyUsernameAndPassword(self, username,password):
           user_found = self.getUserCollection().find_one({"username":username,"password":password})
           if user_found == None:
                  return False
           if (str(username) == user_found["username"] and str(password) == user_found["password"]):
              return True
           else:
              return False;
           
     def get_all_products(self):
          list_products = []
          products = self.getProductCollection().find()
          for product in products:
                list_products.append(Product(product["id"],product["denumire"],product["descriere"],product["pret"],product["url_image"],product["stoc"]))

          return list_products

     def getproductbyid(self,id):
         
         product_found = self.getProductCollection().find_one({"id":id})
         return product_found
    