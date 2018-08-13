let apiKey = '8ab152ef58164a81ba8c667f2d8cc1de'; //'3bddb1bdbb1948f9b1728a78184a0979';

let _newsFunctions = {}

_newsFunctions.createNavElementsFromArray = (arr, newsClassNames, elParent) => {
    if(newsClassNames == 'country') {
        arr.forEach(current => {
            var el = document.createElement('div');
            el.className = newsClassNames;
            el.setAttribute("id", current.id);
            el.textContent = current.name;
            elParent.appendChild(el);
        });
    } else {
        arr.forEach(current => {
            var el = document.createElement('div');
            el.className = newsClassNames;
            el.classList.add(current);
            el.textContent = current;
            elParent.appendChild(el);
        });
    }
}

_newsFunctions.getData = (url) => {
    return fetch(url).then(response => {
        return response.json();
    }).then(response => {
        if(response.status == 'error') {
            console.log(response.message);

            var errEl = document.createElement('p');
            errEl.textContent = response.message;

            document.body.appendChild(errEl);
        } else {
            return response;
        }
    }).catch(error => {
        console.log(error);
    });
}

_newsFunctions.getSources = (language, category) => {
    var url = `https://newsapi.org/v2/sources?category=${category}&language=${language}&apiKey=${apiKey}`;
  
    return _newsFunctions.getData(url);
}
  
_newsFunctions.getArticles = (country, category) => {
    var url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
  
    return _newsFunctions.getData(url);
}
  
_newsFunctions.getArticlesFromSource = (id) => {
    var url = `https://newsapi.org/v2/top-headlines?sources=${id}&apiKey=${apiKey}`;
  
    return _newsFunctions.getData(url);
}

_newsFunctions.createArticles = (articles) => {
// console.log(articles);
    articles.forEach(article => {
        var el = document.createElement('a');
        el.setAttribute("href", article.url);
        el.setAttribute("target", "_blank");
        el.classList.add('news-feed_article');
        
        var headingEl = document.createElement('h3');
        headingEl.classList.add('news-feed_article-title');
        headingEl.textContent = article.title;
    
        var imgEl = document.createElement('img');
        var imageUrl = '';
        if(!article.urlToImage) {
            imageUrl = 'images/missing-image.png';
        } else {
            imageUrl = article.urlToImage;
        }
        imgEl.setAttribute('src', imageUrl);
        imgEl.classList.add('news-feed_article-img');
    
        var descParaEl = document.createElement('p');
        descParaEl.classList.add('news-feed_article-description');
        descParaEl.innerHTML = article.description;
    
        var smallAuthorEl = document.createElement('small');
        smallAuthorEl.classList.add('news-feed_article-author');
        smallAuthorEl.textContent = article.source.name;
    
        var smallDateEl = document.createElement('small');
        smallDateEl.classList.add('news-feed_article-author');
        smallDateEl.textContent = article.publishedAt;
    
        var testEl = document.createElement('div');
        testEl.style = "text-align: center";
        var breakEl = document.createElement('br');
    
        testEl.appendChild(smallAuthorEl);
        testEl.appendChild(breakEl);
        testEl.appendChild(smallDateEl);
    
        el.appendChild(imgEl);
        el.appendChild(headingEl);
        el.appendChild(descParaEl);
        el.appendChild(testEl);
    
        var newsFeedEl = document.querySelector('.news-feed');
        newsFeedEl.appendChild(el);
    
    });
}
  
_newsFunctions.clearElements = (parentElClassName) => {
    var parentEl = document.querySelector(parentElClassName);
    if(parentEl.firstChild) {
        while(parentEl.firstChild) {
            parentEl.removeChild(parentEl.firstChild);
        }
    }
}
  
_newsFunctions.createSources = (sources) => {
    sources.forEach(source => {
        var sourceEl = document.createElement('div');
        sourceEl.classList.add('news-source');
        sourceEl.textContent = source.name;
        sourceEl.setAttribute('id', source.id);
    
        var sourcesContainerEl = document.querySelector('.news-sources');
        sourcesContainerEl.appendChild(sourceEl);
    });
}

export { _newsFunctions };