from rest_framework import serializers
from .models import User, Wallet, Deposit, Withdraw, Send


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'email', 'groups']



class WalletSerializer(serializers.ModelSerializer):

    class Meta:
        model = Wallet
        fields = '__all__'

    
class DepositSerializer(serializers.ModelSerializer):

    class Meta:
        model = Deposit
        fields = '__all__'

    
class WithdrawSerializer(serializers.ModelSerializer):

    class Meta:
        model = Withdraw
        fields = '__all__'


class SendSerializer(serializers.ModelSerializer):

    class Meta:
        model = Send
        fields = '__all__'


