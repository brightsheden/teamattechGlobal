from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .serializer import *
from datetime import datetime

# Create your views here.



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def AddAgricOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:

        # (1) Create order

        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice']
        )

        # (2) Create shipping address

        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
        )

        # (3) Create order items adn set order to orderItem relationship
        for i in orderItems:
            product = AgricProduct.objects.get(_id=i['product'])
          

            item = OrderItemAgric.objects.create(
                product=product,
            
                order=order,
                name=product.title,
                
                qty=i['qty'],
                price=i['price'],
                image=product.thumbnail.url,
            
            )

            # (4) Update stock

            product.stocks -= item.qty
           
            product.save()
            

        serializer = AgricOrderItemSerializer(order, many=False)
        return Response(serializer.data)


        
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def AddNaturalOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:

        # (1) Create order

        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice']
        )

        # (2) Create shipping address

        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
        )

        # (3) Create order items adn set order to orderItem relationship
        for i in orderItems:
            productNatural = AgricProduct.objects.get(_id=i['productNatural'])
          

            item = OrderItemAgric.objects.create(
                productNatural=productNatural,
            
                order=order,
                name=productNatural.title,
                
                qty=i['qty'],
                price=i['price'],
                image=productNatural.thumbnail.url,
            
            )

            # (4) Update stock

            productNatural.stocks -= item.qty
           
            productNatural.save()
            

        serializer = NaturalOrderItemSerializer(order, many=False)
        return Response(serializer.data)

                
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def AddInformationOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:

        # (1) Create order

        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice']
        )

        # (2) Create shipping address

        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
        )

        # (3) Create order items adn set order to orderItem relationship
        for i in orderItems:
            productInformation = AgricProduct.objects.get(_id=i['productInformation'])
          

            item = OrderItemAgric.objects.create(
                productInformation=productInformation,
            
                order=order,
                name=productInformation.title,
                
                qty=i['qty'],
                price=i['price'],
                image=productInformation.thumbnail.url,
            
            )

            # (4) Update stock

            productInformation.stocks -= item.qty
           
            productInformation.save()
            

        serializer = InformationOrderItemSerializer(order, many=False)
        return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):

    user = request.user

    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response({'detail': 'Not authorized to view this order'},
                     status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(_id=pk)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()

    return Response('Order was paid')



@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request, pk): 
    order = Order.objects.get(_id=pk)

    order.isDelivered = True
    order.deliveredAt = datetime.now() 
    order.save()

    return Response('Order was delivered')

@api_view(['DELETE'])
def deleteOrder(request,pk):
    order = Order.objects.get(_id=pk)

    order.delete()
    return Response("oder deleted")



