from django.contrib import admin

from .models import Batch, Account, AccountBalance, Budget, Members

admin.site.register(Batch)
admin.site.register(Account)
admin.site.register(AccountBalance)
admin.site.register(Budget)
admin.site.register(Members)
