from django.db import models

# Create your models here.
class Author(models.Model):
    name = models.CharField(max_length=50)
    birth = models.DateField()

    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=100)
    pages = models.SmallIntegerField()

    author = models.ForeignKey(Author, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
