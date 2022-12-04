from decimal import Decimal
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass


class Wallet(models.Model):
    user = models.OneToOneField('User', on_delete=models.CASCADE, related_name='wallet')
    account_total = models.DecimalField(decimal_places=2, max_digits=10, default=0.00)
    account_name = models.CharField(max_length=200, default='Personal')


    def __str__(self) -> str:
        return self.user


class Withdraw(models.Model):
    account = models.ForeignKey('Wallet', on_delete=models.CASCADE, related_name='withdraw')
    amount = models.DecimalField(decimal_places=2, max_digits=10)

    # def __str__(self) -> str:
    #     return self.account

class Deposit(models.Model):
    account = models.ForeignKey('Wallet', on_delete=models.CASCADE, related_name='deposit')
    amount = models.DecimalField(decimal_places=2, max_digits=10)

    # def __str__(self) -> str:
    #     return self.account


class Send(models.Model):
    account = models.ForeignKey('Wallet', on_delete=models.CASCADE, related_name='send')
    amount = models.DecimalField(decimal_places=2, max_digits=10)
    to_user = models.ForeignKey('User', on_delete=models.CASCADE)


    # def __str__(self) -> str:
    #     return self.amount



    
@receiver(post_save, sender=User, dispatch_uid="create_wallet_table")
def create_wallet(sender, instance,created, **kwargs):
    if created:
        Wallet.objects.create(user=instance)

@receiver(post_save, sender=Deposit, dispatch_uid="update_wallet_on_deposit")
def update_deposit(sender, instance, created, **kwargs):
    instance.account.account_total += instance.amount
    instance.account.save()

@receiver(post_save, sender=Withdraw, dispatch_uid="update_wallet_on_withdraw")
def update_withdraw(sender, instance, created, **kwargs):
    transaction_fee = instance.amount * Decimal(0.1)
    instance.account.account_total -= (instance.amount + transaction_fee)
    instance.account.save()


@receiver(post_save, sender=Send, dispatch_uid="update_sender_wallet")
def update_send(sender, instance, created, **kwargs):
    transaction_fee = instance.amount * Decimal(0.1)
    instance.account.account_total -= (instance.amount + transaction_fee)
    instance.account.save()
