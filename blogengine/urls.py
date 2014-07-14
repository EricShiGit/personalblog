from django.conf.urls import patterns, url
from django.views.generic import ListView, DetailView
from blogengine.models import Post, Category, Tag
from blogengine.views import CategoryListView, TagListView, PostsFeed

urlpatterns = patterns('',

    #Home Page
    url('^$','blogengine.views.home'),

    #About

    url('^about/$', 'blogengine.views.about'),

    # Index
    url(r'^blog/(?P<page>\d+)?/?$', ListView.as_view(
        model=Post,
        paginate_by=5,
        )),

    # Individual posts
    url(r'^blog/(?P<pub_date__year>\d{4})/(?P<pub_date__month>\d{1,2})/(?P<slug>[a-zA-Z0-9-]+)/?$', DetailView.as_view(
        model=Post,
        )),

    # Categories
    url(r'^blog/category/(?P<slug>[a-zA-Z0-9-]+)/?$', CategoryListView.as_view(
        paginate_by=5,
        model=Category,
        )),

    # Tags
    url(r'^blog/tag/(?P<slug>[a-zA-Z0-9-]+)/?$', TagListView.as_view(
        paginate_by=5,
        model=Tag,
        )),
    
	# Post RSS feed
	url(r'^blog/feeds/posts/$', PostsFeed()),
)