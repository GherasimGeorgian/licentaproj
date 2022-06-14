class Product:
    def __init__(self,id, denumire,descriere,pret,url_image,stoc):
        self.id = id
        self.denumire = denumire
        self.descriere = descriere
        self.pret = pret
        self.url_image = url_image
        self.stoc = stoc
    def get_Id(self):
        return self.id


    def get_Denumire(self):
        return self.denumire

    def get_Descriere(self):
        return self.descriere
    
    def get_Pret(self):
        return self.pret

    def get_Url_image(self):
        return self.url_image

    def get_Stoc(self):
        return self.stoc