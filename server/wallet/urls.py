from django.urls import path
from .views import UserList, WalletDetail, DepositDetail, WithdrawDetail, SendDetail, SendToCluster, UserDetail, UserDetailByUsername

urlpatterns = [ 
    path('user/<str:pk>/', UserDetail.as_view() ),
    path('username/<str:pk>/', UserDetailByUsername.as_view()),
    path('users/', UserList.as_view() ),

    path('wallet/<str:pk>/', WalletDetail.as_view() ),
    path('deposit/', DepositDetail.as_view() ),
    path('withdraw/', WithdrawDetail.as_view() ),
    path('send/', SendDetail.as_view() ),
    path('send/group/', SendToCluster.as_view() ),
]