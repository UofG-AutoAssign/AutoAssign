import yake
import pandas as pd
# Reading excel Files
df=pd.read_csv('TestData.csv',encoding='ISO-8859-1')
# Gets the column to extract
full_text_list=df['Looking']
# Initialization result
result=[]
# Extract key
for full_text in full_text_list:
   # Replace newline characters with Spaces
   full_text=full_text.replace('\n',' ')
   # Extracting keywords
   kw_extractor = yake.KeywordExtractor(n=5)
   keyword_list = kw_extractor.extract_keywords(full_text)
   keyword=keyword_list[0][0]
   # Add the key words to the result
   result.append(keyword)
df['keyword']=result
# Saving the file
df.to_csv('result.csv',header=None)


