from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Blog)
admin.site.register(AgricProduct)
admin.site.register(NaturalProduct)
admin.site.register(InformationTechProduct)
admin.site.register(Booking)
admin.site.register(NewsLetter)
admin.site.register(ReviewNatural)
admin.site.register(ReviewAgric)
admin.site.register(ReviewIct)
admin.site.register(Promotion)
admin.site.register(ReviewBlog)
admin.site.register(ShippingAddress)
admin.site.register(OrderItemAgric)
admin.site.register(OrderItemNatural)
admin.site.register(OrderItemInformation)
admin.site.register(Order)