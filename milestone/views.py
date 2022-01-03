from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from .serializer import *
from datetime import datetime
# Create your views here.

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    

#register user
@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'details': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
        
#get useprofile
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


#update_Users
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request, pk):
    user = User.objects.get(id=pk)

    data = request.data

    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    user.is_staff = data['isAdmin']

    user.save()

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)

#delete users
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    userForDeletion = User.objects.get(id=pk)
    userForDeletion.delete()
    return Response('User was deleted')

#GetBlog
@api_view(["GET"])
def getBlog(request):
    blog = Blog.objects.all()
    serializer = BlogSerializer(blog, many=True)
    return Response(serializer.data)

#getblog id
@api_view(["GET"])
def getBlogByid(request, pk):
    blog= Blog.objects.get(_id=pk)
    serializer = BlogSerializer(blog, many=False)
    return Response(serializer.data)


#Blog
@api_view(['POST'])
@permission_classes([IsAdminUser])
def createBlogPost(request):
    user = request.user
    data = request.data
    blogPost=Blog.objects.create(
        author = user,
        title = "sample titlt",
        description = "sample desecription",
        category = "sample category"
        #thunmbnail = "sample description"
    )
    serializer = BlogSerializer(blogPost, many=False)
    return Response (serializer.data)

#upload thumbnail
@api_view(['POST'])
#@permission_classes([IsAuthenticated])
def uploadBlogThumbnail(request):
    data = request.data
    
    blog_id=data['blog_id']
    blog =  Blog.objects.get(_id=blog_id)
    blog.thumbnail = request.FILES.get('image')
    blog.save()
    return Response("image was uploaded")


#update_blog
@api_view(["PUT"])
@permission_classes([IsAdminUser])
def updateBlog(request,pk):
    data = request.data
    blog = Blog.objects.get(_id=pk)
    
    blog.title = data['title']
    blog.category = data['category']
    blog.description = data['description']
  
  

    blog.save()
    serializer = BlogSerializer(blog,many=False)
    return Response(serializer.data)

#DELETE Blog
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def DeleteBlog(request,pk):
    blog = Blog.objects.get(_id=pk)
    blog.delete()
    return Response("blog post deleted")

#blog reviews
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createBlogReviews(request, pk):
    
    blog = Blog.objects.get(_id=pk)
    data = request.data
    user = request.user

   
    # 2 - No Rating or 0
  
    # 3 - Create review
    
    review = ReviewBlog.objects.create(
        
        blog=blog,
        name=user.first_name,
        comment=data['comment'],
    )

    reviews = blog.reviewblog_set.all()
    #template.numReviews = len(reviews)

    #total = 0
    #for i in reviews:
        # total += i.rating

    #template.rating = total / len(reviews)
    blog.save()

    return Response('Review Added')

#GetAgricProduct
@api_view(["GET"])
def getAgricProduct(request):
    query = request.query_params.get('keyword1')
    print(query)
    if query == None:
        query= ''
    agricProduct = AgricProduct.objects.filter(
        title__icontains=query).order_by('-createdAt')
    #agricProduct = AgricProduct.objects.all()
    serializer =  AgricProductSerializer(agricProduct, many=True)
    return Response(serializer.data)

#Get Agric Product by id    
@api_view(["GET"])
#@permission_classes([IsAdminUser])
def getAgricProductByid(request, pk):
    agricProduct= AgricProduct.objects.get(_id=pk)
    serializer = AgricProductSerializer(agricProduct, many=False)
    return Response(serializer.data)

#update agric product
@api_view(["PUT"])
def updateAgricProduct(request,pk):
    data = request.data
    agricProduct = AgricProduct.objects.get(_id=pk)
    agricProduct.title = data['title']
    agricProduct.description = data['description']
    agricProduct.stocks = data["stocks"]
    agricProduct.save()
    serializer = AgricProductSerializer(agricProduct, many=False)
    return Response(serializer.data)



@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def DeleteAgricProduct(request,pk):
   agricProduct = AgricProduct.objects.get(_id=pk)
   agricProduct.delete()
   return Response("blog deleted")


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createAgricProduct(request):
    user = request.user
    data = request.data
    agricProduct=AgricProduct.objects.create(
        user = user,
        title = "sample title",
        price =0,
        stocks = 0,
        description = "description",
        #category = "sample category",
       
    )
    serializer = AgricProductSerializer(agricProduct, many=False)
    return Response (serializer.data)

#upload thumbnail
@api_view(['POST'])
#@permission_classes([IsAuthenticated])
def uploadAgricThumbnail(request):
    data = request.data
    
    agricProduct_id=data['agricProduct_id']
    agricProduct =  AgricProduct.objects.get(_id=agricProduct_id)
    agricProduct.thumbnail = request.FILES.get('image')
    agricProduct.save()
    return Response("thumbnail was uploaded")

#upload agricProductimage1
@api_view(['POST'])
#@permission_classes([IsAuthenticated])
def uploadAgricImage1(request):
    data = request.data
    
    agricProduct_id=data['agricProduct_id']
    agricProduct =  AgricProduct.objects.get(_id=agricProduct_id)
    agricProduct.image1 = request.FILES.get('image1')
    agricProduct.save()
    return Response("image1 was uploaded")


#upload agricProductimage2
@api_view(['POST'])
#@permission_classes([IsAuthenticated])
def uploadAgricImage2(request):
    data = request.data
    
    agricProduct_id=data['agricProduct_id']
    agricProduct =  AgricProduct.objects.get(_id=agricProduct_id)
    agricProduct.image2 = request.FILES.get('image2')
    agricProduct.save()
    return Response("image2 was uploaded")

#upload agricProductimage3
@api_view(['POST'])
#@permission_classes([IsAuthenticated])
def uploadAgricImage3(request):
    data = request.data
    
    agricProduct_id=data['agricProduct_id']
    agricProduct =  AgricProduct.objects.get(_id=agricProduct_id)
    agricProduct.image3 = request.FILES.get('image3')
    agricProduct.save()
    return Response("image3 was uploaded")



#GetNaturalProduct
@api_view(["GET"])
def getNaturalProduct(request):
    naturalProduct = NaturalProduct.objects.all()
    serializer =  NaturalProductSerializer(naturalProduct, many=True)
    return Response(serializer.data)

#Get Natural Product by id    
@api_view(["GET"])
#@permission_classes([IsAdminUser])
def getNaturalProductByid(request, pk):
    naturalProduct= NaturalProduct.objects.get(_id=pk)
    serializer = NaturalProductSerializer(naturalProduct, many=False)
    return Response(serializer.data)

#update natural product
@api_view(["PUT"])
def updateNaturalProduct(request,pk):
    data = request.data
    naturalProduct = NaturalProduct.objects.get(_id=pk)

    naturalProduct.title = data['title']
    naturalProduct.description = data['description']
    naturalProduct.stocks = data['stocks']
    naturalProduct.save()
    serializer = NaturalProductSerializer(naturalProduct, many=False)
    return Response(serializer.data)



@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def DeleteNaturalProduct(request,pk):
   naturalProduct = NaturalProduct.objects.get(_id=pk)
   naturalProduct.delete()
   return Response("blog deleted")


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createNaturalProduct(request):
    user = request.user
    data = request.data
    naturalProduct=NaturalProduct.objects.create(
        user = user,
        title = "sample title",
        price =0,
        stocks = 0,
        description = "description",
       
       
    )
    serializer = NaturalProductSerializer(naturalProduct, many=False)
    return Response (serializer.data)

#upload thumbnail
@api_view(['POST'])
#@permission_classes([IsAuthenticated])
def uploadNaturalThumbnail(request):
    data = request.data
    
    naturalProduct_id=data['naturalProduct_id']
    naturalProduct =  NaturalProduct.objects.get(_id=naturalProduct_id)
    naturalProduct.thumbnail = request.FILES.get('image')
    naturalProduct.save()
    return Response("thumbnail was uploaded")

#upload agricProductimage1
@api_view(['POST'])
#@permission_classes([IsAuthenticated])
def uploadNaturalImage1(request):
    data = request.data
    
    naturalProduct_id=data['naturalProduct_id']
    naturalProduct =  NaturalProduct.objects.get(_id=naturalProduct_id)
    naturalProduct.image1 = request.FILES.get('image')
    naturalProduct.save()
    return Response("image1 was uploaded")


#upload agricProductimage2
@api_view(['POST'])
#@permission_classes([IsAuthenticated])
def uploadNaturalImage2(request):
    data = request.data
    
    naturalProduct_id=data['naturalProduct_id']
    naturalProduct =  NaturalProduct.objects.get(_id=naturalProduct_id)
    naturalProduct.image1 = request.FILES.get('image')
    naturalProduct.save()
    return Response("image2 was uploaded")

#upload agricProductimage3
@api_view(['POST'])
#@permission_classes([IsAuthenticated])
def uploadNaturalImage3(request):
    data = request.data
    
    naturalProduct_id=data['naturalProduct_id']
    naturalProduct =  NaturalProduct.objects.get(_id=naturalProduct_id)
    naturalProduct.image3 = request.FILES.get('image')
    naturalProduct.save()
    return Response("image3 was uploaded")



#Get allinformationTechProduct
@api_view(["GET"])
def getInformationTechProduct(request):
    query = request.query_params.get('keyword')
    print(query)
    if query == None:
        query= ''
    informationTechProduct = InformationTechProduct.objects.filter(
        title__icontains=query).order_by('-createdAt')
    #informationTechProduct = InformationTechProduct.objects.all()
    serializer =  InformationTechProductSerializer(informationTechProduct, many=True)
    return Response(serializer.data)

#Get Information Tech Product by id    
@api_view(["GET"])
def getInformationTechProducByid(request, pk):
    informationTechProduct= InformationTechProduct.objects.get(_id=pk)
    serializer = InformationTechProductSerializer(informationTechProduct, many=False)
    return Response(serializer.data)

#update ictproduct
@api_view(["PUT"])
def UpdateInformationTechProduct(request,pk):
    data = request.data
    informationTechProduct = InformationTechProduct.objects.get(_id=pk)

    informationTechProduct.title = data['title']
    informationTechProduct.description = data['description']
    informationTechProduct.is_premium = data['is_premium']
    informationTechProduct.category = data['category']
    informationTechProduct.stocks = data['stocks']
    informationTechProduct.demolink = data['demolink']

    informationTechProduct.save()
    serializer = InformationTechProductSerializer(informationTechProduct, many=False)
    return Response(serializer.data)



@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def DeleteInformationTechProduct(request,pk):
   informationTechProduct = InformationTechProduct.objects.get(_id=pk)
   informationTechProduct.delete()
   return Response("informationTechProduct deleted")


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createInformationTechProduct(request):
    user = request.user
    data = request.data
    informationTechProduct=InformationTechProduct.objects.create(
        user = user,
        title = ' Sample title',
        price = 0,
        stocks = 0,
        description =' sample description',
        category= 'sample category',
        demolink = 'www.example.com',
       
       
    )
    serializer = InformationTechProductSerializer(informationTechProduct, many=False)
    return Response (serializer.data)

#upload thumbnail
@api_view(['POST'])

def uploadInformationThumbnail(request):
    data = request.data
    
    informationProduct_id=data['informationProduct_id']
    informationTechProduct =  InformationTechProduct.objects.get(_id=informationProduct_id)
    informationTechProduct.thumbnail = request.FILES.get('image')
    informationTechProduct.save()
    return Response("informationTechProduct thumbnail was uploaded")

#upload informationTechProductimage1
@api_view(['POST'])

def uploadinformationTechImage1(request):
    data = request.data
    
    informationProduct_id=data['informationProduct_id']
    informationTechProduct =  InformationTechProduct.objects.get(_id=informationProduct_id)
    informationTechProduct.image1 = request.FILES.get('image1')
    informationTechProduct.save()
    return Response("image1 was uploaded")


#upload informationTechProductImage2
@api_view(['POST'])

def uploadinformationTechImage2(request):
    data = request.data
    
    informationProduct_id=data['informationProduct_id']
    informationTechProduct =  NaturalProduct.objects.get(_id=informationProduct_id)
    informationTechProduct.image2 = request.FILES.get('image2')
    informationTechProduct.save()
    return Response("image2 was uploaded")


#upload informationTechProductImage3
@api_view(['POST'])
def uploadinformationTechImage3(request):
    data = request.data
    
    informationProduct_id=data['informationProduct_id']
    informationTechProduct =  NaturalProduct.objects.get(_id=informationProduct_id)
    informationTechProduct.image3 = request.FILES.get('image3')
    informationTechProduct.save()
    return Response("image2 was uploaded")

#get all Booking
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getBooking(request):
    booking =  Booking.objects.ge()
    serializer = BookingSerializer(booking, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def  getBookingByid(request,pk):
    booking = Booking.objects.get(_id=pk)
    serializer = BookingSerializer(booking, many=False)
    return Response(serializer.data)

@api_view(["POST"])
def createBooking(request):
    user = request.user
    data = request.data
    booking= Booking.objects.create(
        user = user,
        serviceName  = data["serviceName"],
        custormerName =  data["custormerName"],
        customerEmail = data["custormerEmail"],
        phone = data["phone"],
        description = data['description'],
        category = data['category'],
        budget = data["budget"],
    )
    serializer = BookingSerializer(booking, many=False)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAdminUser])
def updateBooking(request,pk):
    data = request.data
    booking = Booking.objects.get(_id=pk)
    booking.serviceName= data["serviceName"],
    booking.custormerName= data["custormerName"],
    booking.custormerEmail= data["custormerEmail"],
    booking.phone= data["phone"],
    booking.description= data["description"],
    booking.category= data["category"],
    booking.is_completed = data["is_completed"]
    booking.save()
    serializer = BookingSerializer(booking, many=False)
    return Response(serializer.data)

def UpdateBookingToCompleted(request, pk):
    booking = Booking.objects.get(_id=pk)
    booking.is_completed = True
    booking.completedAt = datetime.now()

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteBooking(request,pk):
    booking = Booking.objects.get(_id=pk)
    booking.save()
    return Response("deleted")


#AgricProduct review
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createAgricProductReviews(request, pk):
    user = request.user
    data = request.data
    agricproduct = AgricProduct.objects.get(_id=pk)
    
    
    # 1 - Review already exists
    alreadyExists = agricproduct.reviewagric_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
  
    # 2 - No Rating or 0
    if data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 - Create review
    else:
        review = ReviewAgric.objects.create(
            user=user,
            AgricProduct=agricproduct,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = agricproduct.reviewagric_set.all()
        agricproduct.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        agricproduct.rating = total / len(reviews)
        agricproduct.save()

        return Response('Review Added')


#NaturalProduct review
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createNaturalProductReviews(request, pk):
    data = request.data
    user = request.user
    naturalproduct = NaturalProduct.objects.get(_id=pk)
    
    # 1 - Review already exists
  
    # 2 - No Rating or 0
    if data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 - Create review
    else:
        review = ReviewNatural.objects.create(
            user=user,
            naturalproduct=naturalproduct,
            name=user.name,
            rating=data['rating'],
            comment=data['comment'],
        
        )

        reviews = naturalproduct.reviewnatural_set.all()
        naturalproduct.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        naturalproduct.rating = total / len(reviews)
        naturalproduct.save()

        return Response('Review Added')


#InformationTechProduct review
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createInformationTechProductReviews(request, pk):
    
    informationTechProduct = InformationTechProduct.objects.get(_id=pk)
    data = request.data
    user = request.user

    # 1 - Review already exists
  
    # 2 - No Rating or 0
    if data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 - Create review
    else:
        review = ReviewNatural.objects.create(
           
            ict=informationTechProduct,
             user=user,
            
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        
        )

        reviews = informationTechProduct.reviewict_set.all()
        informationTechProduct.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        informationTechProduct.rating = total / len(reviews)
        informationTechProduct.save()

        return Response('Review Added')



