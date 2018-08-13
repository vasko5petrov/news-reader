var defaultCategory = 'sports';
var defaultCountry = 'gb';
var defaultLanguage = 'en';
var languages = ['bg', 'en'];
var countries = [
	{id: 'bg', name: 'Bulgaria'},
	{id: 'us', name: 'United States'},
	{id: 'gb', name: 'Great Britain'},
];
var categories = [
	'business', 
	'entertainment',  
	'general', 
	'health', 
	'music', 
	'science', 
	'sports', 
	'technology'
];

var newsCategoriesEl = document.querySelector('.news-categories');
var countryInputsEl = document.querySelector('#countryInputs');

import {_newsFunctions} from './functions.js';

_newsFunctions.createNavElementsFromArray(categories, 'news-category', newsCategoriesEl);
_newsFunctions.createNavElementsFromArray(countries, 'country', countryInputsEl);

function createEventListeners(type, typeOfEvent, elements) {
  if(type === 'sources') {
	
    elements.forEach(el => {
		el.addEventListener(typeOfEvent, function(e) {
			if(e.target.classList.contains('news-sources')) {
				return false;
			}

			checkedTab(e.target);

			let sourceId = e.target.id;
			_newsFunctions.getArticlesFromSource(sourceId).then(data => {
				_newsFunctions.clearElements('.news-feed');
				_newsFunctions.createArticles(data.articles);
			});
		});
    });
  } else if(type === 'categories') {
    elements.forEach(el => {
		el.addEventListener(typeOfEvent, function(e) {
			
			checkedTab(e.target);

			defaultCategory = e.target.textContent;
			_newsFunctions.getSources(defaultLanguage, defaultCategory).then(data => {
				_newsFunctions.clearElements('.news-sources');
				_newsFunctions.createSources(data.sources);
			});
			_newsFunctions.getArticles(defaultCountry, defaultCategory).then(data => {
				_newsFunctions.clearElements('.news-feed');
				_newsFunctions.createArticles(data.articles);
			});
		});
    });
  } else {
		elements.forEach(el => {
			el.addEventListener(typeOfEvent, function(e) {
				
				checkedTab(e.target);

				defaultCountry = e.target.id;
				defaultLanguage = 'en';
				if(defaultCountry === 'bg') {
					defaultLanguage = 'bg';
				}

				_newsFunctions.getSources(defaultLanguage, defaultCategory).then(data => {
					_newsFunctions.clearElements('.news-sources');
					_newsFunctions.createSources(data.sources);
				});
				_newsFunctions.getArticles(defaultCountry, defaultCategory).then(data => {
					_newsFunctions.clearElements('.news-feed');
					_newsFunctions.createArticles(data.articles);
				});
			});
		});
	}
}

function checkedTab(element) {
	Array.from(element.parentNode.children).forEach(item => {
		item.classList.remove('checked');
	});
	element.classList.add('checked');
}

function preload() {

	var defaultCategoryTab = document.querySelector('.' + defaultCategory);
	var defaultCountryTab = document.querySelector('#' + defaultCountry);
	checkedTab(defaultCategoryTab);
	checkedTab(defaultCountryTab);
	
	_newsFunctions.getSources(defaultLanguage, defaultCategory).then(data => {
		_newsFunctions.clearElements('.news-sources');
		_newsFunctions.createSources(data.sources);
	});
	_newsFunctions.getArticles(defaultCountry, defaultCategory).then(data => {
		// console.log(data);
		_newsFunctions.clearElements('.news-feed');
		_newsFunctions.createArticles(data.articles);
	});
	
	createEventListeners('categories', 'click', document.querySelectorAll('.news-category'));
	createEventListeners('sources', 'click', document.querySelectorAll('.news-sources'));
	createEventListeners('countries', 'click', document.querySelectorAll('.country'));

}

preload();
