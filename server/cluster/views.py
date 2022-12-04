from ast import Raise
from curses.ascii import HT
from tokenize import group
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, JSONParser

from django.db.models import Sum

from .serializers import BatchSerializer, AccountSerializer, MembersSerializer, AcoountBalanceSerializer, BudgetSerializer
from .models import Batch, Account, Members, AccountBalance, Budget

from wallet.serializers import UserSerializer
from wallet.models import User, Wallet

class GroupDetail(APIView):
    def get_group(self, pk):
        try:
            return Batch.objects.get(pk=pk)
        except Batch.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        group = self.get_group(pk)
        serialiazer = BatchSerializer(group)
        return Response(serialiazer.data)


class CreateGroup(APIView):
    parser_classes = [MultiPartParser, JSONParser]

    #create a batch
    def post(self, request, format=None):
        serializer = BatchSerializer(data= request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            #create account
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        #add a user
    def put(self, request, pk, format=None):
        batch = self.get_object(pk)
        new_user = request.data['member']
        serializer = BatchSerializer(batch, data=request.data)

        if serializer.is_valid():
            batch.member.add(new_user) #add new member 
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    #remove user
    def patch(self, request, pk, format=None):
        batch = self.get_object(pk)
        new_user = request.data['member']
        serializer = BatchSerializer(batch, data=request.data)

        if serializer.is_valid():
            batch.member.remove(new_user) #add new member 
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    #delete cluster
    def delete(self, request, pk, format=None):
        batch = self.get_object(pk)
        batch.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class BatchView(APIView):
    parser_classes = [MultiPartParser, JSONParser]

    def get_object(self, pk):
        try:
            return Batch.objects.get(pk=pk)
        except Batch.DoesNotExist:
            raise Http404


    #get all members
    def get(self, request, user, format=None):
        members = Batch.objects.filter(members__member=user)
        serializer = BatchSerializer(members, many=True)
        return Response(serializer.data)


class PublicMembers(APIView):

    def get(self, request, user, format=None):
        members = Batch.objects.exclude(members__member=user)
        serializer = BatchSerializer(members, many=True)
        return Response(serializer.data)


class BudgetView(APIView):
    parser_classes = [MultiPartParser, JSONParser]
    
    def post(self, request, format=None):
        serializer = BudgetSerializer(data= request.data)

        if serializer.is_valid():
            serializer.save()
            #create account
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)

    
    def get(self, request, format=None):
        budget = Budget.objects.all()
        serializer = BudgetSerializer(budget, many=True)
        return Response(serializer.data)


class BudgetDetail(APIView):

    def get_budget(self, pk):
        try:
            return Budget.objects.filter(group=pk)
        except :
            raise Http404

    def get(self, request, pk, format=None):
        budgets = self.get_budget(pk)
        serializer = BudgetSerializer(budgets, many=True)
        return Response(serializer.data)


class GetBudget(APIView):

    def get_budget(self, group, budget):
        try:
            return Budget.objects.filter(group=group).get(budget=budget)
        except :
            raise Http404

    def get(self, request, group, budget, format=None):
        budget = self.get_budget(group, budget)
        serializer = BudgetSerializer(budget)
        return Response(serializer.data)


class LastBudget(APIView):

    def get(self, request, pk, format=None):
        budget = Budget.objects.filter(group=pk).reverse()[0]
        serializer = BudgetSerializer(budget)
        return Response(serializer.data)


class AccountBalanceView(APIView):
    
    def get_object(self, pk):
        try:
            return AccountBalance.objects.get(group=pk)
        except AccountBalance.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        wallet = self.get_object(pk)
        serializer = AcoountBalanceSerializer(wallet)
        return Response(serializer.data)


    
class AccountCreate(APIView):
    parser_classes = [MultiPartParser, JSONParser]



    # create accounts
    def post(self, request, format=None):
        serializer = AccountSerializer(data= request.data)
        print(serializer)

        amount = request.data['amount']
        member = request.data['member']
        # user = self.get_member(member)

        # error_response = {"message": "not a member"}
        # if user == False:
        #     return Response( error_response, status=status.HTTP_400_BAD_REQUEST)

        wallet = Wallet.objects.get(pk=member)
        balance = wallet.account_total

        if (int(amount)>balance):
            return Response({"message":"balance is not sufficient"},status=status.HTTP_400_BAD_REQUEST)

        
        if serializer.is_valid():
            serializer.save()
            #create account
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response( serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AccountTotal(APIView):
    def get_account(self, group, budget):
        try:
            return Account.objects.filter(group=group).filter(budget=budget).aggregate(Sum('amount'))
        except :
            raise Http404


    def get(self, request, budget, group, format=None):
        accounts = self.get_account(group, budget)
        # serializer = AccountSerializer(accounts, many=True)
        # return Response(serializer.data)
        return Response(accounts)


class IndividualContribution(APIView):

    def get(self, request, group, format=None):
        acc_member = Account.objects.filter(group=group).select_related('member')
        serializer = AccountSerializer(acc_member, many=True)
        return Response(serializer.data)


class AccountDetail(APIView):

    def get_account(self, acc, mem):
        try:
            return Account.objects.filter(account=acc).filter(member=mem).aggregate(Sum('amount'))
        except :
            raise Http404


    def get(self, request, acc, mem, format=None):
        accounts = self.get_account(acc, mem)
        # serializer = AccountSerializer(accounts, many=True)
        # return Response(serializer.data)
        return Response(accounts)


class MembersCreate(APIView):
    parser_classes = [MultiPartParser, JSONParser]

    
    #create a members
    def post(self, request, format=None):
        serializer =MembersSerializer(data= request.data)
        
        if serializer.is_valid():
            serializer.save()
            #create account
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)



class MembersView(APIView):

    def get(self, request, pk, format=None):
        # members = Members.objects.filter(group=pk)
        # serializer = MembersSerializer(members, many=True)

        users = User.objects.filter(members__group=pk)
        serializer = UserSerializer(users, many=True)

        return Response(serializer.data)


class MembersCount(APIView):

    def get(self, request, pk, format=None):
        members = Members.objects.filter(group=pk).count()
        # serializer = MembersSerializer(members)
        return Response(members)