(function ($) {
    "use strict";

    // Contact form validator
    $(function () {

        $('#contact-form').validator();

        $('#contact-form').on('submit', function (e) {
            if (!e.isDefaultPrevented()) {
                var url = "contact_form/contact_form.php";

                $.ajax({
                    type: "POST",
                    url: url,
                    data: $(this).serialize(),
                    success: function (data) {
                        var messageAlert = 'alert-' + data.type;
                        var messageText = data.message;

                        var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                        if (messageAlert && messageText) {
                            $('#contact-form').find('.messages').html(alertBox);
                            $('#contact-form')[0].reset();
                        }
                    }
                });
                return false;
            }
        });
    });
    // /Contact form validator

    //Hide menu on mobile
    function mobileMenuHide() {
        var windowWidth = $(window).width();
        if (windowWidth < 1024) {
            $('#site-header').addClass('mobile-menu-hide');
        }
    }

    //Hide menu on mobile


    //On Window load & Resize
    $(window)
        .on('load', function () { //Load
            // Animation on Page Loading
            //            $(".preloader").fadeOut("slow");

            // initializing page transition.
            var ptPage = $('.subpages');
            if (ptPage[0]) {
                PageTransitions.init({
                    menu: 'ul.site-main-menu',
                });
            }

            // Custom Subpage Scroll
            $(".pt-page").mCustomScrollbar({
                scrollInertia: 80
            });

            // Custom Header Scroll
            $("#site-header").mCustomScrollbar({
                scrollInertia: 80
            });

        })
        .on('resize', function () { //Resize
            mobileMenuHide();

        });


    // On Document Load
    $(document).on('ready', function () {
        $('.tilt-effect').tilt({

        });

        // Mobile menu
        $('.menu-toggle').on("click", function () {
            $('#site-header').toggleClass('mobile-menu-hide');
        });

        // Mobile menu hide on main menu item click
        $('.site-main-menu').on("click", "a", function (e) {
            mobileMenuHide();
        });
    });

    // On Document ready
    $(document).ready(function () {

        $('.skill-percentage').on('inview', function (event, isInView) {
            if (isInView) {
                $(this).each(function () {
                    $(this).css('width', function () {
                        return ($(this).attr('skill-value') + '%');
                    });
                    $(this).css("transition", "all 2s ease-in-out");
                });
            } else {
                $(this).each(function () {
                    $(this).css("width", "0%");
                });
            }
        });



        $('.dial').on('inview', function (event, isInView) {
            if (isInView) {
                var $this = $(this);
                var myVal = $this.attr("value");
                var color = $this.attr("data-color");
                $this.knob({
                    readOnly: true,
                    width: 200,
                    height: 200,
                    rotation: 'anticlockwise',
                    thickness: .05,
                    inputColor: '#fff',
                    fgColor: color,
                    bgColor: '#e8e8e8',
                    'draw': function () {
                        $(this.i).val(this.cv + '%')
                    }
                });
                $({
                    value: 0
                }).animate({
                    value: myVal
                }, {
                    duration: 1000,
                    easing: 'swing',
                    step: function () {
                        $this.val(Math.ceil(this.value)).trigger('change');
                    }
                });
            }
        });
    });

})(jQuery);
