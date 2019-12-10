#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas
games = pandas.read_csv('steam_games.csv')


# In[2]:


reviews = pandas.read_csv('steam_reviews.csv')


# In[3]:


games


# In[4]:


reviews


# In[5]:


len(games)


# In[6]:


len(reviews.columns)


# In[7]:


games_need = games[['url','types','name','desc_snippet','release_date','languages','genre','popular_tags','original_price','developer','publisher','game_description','game_details']]
games_need


# In[8]:


games_drop = games_need.dropna()
games_drop


# In[9]:


reviews_need = reviews[['date_posted','funny','helpful','hour_played','recommendation','review','title']]
reviews_drop = reviews_need.dropna()
reviews_drop


# In[10]:


reviews_drop['review_id'] = range(len(reviews_drop))


# In[11]:


reviews_drop = reviews_drop[['review_id','date_posted','funny','helpful','hour_played','recommendation','review','title']]
reviews_drop


# In[92]:


csv_headers = ['review_id','date_posted','funny','helpful','hour_played','recommendation','review','title']
reviews_drop.to_csv('reviews_need_full.csv', header=csv_headers, index=False, mode='a+', encoding='utf-8')


# In[86]:


csv_headers = ['url','types','name','desc_snippet','release_date','languages','genre','popular_tags','original_price','developer','publisher','game_description','game_details']

games_drop.to_csv('games_need_full.csv', header=csv_headers, index=False, mode='a+', encoding='utf-8')


# In[93]:


games1 = pandas.read_csv('games_need_full.csv')
reviews1 = pandas.read_csv('reviews_need_full.csv')


# In[106]:


price_dataset = games_drop[['name','original_price','desc_snippet']]
csv_headers = ['name','original_price','desc_snippet']
price_dataset.to_csv('price_dataset.csv', header=csv_headers, index=False, mode='a+', encoding='utf-8')


# In[108]:


description_dataset = games_drop[['name','url','types','release_date','languages','genre','game_details','popular_tags','original_price','game_description','developer','publisher']]
csv_headers = ['name','url','types','release_date','languages','genre','game_details','popular_tags','original_price','game_description','developer','publisher']
description_dataset.to_csv('description_dataset.csv', header=csv_headers, index=False, mode='a+', encoding='utf-8')


# In[110]:


review_content = reviews_drop[['review_id','review','title']]
csv_headers = ['review_id','review','title']
review_content.to_csv('review_content.csv', header=csv_headers, index=False, mode='a+', encoding='utf-8')

reviews_criteria = reviews_drop[['review_id','date_posted','funny','helpful','hour_played','recommendation','title']]
csv_headers = ['review_id','date_posted','funny','helpful','hour_played','recommendation','title']
reviews_criteria.to_csv('reviews_criteria.csv', header=csv_headers, index=False, mode='a+', encoding='utf-8')


# In[ ]:




