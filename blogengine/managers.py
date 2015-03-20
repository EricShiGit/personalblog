from django.db.models import Manager
import datetime

class PostManager(Manager):
    def pub_date(self):
        return self.get_query_set()
        
