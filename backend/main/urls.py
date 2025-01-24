from django.urls import path
from .views import OwnerAppointmentsView,OneAppointmentView,signUp,signOut,logIn,getCsurf,CompanionsView,OneCompanionView,WalkerAppointmentsView,WalkersView,OneWalkerView,getUser,AllAppointmentsView
urlpatterns = [
    path('getcsrf/',getCsurf,name='get_csrf'),
    path('session/',getUser,name='session'),
    path('signup/',signUp,name='signup'),
    path('login/',logIn,name='login'),
    path('signout/',signOut,name='signout'),
    path('companions/',CompanionsView.as_view(),name='companions'),
    path('companions/<int:id>/',OneCompanionView.as_view()),
    path('owner/appointments/',OwnerAppointmentsView.as_view(),name='owner_appointments'),
    path('walker/appointments/',WalkerAppointmentsView.as_view(),name='walker_appointments'),
    path('appointments/<int:id>/',OneAppointmentView.as_view(),name='one_appointment'),
    path('appointments/',AllAppointmentsView.as_view(),name='all_appointments'),
    path('walkers/',WalkersView.as_view(),name='walkers'),
    path('walkers/<int:id>',OneWalkerView.as_view(),name='walker')
]
