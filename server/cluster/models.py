from decimal import Decimal
from django.db import models

from wallet.models import User, Wallet

from django.db.models.signals import post_save
from django.dispatch import receiver

class Batch(models.Model):
    group_type = models.CharField(max_length=255, default='simple_group')
    name = models.CharField(max_length=255, unique=True)
    max_members = models.IntegerField(default=10)
    description = models.TextField()
    verified = models.BooleanField(default=False)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="batch")


    def __str__(self) -> str:
        return self.name


class Account(models.Model):
    group = models.ForeignKey('Batch', on_delete=models.CASCADE, null=True)
    user_wallet = models.ForeignKey(Wallet, null=False, on_delete=models.CASCADE)
    member = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    contribution_day = models.DateTimeField(auto_now_add=True)
    budget = models.ForeignKey('Budget', on_delete=models.CASCADE, null=True)
    account = models.ForeignKey('AccountBalance', on_delete=models.CASCADE, null=True)


class AccountBalance(models.Model):
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    group = models.OneToOneField('Batch', on_delete=models.CASCADE)


class Budget(models.Model):
    group = models.ForeignKey('Batch', on_delete=models.CASCADE)
    name = models.CharField(max_length=250)
    target = models.DecimalField(max_digits=12, decimal_places=2)
    user_target = models.DecimalField(max_digits=12, decimal_places=2, null=True)
    created = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Members(models.Model):
    group = models.ForeignKey(Batch, on_delete=models.CASCADE)
    member = models.ForeignKey(User, on_delete=models.CASCADE, related_name="members")
    joined = models.DateTimeField(auto_now_add=True)
    is_admin = models.BooleanField(default=False)


@receiver(post_save, sender=Account, dispatch_uid="update_account_balance_on_deposit")
def update_account_balance(sender, instance, created, **kwargs):
    instance.account.balance += instance.amount
    instance.account.save()

# method updates wallet on deposit to cluster accounts
@receiver(post_save, sender=Account, dispatch_uid="update_wallet_on_deposit")
def update_withdraw(sender, instance, created, **kwargs):
    transaction_fee = instance.amount * Decimal(0.1)
    instance.user_wallet.account_total -= (instance.amount + transaction_fee)
    instance.user_wallet.save()

# function automatically creates wallet when group is created
@receiver(post_save, sender=Batch, dispatch_uid="create_members_table")
def create_members(sender, instance,created, **kwargs):
    if created:
        Members.objects.create(group=instance, member=instance.created_by)


@receiver(post_save, sender=Batch, dispatch_uid="create_account_balance")
def create_account_balance(sender, instance,created, **kwargs):
    if created:
        AccountBalance.objects.create(group=instance)