from django.shortcuts import render
from django.views.generic import ListView
from blogengine.models import Category, Post, Tag
from django.contrib.syndication.views import Feed
from django.template.loader import get_template
from django.template import Context, loader
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
import calendar, datetime
# Create your views here.


def home(request):
    name = "Eric"
    t = get_template('blogengine/home.html')
    html = t.render(Context({'name': name}))
    return HttpResponse(html)

def about(request):
    page = "About"
    t = get_template('blogengine/about.html')
    html = t.render(Context ({'About': page}))
    return HttpResponse(html)

def work(request):
    page = "Work"
    t = get_template('blogengine/work.html')
    html = t.render(Context ( {'Work' : page}))
    return HttpResponse(html)

def projects(request):
    page = "Project"
    t = get_template('blogengine/projects.html')
    html = t.render(Context ( {'Project' : page}))
    return HttpResponse(html)

def contact(request):
    page = "contact"
    t = get_template('blogengine/contact.html')
    html = t.render(Context ( {'contact' : page}))
    return HttpResponse(html)

def portfolio(request):
    page = "portfolio"
    t = get_template('blogengine/portfolio.html')
    html = t.render(Context ( {'portfolio' : page}))
    return HttpResponse(html)

def weef(request):
    page = "weef"
    t = get_template('blogengine/weef.html')
    html = t.render(Context ( {'weef' : page}))
    return HttpResponse(html)

def category_list(request):
    return list_details.object_list(
        request,
        queryset = Category.objects.all(),
    )



def events_index(request):
    '''a basic events listing view'''
    posts = Post.objects.filter().order_by('-pub_date')
    now = datetime.datetime.now()
 
    #create a dict with the years and months:events 
    event_dict = {}
    for i in range(posts[0].pub_date.year, posts[len(posts)-1].pub_date.year-1, -1):
        event_dict[i] = {}
        for month in range(1,13):
            event_dict[i][month] = []
    for event in posts:
        event_dict[event.pub_date.year][event.pub_date.month].append(event)
 
    #this is necessary for the years to be sorted
    event_sorted_keys = list(reversed(sorted(event_dict.keys())))
    list_events = []
    for key in event_sorted_keys:
        adict = {key:event_dict[key]}
        list_events.append(adict)
 
    t = loader.get_template('blogengine/archive.html')
    c = Context({
       'now': now,'list_events':list_events,
    })
    return HttpResponse(t.render(c))

class CategoryListView(ListView):
    def get_queryset(self):
        slug = self.kwargs['slug']
        try:
            category = Category.objects.get(slug=slug)
            return Post.objects.filter(category=category)
        except Category.DoesNotExist:
            return Post.objects.none()


class TagListView(ListView):
    def get_queryset(self):
        slug = self.kwargs['slug']
        try:
            tag = Tag.objects.get(slug=slug)
            return tag.post_set.all()
        except Tag.DoesNotExist:
            return Post.objects.none()
            
class PostsFeed(Feed):
    title = "RSS feed - posts"
    link = "feeds/posts/"
    description = "RSS feed - blog posts"

    def items(self):
        return Post.objects.order_by('-pub_date')

    def item_title(self, item):
        return item.title

    def item_description(self, item):
        return item.text

