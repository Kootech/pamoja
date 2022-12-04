from decimal import Decimal
import email
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, JSONParser

from .models import User, Wallet, Deposit, Withdraw, Send
from .serializers import UserSerializer, WalletSerializer, DepositSerializer, WithdrawSerializer, SendSerializer
from cluster.models import Account, Members


class UserDetail(APIView):
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk) 
            # return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)


class UserDetailByUsername(APIView):
    def get_object(self, pk):
        try:
            return User.objects.get(username=pk) 
            # return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)


class UserList(APIView):

    parser_classes = [MultiPartParser]




    def get(self, request, format=None):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class WalletDetail(APIView):

    def get_object(self, pk):
        try:
            return Wallet.objects.get(pk=pk)
        except Wallet.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        wallet = self.get_object(pk)
        serializer = WalletSerializer(wallet)
        return Response(serializer.data)


class DepositDetail(APIView):
    parser_classes = [MultiPartParser, JSONParser]

    def post(self, request, format=None):
        serializer = DepositSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, format=None):
        deposits = Deposit.objects.all()
        serializer = DepositSerializer(deposits, many=True)
        return Response(serializer.data)


class WithdrawDetail(APIView):
    parser_classes = [MultiPartParser]

    def get_object(self, pk):
        try:
            return Wallet.objects.get(pk=pk)
        except Wallet.DoesNotExist:
            raise Http404

    def post(self, request, format=None):
        serializer = WithdrawSerializer(data=request.data)

        wallet = self.get_object(request.data['account'])
        balance = wallet.account_total

        transaction_fee = Decimal(balance) * Decimal(0.1)

        if int(request.data['amount'])+ transaction_fee > balance :
            return Response(status=status.HTTP_400_BAD_REQUEST)


        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, format=None):
        withdraws = Deposit.objects.all()
        serializer = WithdrawSerializer(withdraws, many=True)
        return Response(serializer.data)


class SendDetail(APIView):
    parser_classes = [MultiPartParser, JSONParser]

    def get_object(self, pk):
        try:
            return Wallet.objects.get(pk=pk)
        except Wallet.DoesNotExist:
            raise Http404

    def post(self, request, format=None):
        serializer = SendSerializer(data=request.data)

        account = request.data['account']
        recepient = request.data['to_user']
        total = request.data['amount']

        wallet = self.get_object(account)
        balance = wallet.account_total

        transaction_fee = Decimal(balance) * Decimal(0.1)

        if int(total)+ transaction_fee > balance:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        if serializer.is_valid():
            """add to Recepient account"""
            recepient_account= self.get_object(recepient)
            recepient_account.account_total += Decimal(total)
            recepient_account.save()
            serializer.save()

            """return response to user"""
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class SendToCluster(APIView):
    parser_classes = [MultiPartParser, JSONParser]

    def get_object(self, pk):
        try:
            return Wallet.objects.get(pk=pk)
        except Wallet.DoesNotExist:
            raise Http404

    # def get_account(self, pk):
    #     try:
    #         return Account.objects.get(pk=pk)
    #     except Wallet.DoesNotExist:
    #         raise Http404


    def post(self, request, format=None):
        serializer = SendSerializer(data=request.data)
        # group = request.data['account']
        member = request.data['to_user']
        total = request.data['amount']

        wallet = self.get_object(member)
        balance = wallet.account_total


        if int(total) > balance:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        if serializer.is_valid():
            """add to Recepient account"""
            Account.objects.create(group=1, member= member, amount=total)
            serializer.save()

            """return response to user"""
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)