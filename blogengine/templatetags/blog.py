from django import template
from blogengine.models import Category, Post
import re
import calendar, datetime
from django.template import Context

register = template.Library()

class CategoriesNode(template.Node):
	def __init__(self, var_name):
		self.var_name = var_name

	def render(self, context):
		categories = Category.objects.all()
		context[self.var_name] = categories
		return ''

@register.tag
def get_blog_categories(parser, token):
    try:
        tag_name, arg = token.contents.split(None, 1)
    except ValueError:
        raise template.TemplateSyntaxError, "%s tag requires arguments" % token.contents.split()[0]
    m = re.search(r'as (\w+)', arg)
    if not m:
        raise template.TemplateSyntaxError, "%s tag had invalid arguments" % tag_name
    var_name = m.groups()[0]
    return CategoriesNode(var_name)

class RecentPosts(template.Node):
    def __init__(self, limit, var_name):
        self.limit = int(limit)
        self.var_name = var_name

    def render(self, context):
        posts = Post.objects.pub_date()[:self.limit]
        if posts and (self.limit == 1):
            context[self.var_name] = posts[0]
        else:
            context[self.var_name] = posts
        return ''

@register.tag
def get_recent_posts(parser, token):
    try:
        tag_name, arg = token.contents.split(None, 1)
    except ValueError:
        raise template.TemplateSyntaxError, "%s tag requires arguments" % token.contents.split()[0]
    m = re.search(r'(.*?) as (\w+)', arg)
    if not m:
        raise template.TemplateSyntaxError, "%s tag had invalid arguments" % tag_name
    limit, var_name = m.groups()
    return RecentPosts(limit, var_name)

class DefineNode(template.Node):
    def __init__(self, name):
        self.name = name

    def render(self, context):

        posts = Post.objects.filter().order_by('-pub_date')
     
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
        context['test'] = list_events
        return ''


@register.tag
def get_archive(parser, token):
    return DefineNode("test")
  

