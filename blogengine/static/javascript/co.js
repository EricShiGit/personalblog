window.esh=window.esh||{};$.Isotope.prototype._getCenteredMasonryColumns=function(){this.width=this.element.width();var parentWidth=this.element.parent().width();var colW=this.options.masonry&&this.options.masonry.columnWidth||this.$filteredAtoms.outerWidth(true)||parentWidth;var cols=Math.floor(parentWidth/colW);cols=Math.max(cols,1);this.masonry.cols=cols;this.masonry.columnWidth=colW;};$.Isotope.prototype._masonryReset=function(){this.masonry={};this._getCenteredMasonryColumns();var i=this.masonry.cols;this.masonry.colYs=[];while(i--){this.masonry.colYs.push(0);}};$.Isotope.prototype._masonryResizeChanged=function(){var prevColCount=this.masonry.cols;this._getCenteredMasonryColumns();return(this.masonry.cols!==prevColCount);};$.Isotope.prototype._masonryGetContainerSize=function(){var unusedCols=0,i=this.masonry.cols;while(--i){if(this.masonry.colYs[i]!==0){break;}
unusedCols++;}
return{height:Math.max.apply(Math,this.masonry.colYs),width:(this.masonry.cols- unusedCols)*this.masonry.columnWidth};};(function(_){if(_.Site)return;_.Site=new function(){return{html:$('html'),bod:$('body'),w:$(window),portfolioInit:false,navBar:$('#topNav'),sizeLimit:769,init:function(){this.stickHero();this.fixedNav();this.commentValidation();},stickHero:function(){var showcase=$('.hero-showcase');if(!showcase.length||this.w.width()<this.sizeLimit)return;var o=this,navHeight=this.navBar.outerHeight(),$stuck=false,content=$('.hero-showcase + .content');var resizeTimer;$(window).resize(function(){clearTimeout(resizeTimer);resizeTimer=setTimeout(function(){navHeight=o.navBar.outerHeight();},1000);});$(window).scroll(function(){var $pos=$(document).scrollTop();if($pos>=navHeight){showcase.stick();}
if($pos<navHeight){showcase.unstick();}});showcase.stick=function(){if(!$stuck){var showcaseHeight=showcase.outerHeight();content.css('margin-top',showcaseHeight+'px');showcase.addClass('stuck');$stuck=true;}}
showcase.unstick=function(){if($stuck){content.css('margin-top',0);showcase.removeClass('stuck');$stuck=false;}}},fixedNav:function(){if((!this.bod.hasClass('blog')&&!this.bod.hasClass('single-portfolio'))&&!this.bod.hasClass('single'))return;if(this.w.width()<this.sizeLimit)return;var o=this,$document=$(document),$window=$(window),$lastScroll=0,$fixedPoint=500,$hideOffset=10,$stuck=false,$visible=true;$window.scroll(function(){var $pos=$document.scrollTop(),direction=($pos>$lastScroll)?'down':'up',difference=Math.abs($pos- $lastScroll);if($pos>=$fixedPoint){o.navBar.stick();}
if($pos<=0){o.navBar.unstick();}
if($pos+ $window.height()===$document.height()){o.navBar.show();}
if($pos>-1){if(direction==='down'&&difference>=$hideOffset){o.navBar.hide();}
else if(direction==='up'&&difference>=$hideOffset){o.navBar.show();}}else{o.navBar.show();}
$lastScroll=$pos;});o.navBar.stick=function(){if(!$stuck&&!$visible){o.navBar.addClass('stuck');$stuck=true;}}
o.navBar.unstick=function(){if($stuck){o.navBar.removeClass('stuck');$stuck=false;}}
o.navBar.hide=function(){if($visible){o.navBar.removeClass('visible').addClass('hidden');$visible=false;}}
o.navBar.show=function(){if(!$visible){o.navBar.removeClass('hidden').addClass('visible');$visible=true;}}},setPortfolioList:function(){var container=$('#portfolioWrap'),figure=$('.portfolio-item'),sortLinks=$('#sortBy a');if(!container.length)return;;if(this.portfolioInit)return;this.portfolioInit=true;container.isotope({itemSelector:figure,masonry:{columnWidth:320}});figure.show();sortLinks.on('click',function(e){e.preventDefault();el=$(this);selector=el.attr('data-filter');container.isotope({filter:selector});sortLinks.removeClass('selected');el.addClass('selected');});var resizeTimer;$(window).resize(function(){clearTimeout(resizeTimer);resizeTimer=setTimeout(function(){container.isotope('reLayout');},1000);});},commentValidation:function(){if(!this.bod.hasClass('single'))return;if(this.bod.hasClass('single-portfolio'))return;$('#commentform').validate({rules:{author:{required:true,minlength:2},email:{required:true,email:true},url:{url:true},comment:{required:true,minlength:10}},messages:{author:"Come on, please use a real name.",email:"That email isn't valid. Nice try.",url:"Show me where you live, give me a valid URL.",comment:"Minimum 10 characters here."}});}}}})(esh)