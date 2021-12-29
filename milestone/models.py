from django.db import models
from django.contrib.auth.models import User
from django.db.models.fields import BooleanField

# Create your models here.\
class Blog(models.Model):
    author =  models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    description= models.TextField( null=True, blank=True)
    thumbnail = models.ImageField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.title

class AgricProduct(models.Model):
    user =  models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    description= models.TextField( null=True, blank=True)
    thumbnail = models.ImageField(null=True, blank=True)
    image1 = models.ImageField(null=True, blank=True)
    image2 = models.ImageField(null=True, blank=True)
    image3 = models.ImageField(null=True, blank=True)
    price = models.DecimalField( max_digits=7, decimal_places=2, null=True, blank=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField( null=True, blank=True)
    stocks = models.IntegerField( null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.title

class NaturalProduct(models.Model):
    user =  models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    description= models.TextField( null=True, blank=True)
    thumbnail = models.ImageField(null=True, blank=True)
    image1 = models.ImageField(null=True, blank=True)
    image2 = models.ImageField(null=True, blank=True)
    image3 = models.ImageField(null=True, blank=True)
    price = models.DecimalField( max_digits=7, decimal_places=2, null=True, blank=True)
    stocks = models.IntegerField( null=True, blank=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField( null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.title       


class InformationTechProduct(models.Model):
    user =  models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField( null=True, blank=True)
    thumbnail = models.ImageField(null=True, blank=True)
    image1 = models.ImageField(null=True, blank=True)
    image2 = models.ImageField(null=True, blank=True)
    image3 = models.ImageField(null=True, blank=True)
    price = models.DecimalField( max_digits=7, decimal_places=2, null=True, blank=True)
    stocks = models.IntegerField( null=True, blank=True)
    is_premium = models.BooleanField(default=False)
    category = models.CharField(max_length=200, blank=True, null=True)
    demolink = models.CharField(max_length=200, blank=True, null=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField( null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.title     


class Booking(models.Model):
    serviceName = models.CharField(max_length=200, null=True, blank=True)
    custormerName = models.CharField(max_length=200, null=True, blank=True)
    custormerEmail =  models.EmailField(max_length=200, null=True, blank=True)
    phone = models.CharField(max_length=15, null=True, blank=True)
    description= models.TextField( null=True, blank=True)
    category =  models.CharField(max_length=200, null=True, blank=True)
    budget = models.DecimalField( max_digits=7, decimal_places=2, null=True, blank=True)
    is_Completed = models.BooleanField(default=False)
    completedAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.serviceName

class NewsLetter(models.Model):
    name = models.CharField(max_length=200, null=True,blank=True)
    email =  models.EmailField()
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self) :
        return str(self.name)

class ReviewAgric(models.Model):
    AgricProduct = models.ForeignKey(AgricProduct, on_delete=models.SET_NULL, null=True)
    user =  models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)

class ReviewNatural(models.Model):
    naturalproduct = models.ForeignKey(NaturalProduct, on_delete=models.SET_NULL, null=True)
    user =  models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True,blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)

class ReviewIct(models.Model):
    ict = models.ForeignKey(InformationTechProduct, on_delete=models.SET_NULL, null=True)
    user =  models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True,blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)



class ReviewBlog(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True,blank=True)
    #rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.comment


class Promotion(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=200, blank=True,null=True) 
    content = models.TextField( blank=True,null=True)
    thumbnail = models.ImageField(null=True, blank=True)
    link= models.CharField(max_length=300,blank=True, null=True)
    dayToUse = models.CharField(max_length=200, blank=True,null=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    is_expired = models.BooleanField(default=False)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.title



class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(
        auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.createdAt)


class OrderItemAgric(models.Model):
    product = models.ForeignKey(AgricProduct, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)


class OrderItemNatural(models.Model):
    product = models.ForeignKey(NaturalProduct, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)        


class OrderItemInformation(models.Model):
    product = models.ForeignKey(InformationTechProduct, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)      
        

class ShippingAddress(models.Model):
    order = models.OneToOneField(
        Order, on_delete=models.CASCADE, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postalCode = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)
    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.address)