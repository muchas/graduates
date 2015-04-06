from haystack import indexes
from models import Person


class PersonIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, model_attr='full_name')
    id = indexes.IntegerField(model_attr='id')
    first_name = indexes.CharField(model_attr='first_name')
    last_name = indexes.CharField(model_attr='last_name')
    married_name = indexes.CharField(model_attr='married_name')
    picture = indexes.CharField(model_attr='picture')
    content_auto = indexes.EdgeNgramField(model_attr='full_name')

    def get_model(self):
        return Person