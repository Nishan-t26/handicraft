from django.shortcuts import redirect,render
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login,logout
from django.contrib import auth
from django.contrib import messages
from .models import category,selling
# Create your views here.
username=User.id
print(username)

def index(request):
    if request.method=="POST":
        if 'email' in request.POST:
            email=request.POST.get('email')
            password=request.POST.get('password')
            username=request.POST.get('username')
            myuser=User.objects.create_user(username=username,email=email,password=password)
            myuser.save()
            messages.success(request,"your account has been created ")
           
        
        elif 'lusername' in request.POST:

            lusername=request.POST.get('lusername')
            lpassword=request.POST.get('lpassword')
            user=authenticate(username=lusername,password=lpassword)
            
            if user is not None:
                
                login(request,user)
            else:
                messages.error(request,"Not matched")
    
    username=request.user.username
    print(username)
    params={'username':username}
    
    return render(request,'main/index.html',params)

def sell(request):
    if request.user.is_authenticated:
        username=request.user.username
        
        cat=category.objects.all()
        
        nc=cat.count()
        # print(nc)
        subc=0
        if request.method=="POST":
            u_id=request.user.id
            subc=subc+1
            prod_name=request.POST.get('prod_name')
            prod_desc=request.POST.get('prod_desc')
            com_name=request.POST.get('com_name')
            prodimg=request.FILES.getlist('images')
            prod_price=request.POST.get('prod_price')
            
            for image in prodimg:
                selling_prod=selling.objects.create(user_id=u_id,prod_name=prod_name,prod_img=image,prod_com_name=com_name ,prod_desc=prod_desc,prod_price=prod_price)
                selling_prod.save() 
        user_prod=selling.objects.filter(user_id=request.user.id)
        cid=0
        view_prod=[]
        for i in user_prod:
            if i.prod_name != cid:
                view_prod.append(i)
            cid=i.prod_name
        print(view_prod)
        last_prod=view_prod[-1]
        # print(last_prod)
        user_product_list=[]
        
        for i in view_prod:
            product_list=[]
            n=0
            for j in user_prod:
                if i.prod_name==j.prod_name:
                    j.no=n
                    product_list.append(j)
                    n=n+1
            user_product_list.append(product_list)
        print(user_product_list)
        print("fshfklhfdjhfjdhfjkldsfhldksfhldskhffkljdshk")
        # user_last_prod=user_product_list[-1]
        # print(user_last_prod)
        # lpc=0
        # for i in user_last_prod:
        #     lpc=lpc+1
        # print(lpc)    
        

            

        
        
        # lpc=user_last_prodarr.count()

        nsp=user_prod.count()
        
        params={'username':username,'cat':cat,'nc':nc,'nsp':nsp,'user_product_list':user_product_list,'view_prod':view_prod,'cid':cid,'last_prod':last_prod,'subc':subc,'user_prod':user_prod}  
        return render(request,'main/sell.html',params)
    else:
        print("error") 
        messages.error(request,"login required ")   
        return render(request,'main/index.html')

def logout(request):
    auth.logout(request)
    return redirect('/main')
def test(request):
    return render(request,'main/test.html')


def buy(request):
    return render(request,'main/buy.html')
    
  
