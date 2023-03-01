import json
import re
import requests
from lxml import etree
import csv

url_lis = []
header = ['Job', 'Business Area', 'Area of Expertise', 'Looking', "Skills"]

def get_page():
    url = f'https://search.jobs.barclays/search-jobs/results?ActiveFacetID=0&CurrentPage=''&RecordsPerPage=500&Distance=50&RadiusUnitType=0&Keywords=&Location=&ShowRadius=False&IsPagination=False&CustomFacetName=&FacetTerm=&FacetType=0&SearchResultsModuleName=Refresh+-+Search+Results&SearchFiltersModuleName=Refresh+-+Search+Filter&SortCriteria=0&SortDirection=0&SearchType=5&PostalCode=&fc=&fl=&fcf=&afc=&afl=&afcf='
    headers = {
        'Host': 'search.jobs.barclays',
        'Connection': 'keep-alive',
        'Accept': '*/*',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': 'Mozilla/5.0(WindowsNT10.0;WOW64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/86.0.4240.198Safari/537.36',
        'Content-Type': 'application/json;charset=utf-8',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'Referer': 'https://search.jobs.barclays/search-jobs',
        'Accept-Encoding': 'gzip,deflate,br',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        #'Cookie': ,

    }
    resp = requests.get(url, headers=headers)
    resp_j = resp.json()['results']
    tree = etree.HTML(resp_j)
    li = tree.xpath('//ul[@class="search-results--list grid-columns search-results--grid"]//li/a/@href')
    domain = 'https://search.jobs.barclays/'
    for i in li:
        url_lis.append(domain + i)


def get_content(oo):
    skill_List = []
    looking_list = []
    headers = {
        'accept': '*/*',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        # 'Cookie':
        'Referer': 'https://search.jobs.barclays/job/delhi/process-advisor/13015/42939513616',
        'User-Agent': 'Mozilla/5.0(WindowsNT10.0;WOW64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/86.0.4240.198Safari/537.36',
    }
    resp = requests.get(oo, headers=headers)
    tree = etree.HTML(resp.text)
    try:
        Expertise = tree.xpath('//section[@data-selector-name="jobdetails"]/div//p[3]/span[@class="strong"]/text()')
        looking = tree.xpath('//script[@type="application/ld+json"]/text()')[0]
        looking = str(looking)
        c = json.loads(looking)
        industry = c['industry']
        title = c['title']
        c3 = c['description']
        lok = re.compile(r".*?looking.*?<span style='font-size(.*?)</span></p>  <p style='font-family", re.S)
        lok_t = ''.join(re.findall(lok, c3)).split('<br />')
        for i in lok_t:
            jk = i.split(';')
            if jk[0] == ' ':
                break
            if jk[-1] == "":
                looking_list.append(jk[-2].strip())
            else:
                looking_list.append(jk[-1].strip())
        fin_lok = '\n'.join(looking_list)
        st = re.compile(r".*?<strong>Skills.*?<span style='font-size(.*?)</span></p>  <p style='font-family", re.S)
        skill = ''.join(re.findall(st, c3)).split('<br />')
        for i in skill:
            ju = i.split(';')
            if ju[0] == ' ':
                break
            if ju[-1] == "":
                skill_List.append(ju[-2].strip())
            else:
                skill_List.append(ju[-1].strip())
        fin_skill = '\n'.join(skill_List)
        con_list = [[title, industry, Expertise[0], fin_lok, fin_skill]]
        with open('./info3.csv', 'a', encoding='utf-8', newline='') as f:
            write1 = csv.writer(f)
            write1.writerows(con_list)
            print('over')
    except:
        return 0


if __name__ == '__main__':
    get_page()
    print(url_lis)
    for i in range(len(url_lis)):
        get_content(url_lis[i])
