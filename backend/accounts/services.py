import re

def get_full_path_of_avatar_url(request, avatar_url):
    if re.match(r'^https?://', avatar_url):
        return avatar_url
    
    if request:
        scheme = request.scheme  # 'httP' or 'https'
        host = request.get_host()
        return f'{scheme}://{host}{avatar_url}'