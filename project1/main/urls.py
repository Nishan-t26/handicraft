from django.urls import path
from . import views
urlpatterns = [
    path("",views.index,name="main"),
    path('sell/',views.sell,name="sell"),
    path('buy/',views.buy,name="buy"),
    path('logout/',views.logout,name="logout"),
    path('test/',views.test,name="test")
    # path('abcd/',views.abcd,name="abcd")
]