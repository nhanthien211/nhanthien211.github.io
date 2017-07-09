var PageTransitions = (function ($, options) {
    "use strict";
    var defaultStartPage = "home",
        sectionsContainer = $(".subpages"),
        isAnimating = false,
        endCurrentPage = true,
        endNextPage = false,
        animEndEventNames = {
            'WebkitAnimation': 'webkitAnimationEnd',
            'OAnimation': 'oAnimationEnd',
            'msAnimation': 'MSAnimationEnd',
            'animation': 'animationend'
        },

        // animation end event name
        animEndEventName = animEndEventNames[Modernizr.prefixed('animation')],

        // support css animations
        support = Modernizr.cssanimations;

    function init(options) {

        //get all the .pt-page section
        $('.pt-page').each(function () {
            var $page = $(this);
            //attach data to selected obj
            //.data(name, value) 
            //name: name of data to set
            //value: value of data to set 
            $page.data('originalClassList', $page.attr('class'));
        });
        //get all the .pt-page section


        //get .wrapper which is the parent for all pt-page div
        sectionsContainer.each(function () {
            if (location.hash === "") {
                $('section[data-id=' + pageStart + ']').addClass('pt-page-current');
                //add class: invoke a function when click on menu
            }
        });

        //adding click event to main menu link 
        $('.pt-trigger').on("click", function (e) {
            e.preventDefault();
            if (isAnimating) {
                return false; //CHECK WHAT THIS LINE MEANS
            }
            var pageTrigger = $(this);
            activeMenuItem(pageTrigger);
            animate(pageTrigger);
            location.hash = $(this).attr('href');
            //get url defined in the menu section and attach to
            //location.hash
        });

        window.onhashchange = function (event) {
            if (location.hash) {
                if (isAnimating) {
                    return false;
                }
                var menuLink = $(menu + ' a[href*="' + location.hash.split('/')[0] + '"]');
                activeMenuItem(menuLink);
                animate(menuLink);


            }
        };

        var menu = options.menu,
            pageStart = getActiveSection();

        location.hash = pageStart;
        var menuLink = $(menu + ' a[href*="' + location.hash.split('/')[0] + '"]');

        activeMenuItem(menuLink);

        animate(menuLink);


    }

    //check which page is currently opening
    function getActiveSection() {
        if (location.hash === "") {
            return location.hash = defaultStartPage;
            //when user open the link, location.hash===""
            //therefore, defaulstartpage would be loaded into
        } else {
            return location.hash;
            //otherwise, return id of current page
        }
    }

    //change menu item property 
    function activeMenuItem(item) {
        if (!item) {
            return false;
        }
        var navLink = $(item);
        navLink = navLink['0'];
        navLink = $(navLink.parentNode);
        //get <li> in terms of <a> - item 
        if (navLink) {
            $('ul.site-main-menu li').removeClass('active');
            //remove all class="active" in tag <li> 
            //then add "active" to whic h <li> tag whose 
            //childnode(<a>) is clicked on
            navLink.addClass('active');
        }

    }

    function animate($pageTrigger, gotoPage) {

        //check data-animation attribute
        if (!($pageTrigger.attr('data-animation'))) {
            //if cannot find attribute data-animation in the 
            // <a> tag
            //this piece of code will generate one number for them
            var animNumber = parseInt(Math.floor(Math.random() * 5));
            $pageTrigger.data('animation', animNumber);
            //get the random number add it to animation as its data
        }

        var animation = $pageTrigger.data('animation').toString();
        var gotoPage, inClass, outClass, selectedAnimNumber;


        //check if delimeter "-" is present then create an animation
        //array list

        if (animation.indexOf('-') != -1) {
            var randomAnimList = animation.split('-');
            selectedAnimNumber = parseInt(randomAnimList[(Math.floor(Math.random() * randomAnimList.length))]);
        } else {
            selectedAnimNumber = parseInt(animation);
        }

        switch (selectedAnimNumber) {
            case 1:
                inClass = 'pt-page-scaleUpDown pt-page-delay300';
                outClass = 'pt-page-scaleDown';
                break;
            case 2:
                inClass = 'pt-page-moveFromRight pt-page-ontop';
                outClass = 'pt-page-scaleDown';
                break;
            case 3:
                inClass = 'pt-page-moveFromLeft pt-page-ontop';
                outClass = 'pt-page-scaleDown';
                break;
            case 4:
                inClass = 'pt-page-moveFromBottom pt-page-ontop';
                outClass = 'pt-page-scaleDown';
                break;
            case 5:
                inClass = 'pt-page-moveFromTop pt-page-ontop';
                outClass = 'pt-page-scaleDown';
                break;
        }

        var $pageWrapper = sectionsContainer,
            currentPageId = $pageWrapper.data('current'),
            tmpPageIndex,
            linkhref = $pageTrigger.attr('href').split('#'),
            gotoPage = linkhref[1];


        tmpPageIndex = currentPageId;

        //current page to be removed
        var $currentPage = $('section[data-id="' + currentPageId + '"]');

        //next page
        currentPageId = gotoPage;

        //check if the current page is the same as the next page (user click on menu a link that is currently opened)
        //if yes, do not do anything
        //else reset the 'isAnimating' flag

        if (tmpPageIndex != currentPageId) {
            isAnimating = true;
            $pageWrapper.data('current', currentPageId);

            //next page to be animated

            var $nextPage = $('section[data-id=' + currentPageId + ']').addClass('pt-page-current');

            $currentPage.addClass(outClass).on(animEndEventName, function () {
                $currentPage.off(animEndEventName);
                endCurrentPage = true;
                if (endNextPage) {
                    onEndAnimation($pageWrapper, $nextPage, $currentPage);
                    endCurrentPage = false;
                }
            });

            $nextPage.addClass(inClass).on(animEndEventName, function () {
                $nextPage.off(animEndEventName);
                endNextPage = true;
                if (endCurrentPage) {
                    onEndAnimation($pageWrapper, $nextPage, $currentPage);
                    endNextPage = false;
                    isAnimating = false;
                }
            });
        } else {
            isAnimating = true;
        }

    }


    function onEndAnimation($pageWrapper, $nextPage, $currentPage) {
        resetPage($nextPage, $currentPage);
    }


    //this function reset the current page and active the next page 
    //that was clicked
    function resetPage($nextPage, $currentPage) {
        $currentPage.attr('class', $currentPage.data('originalClassList'));
        $nextPage.attr('class', $nextPage.data('originalClassList') + ' pt-page-current');
    }

    return {
        init: init,
    };

})(jQuery);
