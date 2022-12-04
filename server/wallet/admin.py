from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Wallet, Withdraw, Deposit, Send

admin.site.register(User, UserAdmin)
admin.site.register(Wallet)
admin.site.register(Withdraw)
admin.site.register(Deposit)
admin.site.register(Send)