from django.urls import  path
from .views import *


urlpatterns = [
    path('user/login/',MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path("user/register/", registerUser, name="registerUser") ,
    path('user/profile/', getUserProfile, name="profile-user"),
    
    path("booking/allbooking/", getBooking, name="getallbooking"),
    path('Booking/createbooking', createBooking, name="createbookings"),

    path("blog/getallblogs/", getBlog, name="allblog"),
    

    path("agric/agricProducts/", getAgricProduct, name="getallagricproducts"),
    path("agric/create/", createAgricProduct, name='createagricproduct'),
  

    path("natural/naturalproducts/", getNaturalProduct, name="getnaturalproducts"),
    path("natural/create/", createNaturalProduct, name="createnaturalproducts"),
    

    path("informationTech/informationproducts/", getInformationTechProduct, name="getinformationtechs"),
    path("informationTech/create/", createInformationTechProduct, name="createinformationtechproducts"),
  

    path("informatiion/uploadthumbnail/",uploadInformationThumbnail, name="informationtechthunmbnail" ),
    path("informatiion/uploadimage1/",uploadinformationTechImage1, name="informationtechimage1" ),
    path("informatiion/uploadimage2/",uploadinformationTechImage2, name="informationtechimage2" ),
    path("informatiion/uploadimage3/",uploadinformationTechImage3, name="informationtechimage3" ),

    path("natural/uploadthumbnail/",uploadNaturalThumbnail, name="naturalthunmbnail" ),
    path("natural/uploadimage1/",uploadNaturalImage1, name="naturalimage1" ),
    path("natural/uploadimage2/",uploadNaturalImage2, name="naturalimage2" ),
    path("natural/uploadimage3/",uploadNaturalImage3, name="naturalimage3" ),

    path("agric/uploadthumbnail/",uploadAgricThumbnail, name="agricthunmbnail" ),
    path("agric/uploadimage1/",uploadAgricImage1, name="Agricimage1" ),
    path("agric/uploadimage2/",uploadAgricImage2, name="Agricimage2" ),
    path("agric/uploadimage3/",uploadAgricImage3, name="Agricimage3" ),

    path("user/<str:pk>/updateuser/",updateUser, name=" updateuser" ),
    path("user/<str:pk>/deleteuser/", deleteUser, name="deleteuser"),

    path("blog/<str:pk>/blogdetails/", getBlogByid, name="blogdetails"),
    path("blog/createblog/",createBlogPost, name="createblog" ),
    path("blog/<str:pk>/updateBlog/", updateBlog, name="updateBlog"),
    path("blog/<str:pk>/deleteblog/", DeleteBlog, name="deleteblog"),
    
    path("blog/uploadthumbnail/", uploadBlogThumbnail, name="blogthunmbnail" ),
    path("blog/<str:pk>/reviews/", createBlogReviews, name="deleteblog"),

    path("agric/<str:pk>/agricproduct/", getAgricProductByid, name="agricproductdetails"),
    path("agric/<str:pk>/update/", updateAgricProduct, name="updateagricproduct"),
    path("agric/<str:pk>/delete/", DeleteAgricProduct, name="deleteagricproduct"),

    path("natural/<str:pk>/naturalproduct/", getNaturalProductByid, name="naturalproduct"),
    path("natural/<str:pk>/update/", updateNaturalProduct, name="updatenaturalproduct"),
    path("natural/<str:pk>/delete/", DeleteNaturalProduct, name="deletenatural"),

    path("informationTech/<str:pk>/informationproduct/", getInformationTechProducByid, name="informationtechproduct"),
    path("informationTech/<str:pk>/update/", UpdateInformationTechProduct, name="updateinformationTechProduct"),
    path("informationTech/<str:pk>/delete/", DeleteInformationTechProduct, name="deleteinformationTechProduct"),

    path("informationTech/<str:pk>/createreview/", createInformationTechProductReviews, name="createInformationReviews"),
    path("agric/<str:pk>/createreview/", createAgricProductReviews, name="createagricproduct"),
    path("natural/<str:pk>/createreview/", createNaturalProductReviews, name="createInformationReviews"),
    path("informationTech/<str:pk>/createreview/", createInformationTechProductReviews, name="createInformationReviews"),

    path("booking/<str:pk>/getbooking/", getBookingByid, name="booking"),
    path("booking/<str:pk>/updatebooking/", updateBooking, name="updatebooking"),
    path('booking/<str:pk>/deletebooking/', deleteBooking, name="deletebooking")

    


    


]

