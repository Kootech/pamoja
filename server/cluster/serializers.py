from dataclasses import fields
from pyexpat import model
from rest_framework import serializers

from .models import Batch, Account, Members, AccountBalance, Budget


class BatchSerializer(serializers.ModelSerializer):

    class Meta:
        model = Batch
        fields = '__all__'


class AcoountBalanceSerializer(serializers.ModelSerializer):

    class Meta:
        model = AccountBalance
        fields = '__all__'


class BudgetSerializer(serializers.ModelSerializer):

    class Meta:
        model = Budget
        fields = '__all__'
        


class AccountSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
        fields = '__all__'


class MembersSerializer(serializers.ModelSerializer):

    class Meta:
        model = Members
        fields = '__all__'