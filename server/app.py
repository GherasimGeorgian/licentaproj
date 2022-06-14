import base64
import json
import os
from flask import Flask, jsonify, request
from flask import send_file
import flask
from repository.Repository import Repository
from domain.User import User
from service.Service import Service
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
from PIL import Image 
import PIL

app = Flask(__name__)
repo = Repository();
service = Service(repo);

repo.print_databases()
#service.insertProducts()
@app.route('/')
def index():
    return "Hello, World!"
@app.route('/products')
def products():
    list_p = service.getAllProducts()
    json_string = json.dumps([ob.__dict__ for ob in list_p])
    print(json_string)
    return json_string

@app.route('/login', methods=['GET', 'POST'])
def login():
    #print(request.data)
    var_ret = service.loginUser(request.json['username'],request.json['password'])
    
    if(var_ret == True):
        return {'username': request.json['username'], "successLogin":True}
    else:
        return {'username': request.json['username'], "successLogin":False}


@app.route('/getproductbyid', methods=['GET', 'POST'])
def getproductbyid():
    #print(request.data)
    
    var_ret = service.getproductbyid(request.json['id'])
    return {'id': var_ret['id'], "denumire": var_ret['denumire'],'descriere':var_ret['descriere'],'pret':var_ret['pret'],'url_image':var_ret['url_image'],'stoc':var_ret['stoc'] }
   


@app.route('/register', methods=['GET', 'POST'])
def register():
    #print(request.data)
    new_user = User(request.json['username'],request.json['firstname'],request.json['lastname'],request.json['email'],request.json['password'])
    service.createAccount(new_user)


    return {'username': new_user.get_UserName(),'firstname': new_user.get_FirstName(),'lastname': new_user.get_LastName(),'email': new_user.get_email()}

@app.route("/imgs/<path:path>")
def images(path):
    fullpath = "E:\\licenta_proj1\Flow-Style-VTON-main\\server_app\\test\\VITON_test\\test_clothes\\" + path
    return send_file(fullpath, mimetype='image/jpg')

@app.route('/virtual_dressing/<path:path>',methods=['GET', 'POST'])
def virtual_dressing(path):
    
    print(request.files)
    file = request.files['image']

    im1 = Image.open(file) 
  

   
    im1 = im1.save("E:/licenta_proj1/Flow-Style-VTON-main/server_app/test/VITON_test/test_img/second.jpg")

    
    f = open("./test_pairs.txt", "w")
    f.write("second.jpg" + " " + path + ".jpg")
    f.close()
    os.system('python test/test.py --name demo --resize_or_crop None --batchSize 1 --gpu_ids -1 --warp_checkpoint E:/licenta_proj1/Flow-Style-VTON-main/ckp/non_aug/PFAFN_warp_epoch_101.pth --gen_checkpoint E:/licenta_proj1/Flow-Style-VTON-main/ckp/non_aug/PFAFN_gen_epoch_101.pth --dataroot E:/licenta_proj1/Flow-Style-VTON-main/server_app/test/VITON_test')
    
    fullpath = "E:/licenta_proj1/Flow-Style-VTON-main/server_app/test/our_t_results/" + "0.jpg"
    with open(fullpath, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read())
        return encoded_string
    #im1 = Image.open(file) 
    #image_string = base64.b64encode(file.read())
    
    #
    #return send_file(fullpath, mimetype='image/jpg')

if __name__ == '__main__':
    app.run(debug=True)