from django.urls import path

from .views import (BatchView, CreateGroup, AccountCreate, AccountDetail, MembersCreate, MembersView,
 AccountBalanceView, BudgetView, GroupDetail, BudgetDetail, MembersCount, PublicMembers, AccountTotal,
 IndividualContribution, LastBudget, GetBudget)

urlpatterns = [ 
    path('create-group/', CreateGroup.as_view()),
    path('public-members/<int:user>/', PublicMembers.as_view()), # show non member
    path('clusters/<int:user>/', BatchView.as_view()), #can create, view, delete cluster
    path('cluster/<int:pk>/', GroupDetail.as_view()), # can view a cluster
    path('accounts/', AccountCreate.as_view()), #can create, view cluster
    path('member/', MembersCreate.as_view()), #can create cluster members
    path('view-members/<int:pk>/', MembersView.as_view()),
    path('account-balance/<int:pk>/', AccountBalanceView.as_view()), #can view account balance
    path('budget/', BudgetView.as_view()), # can create, view budget
    path('budget-detail/<int:pk>/', BudgetDetail.as_view()),
    path('members-count/<int:pk>/', MembersCount.as_view()), #return number of member in a group
    path('contributed/<int:acc>/<int:mem>/', AccountDetail.as_view()),
    path('budget-total/<int:group>/<int:budget>/', AccountTotal.as_view()),
    path('individual/<int:group>/', IndividualContribution.as_view()),
    path('lastbudget/<int:pk>/', LastBudget.as_view()),
    path('get-budget/<int:group>/<int:budget>/', GetBudget.as_view()), #get single budget
]