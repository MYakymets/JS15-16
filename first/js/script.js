$(function () {

var bodyPlace = document.getElementsByTagName('body');
var body = bodyPlace[0];
var newsAll = [];
var textToFind = {q: ''};


function createNewsAll(content) {

  var obj = {};
  newsAll = [];
  for(i in content.posts) {
    obj = { title: '', link: '', site: '', text: ''};

    text = content.posts[i].text;
    if(text.length > 350) {
        text = text.substring(0,350) + "...";
      };

    obj.title = content.posts[i].thread.title;
    obj.link = content.posts[i].url;
    obj.site = content.posts[i].thread.site_section;
    obj.text = text;

    newsAll.push(obj);
  };
};

function createPage() {
  var header = document.createElement('header');
  var p_header = document.createElement('p');

  var main = document.createElement('main');
  var quessLine = document.createElement('div');
  var newsLine = document.createElement('div');
  var navLine = document.createElement('div');
  var footer = document.createElement('footer');

  var inputLineBlock = document.createElement('div');
  var form = document.createElement('form');
  var input = document.createElement('input');
  var button = document.createElement('button');
  var clearButton = document.createElement('button');

  quessLine.setAttribute('id', 'quessLine');
  newsLine.setAttribute('id', 'newsLine');
  navLine.setAttribute('id', 'navLine');

  inputLineBlock.setAttribute('id', 'input_line_block');
  form.setAttribute('id', 'main_form');
  input.setAttribute('type', 'text');
  input.setAttribute('id', 'main_input');
  input.setAttribute('placeholder', 'find in the internet');
  button.setAttribute('id', 'find_button');
  button.setAttribute('type', 'submit');
  button.innerHTML = 'find';
  clearButton.setAttribute('id', 'clear_button');
  clearButton.innerHTML = 'clear';

  p_header.innerHTML = 'Webhose.io - Service';

  header.appendChild(p_header);

  form.appendChild(input);
  form.appendChild(button);
  inputLineBlock.appendChild(form);
  inputLineBlock.appendChild(clearButton);
  quessLine.appendChild(inputLineBlock);

  main.appendChild(quessLine);
  main.appendChild(newsLine);
  main.appendChild(navLine);

  body.appendChild(header);
  body.appendChild(main);
  body.appendChild(footer);

  form.onsubmit = function(e) {
    e.preventDefault();
      textToFind.q = document.getElementById('main_input').value;
      searchItems(textToFind);
    };
    clearButton.addEventListener('click', function () {
      document.getElementById('main_input').value = '';
      console.log('clearButton = ', clearButton);
  });
};

function makeNewsBlock(objBlock, i) {
    var block = document.createElement('div');
    block.id = 'block_' + i;
    block.classList.add('news_block');

    var h3 = document.createElement('h3');
    var a = document.createElement('a');
    a.setAttribute('href', objBlock.link);
    a.setAttribute('target', '_blank');
    a.innerHTML = objBlock.title;
    h3.appendChild(a);

    textLine = document.createElement('div');

    pSite = document.createElement('p');
    pSite.classList.add('news_site');
    pSite.innerHTML = objBlock.site;

    pText = document.createElement('p');
    pText.classList.add('news_content');
    pText.innerHTML = objBlock.text;

    textLine.appendChild(pSite);
    textLine.appendChild(pText);

    block.appendChild(h3);
    block.appendChild(textLine);

    return block;
};


function createNavigation(num, totalItem) {

  var existNavLineDiv = document.getElementById('navLine_navigation');
  if (existNavLineDiv != null) {
    document.getElementById('navLine').removeChild(existNavLineDiv);
  };

  if (totalItem < 10) return;

  navLineDiv = document.createElement('div');
  navLineDiv.classList.add('navLine_navigation');
  navLineDiv.setAttribute('id', 'navLine_navigation');

  for ( pos = 1; pos <= num; pos++ ) {
    var nav_link = document.createElement('p');
    nav_link.classList.add('p_navigation');
    nav_link.addEventListener('click', callCreateNewList);
    nav_link.innerHTML = pos;
    navLineDiv.appendChild(nav_link);
  };

  document.getElementById('navLine').appendChild(navLineDiv);
};

function callCreateNewList () {
  var callPage = this.innerHTML;
  +callPage;
  createNewList(callPage, 0);
};

function createNewList(page, limitation) {
  var endNews = page*10 - 1;
  var startNews = endNews - 9;
    console.log('limitation = ', limitation);
    if (limitation != 0) {
        endNews = limitation - 1;
    }
    console.log('endNews = ', endNews);
    console.log('startNews = ', startNews);
  removeBlock = document.getElementById('blockList');
  if ( removeBlock != null ) {document.getElementById('newsLine').removeChild(removeBlock)};

  var blockList = document.createElement('div');
  blockList.setAttribute('id', 'blockList');
  for ( i = startNews; i <= endNews; i++ ) {
    var newBlock = makeNewsBlock(newsAll[i], i);
    blockList.appendChild(newBlock);
  };
  document.getElementById('newsLine').appendChild(blockList);
};

function searchItems(whatToFind) {
  $.ajax({
  url: 'https://webhose.io/search?token=feaaaa44-9058-42fb-ae2d-7048056d5906&format=json',
  data: whatToFind,
  success:
    function (data, status, jqXHR) {
      var devResRem = 0;
      var devResInt = 0;
      var totalResults = 0;
            console.log('status request = ', status);
        createNewsAll(data);

        totalResults = data.totalResults;
            if (totalResults < 10) {
                createNewList(1, totalResults - 1);
            } else {
                createNewList(1, 0);
            }
        if (totalResults < 100) {
        devResRem = totalResults % 10;
        devResInt = (totalResults - devResRem) / 10;}
        else {
          devResInt = 10;
        };
            createNavigation(devResInt, totalResults);
            data = {};
    },
  error:
    function () {
      console.log('error: ', []);
    }
  });
};


try {

  createPage();

}

catch (e) {

  console.log('Error = ', e);

}

});
