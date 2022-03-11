from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.utils.decorators import method_decorator

from django.views.decorators.cache import cache_page

from books.serializers import BookSerializer, AuthorSerializer
from .models import Book, Author

CACHE_TIME = 1

# Create your views here.
class AuthorsApiView(APIView):
    @method_decorator(cache_page(CACHE_TIME))
    def get(self, request, *args, **kwargs):
        authors = Author.objects.all()
        serialized_authors = AuthorSerializer(authors, many=True)

        return Response(serialized_authors.data)

    def post(self, request, *args, **kwargs):
        data = {
            'name': request.data.get('name'),
            'birth': request.data.get('birth'),
        }

        serializer = AuthorSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AuthorsApiViewDetail(APIView):
    @method_decorator(cache_page(CACHE_TIME))
    def get(self, request, id, *args, **kwargs):
        authors = Author.objects.get(id=id)
        serialized_authors = AuthorSerializer(authors)

        return Response(serialized_authors.data)

    def put(self, request, id, *args, **kwargs):
        author = Author.objects.get(id=id)
        serializer = AuthorSerializer(author, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, requset, id, *args, **kwargs):
        author = Author.objects.get(id=id)

        author.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class BooksApiView(APIView):
    @method_decorator(cache_page(CACHE_TIME))
    def get(self, request, *args, **kwargs):
        books = Book.objects.all()
        serialized_books = BookSerializer(books, many=True)

        return Response(serialized_books.data)

    def post(self, request, *args, **kwargs):
        data = {
            'title': request.data.get('title'),
            'description': request.data.get('description'),
            'pages': request.data.get('pages'),
            'author': request.data.get('author'),
        }

        serializer = BookSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BooksApiViewDetail(APIView):
    @method_decorator(cache_page(CACHE_TIME))
    def get(self, request, id, *args, **kwargs):
        books = Book.objects.get(id=id)
        serialized_books = BookSerializer(books)

        return Response(serialized_books.data)

    def put(self, request, id, *args, **kwargs):
        author = Book.objects.get(id=id)
        serializer = BookSerializer(author, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, requset, id, *args, **kwargs):
        author = Book.objects.get(id=id)

        author.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
