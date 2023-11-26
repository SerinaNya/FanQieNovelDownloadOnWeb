import re
import json
from urllib.parse import parse_qs, urlparse
import requests
from bs4 import BeautifulSoup
import tools


class FanqieNovel:
    """
    番茄小说对象，用于获取小说的基本信息和目录
    通过"FanqieNovel()"传入 url（小说目录链接）、mode（下载方式）
    """
    ua = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 "
          "Safari/537.36 Edg/119.0.0.0")
    headers = {
        "User-Agent": ua
    }

    def __init__(self, url, mode):
        self.book_id = None
        self.url = url
        self.mode = mode
        self.parse_url(self.url)
        response = requests.get(url=f"https://fanqienovel.com/page/{self.book_id}",
                                headers=self.headers)
        self.html = response.text

        # obid: only-book-id 唯一小说识别码
        self.obid = f'{self.book_id}-{self.mode}'

        self.soup = BeautifulSoup(self.html, "html.parser")

        # 获取小说标题
        self.title = self.soup.find("h1").get_text()
        self.title = tools.rename(self.title)

        # 获取小说简介
        self.intro = self.soup.find("div", class_="page-abstract-content").get_text()

        # 获取小说作者
        self.author_name = self.soup.find('span', class_='author-name-text').get_text()

        # 找到type="application/ld+json"的<script>标签
        script_tag = self.soup.find('script', type='application/ld+json')

        # 提取每个<script>标签中的JSON数据
        json_data = json.loads(script_tag.string)
        images_data = json_data.get('image', [])
        # 打印提取出的images数据
        self.img_url = images_data[0]

    def __str__(self):
        return (f'FanqieNovel: {self.title}\n'
                f'author: {self.author_name}')

    def parse_url(self, url: str) -> str:
        u = urlparse(url)

        match u.netloc:  # 根据域名匹配
            case "fanqienovel.com":  # Web 端
                if u.path.startswith("/page/"):  # 书本详情页面
                    match = re.search(r'/page/(\d+)', url)
                    self.book_id = match.group(1)

            case "changdunovel.com":  # App 分享链接
                self.book_id = parse_qs(urlparse(url).query).get("book_id")[0]
