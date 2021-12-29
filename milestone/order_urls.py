
from django.urls import path
from   .orderView import  *
#from rest_framework_simplejwt.views import TokenObtainPairView


urlpatterns = [
    path('order/orders/', getOrders, name="orders"),
    path('order/agric/add/', AddAgricOrderItems, name='orders-add'),
    path('order/information/add/', AddInformationOrderItems, name='orders-add'),
    path('order/Natural/add/', AddNaturalOrderItems, name='orders-add'),
    path('order/myorders/', getMyOrders, name="myorders"),

    path('order/<str:pk>/deliver/', updateOrderToDelivered, name='deliver'),

    path('order/<str:pk>/order/', getOrderById, name='user-order'),
    path('order/<str:pk>/pay/', updateOrderToPaid, name='pay'),

    path('order/<str:pk>/delete/', deleteOrder, name='delete')
    
    ]