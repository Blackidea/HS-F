<script>
$(document).ready(function(){
   
    $('input[name="form_hidden_43"]').val(document.title + " "+window.location.href);
    var pagesLinks = $('.js-pager-wrepper').find('a');
    console.log(pagesLinks);
    var loading = $('.loading-gif');
    var more = $('.js-more-news');
    var container = $('.news_list');
    console.log(window.location.search);
    more.on('click', function(event){
        event.preventDefault();
        $(loading).show('slow');
        console.log("кол-во страниц: "+getPagesCount());
        console.log("текущая страница: "+getCurPageCount());
        console.log("следующая страница: "+genUrl());
        url = '/planeta-holiday/news/'+genUrl();
        console.log(url);
        
        $.ajax({                                                                   
           url: url,                                   
             data: '',
        	 success: function(data) {                                                      
                console.log($(data).find('.news_list'));
                $(container).append($(data).find('.news_list').contents());
                pagesCounterPlus();
                checkMoreAvailible();
                $(loading).hide('slow');
        	  }
          });
    })
})
function checkMoreAvailible(){
    if(parseInt($('input[name="pageCur"]').val())>= parseInt($('input[name="pageCount"]').val())){
        $('.js-more-news').hide();
    }
    else{
        console.log('еще есть страницы');
    }
}
function pagesCounterPlus(){
    $('input[name="pageCur"]').val(parseInt($('input[name="pageCur"]').val())+1);
}
function getPagesCount(){
    return $('input[name="pageCount"]').val();
}
function getCurPageCount(){
    return $('input[name="pageCur"]').val();
}
function getNextPage(){
     return parseInt(getCurPageCount())+1;
}
function genUrl(){
    url = "?PAGEN_1="+getNextPage();
    return url;
}
</script>