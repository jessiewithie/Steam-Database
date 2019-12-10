#!/usr/bin/env python
# coding: utf-8

# In[142]:


import pandas
description = pandas.read_csv('descriptionD.csv')
review_content = pandas.read_csv('review_content.csv')


# In[143]:


description.dtypes


# In[144]:


description[["original_price"]]


# In[145]:


def modifyPrice(x):
    if x.startswith("$"):
        x = x.replace('$','')
        r = float(x)
    else:
        r = 0
    return r


description["original_price"] = description["original_price"].apply(modifyPrice)
description[["original_price"]] 


# In[146]:


description[["original_price"]] = description[["original_price"]].astype(float)


# In[147]:


description[["original_price"]]
description


# In[31]:


description_new = description[['name','url','types','release_date','original_price','game_description','developer','publisher']]


# In[32]:


description_new


# In[33]:


description_new['game_id'] = range(len(description_new))


# In[35]:



description_new = description_new[['game_id','name','url','types','release_date','original_price','game_description','developer','publisher']]
description_new


# In[39]:


csv_headers = ['game_id','name','url','types','release_date','original_price','game_description','developer','publisher']
description_new.to_csv('description24.csv', header=csv_headers, index=False, mode='a+', encoding='utf-8')


# In[40]:


csv_headers = ['game_id','name','original_price']
description_new[['game_id','name','original_price']].to_csv('price24.csv', header=csv_headers, index=False, mode='a+', encoding='utf-8')


# In[38]:


csv_headers = ['game_id','name','release_date']
description_new[['game_id','name','release_date']].to_csv('date24.csv', header=csv_headers, index=False, mode='a+', encoding='utf-8')


# In[54]:


import pandas
genre = pandas.read_csv('genre.csv',header = None)


# In[55]:


genre = genre.rename(columns={0: "name", 1: "genre"})


# In[56]:


genre


# In[53]:


csv_headers = ['name','genre']
genre.to_csv('genre252.csv', header=csv_headers, index=False, mode='a+', encoding='utf-8')


# In[57]:


tag = pandas.read_csv('tag.csv',header = None)


# In[59]:


tag = tag.rename(columns={0: "name", 1: "tag"})


# In[60]:


tag


# In[61]:


csv_headers = ['name','tag']
tag.to_csv('tag25.csv', header=csv_headers, index=False, mode='a+', encoding='utf-8')


# In[104]:


import pandas
newdescription = pandas.read_csv('newdescription.csv')
newdescription


# In[149]:


des = newdescription[['appid','name','url','types','game_description','developer','publisher','original_price','release_date']]
des


# In[150]:


des["developer"] = des["developer"].apply(lambda x:x if len(x) <= 2000 else x[:1997]+"...")
des["publisher"] = des["publisher"].apply(lambda x:x if len(x) <= 2000 else x[:1997]+"...")
des["types"] = des["types"].apply(lambda x:x if len(x) <= 2000 else x[:1997]+"...")
des["game_description"] = des["game_description"].apply(lambda x:x if len(x) <= 2000 else x[:1997]+"...")
des["name"] = des["name"].apply(lambda x:x if len(x) <= 2000 else x[:1997]+"...")
des["url"] = des["url"].apply(lambda x:x if len(x) <= 2000 else x[:1997]+"...")


# In[135]:


review_content["review"] = review_content["review"].apply(lambda x:x if len(x) <= 3900 else x[:3887]+"...")
review_content["title"] = review_content["title"].apply(lambda x:x if len(x) <= 3900 else x[:3887]+"...")


# In[138]:


review_content = review_content.loc[review_content["review"].str.contains(r'[^\x00-\x7F]+') == False]
review_content = review_content.loc[review_content["title"].str.contains(r'[^\x00-\x7F]+') == False]


# In[141]:


review_content


# In[140]:


csv_headers = ['review_id','review','title']
review_content.to_csv('review_content25.csv', header=csv_headers, index=False, mode='a+', encoding='utf-8')


# In[107]:


csv_headers = ['appid','name','url','types','game_description','developer','publisher']
des.to_csv('description252.csv', header=csv_headers, index=False, mode='a+', encoding='utf-8')


# In[108]:


des


# In[109]:


csv_headers = ['appid','name','url','types','game_description','developer','publisher']
des.to_csv('description255.csv', header=csv_headers, index=False, mode='a+', encoding='utf-8')


# In[ ]:


.match(r'(.*[\u4E00-\u9FA5]+)|([\u4E00-\u9FA5]+.*)', content.decode('utf-8')):


# In[92]:


des['name'] = des['name'].apply(lambda row: row.encode('ascii',errors='ignore').decode())


# In[151]:


des_without_Chinses = des.loc[des['name'].str.contains(r'[^\x00-\x7F]+') == False]
des_without_Chinses = des_without_Chinses.loc[des['url'].str.contains('844920') == False]


# In[113]:


csv_headers = ['appid','name','url','types','game_description','developer','publisher']
des.to_csv('description257.csv', header=csv_headers, index=False, mode='a+', encoding='utf-8')


# In[119]:


csv_headers = ['appid','name','url','types','game_description','developer','publisher']
des_without_Chinses = des.loc[des['name'].str.contains(r'[^\x00-\x7F]+') == False].to_csv('description259.csv', header=csv_headers, index=False, mode='a+', encoding='utf-8')


# In[127]:


des_without_Chinses = des_without_Chinses.loc[des['url'].str.contains('844920') == False]


# In[152]:


des_without_Chinses


# In[129]:


csv_headers = ['appid','name','url','types','game_description','developer','publisher']
des_without_Chinses.to_csv('des_without_Chinses.csv', header=csv_headers, index=False, mode='a+', encoding='utf-8')


# In[153]:


csv_headers = ['appid','name','original_price']
des_without_Chinses[['appid','name','original_price']].to_csv('price25.csv', header=csv_headers, index=False, mode='a+', encoding='utf-8')


# In[154]:


des_without_Chinses[['appid','name','original_price']]


# In[155]:


csv_headers = ['appid','name','release_date']
des_without_Chinses[['appid','name','release_date']].to_csv('release_date25.csv', header=csv_headers, index=False, mode='a+', encoding='utf-8')


# In[156]:


des_without_Chinses[['appid','name','release_date']]


# In[ ]:




