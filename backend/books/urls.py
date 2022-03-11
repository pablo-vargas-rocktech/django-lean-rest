from django.urls import path
from .views import AuthorsApiView, BooksApiView, AuthorsApiViewDetail, BooksApiViewDetail

urlpatterns = [
    path('books/', BooksApiView.as_view()),
    path('books/<int:id>/', BooksApiViewDetail.as_view()),
    path('authors/', AuthorsApiView.as_view()),
    path('authors/<int:id>/', AuthorsApiViewDetail.as_view()),
]
