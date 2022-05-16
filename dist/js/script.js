$(function() {
    'use strict';
    
    /* START :: Add Select2 to all SelectBoxs */
    var bsNodals = document.getElementsByClassName('modal');
    for (var i = 0 ; i < bsNodals.length; i++) {
      bsNodals[i].addEventListener('show.bs.modal', function (event) {
        triggerSelect2();
      });
    }

    function triggerSelect2() {
      if ($('select').length) {
        $('select').select2({
            language: {
                noResults: function (params) {
                  return ($('html').attr('dir') === "ltr") ? "No results found!" : "لا يوجد نتائج!";
                }
              }
        });
      }
    }
    triggerSelect2();
    /* END :: Add Select2 to all SelectBoxs */


    /* Filter Slide Down */
    var FilterElement = document.getElementById('filter-content'),
        FilterButton = document.getElementById('filter-button');

    if (FilterElement != null) {
      FilterButton.onclick = function () {
        if (FilterElement.classList.contains('filter-visible')) {
          FilterElement.classList.remove('filter-visible');
          FilterElement.classList.add('filter-hidden');
        } else {
          FilterElement.classList.add('filter-visible');
        }
      }
    }
    /* Filter Slide Down */


    /* START :: Show the User feedback modal */
    if ($('#user-feedback-modal').length) {
      var myModal = new bootstrap.Modal(document.getElementById('user-feedback-modal'), {});
      myModal.show();
    }
    /* END :: Show the User feedback modal */


    /* START :: Create PDf from HTML - User Invoice */
    function CreatePDFfromHTML() {
      var HTML_Width = $(".user-invoice").width();
      var HTML_Height = $(".user-invoice").height();
      var top_left_margin = 15;
      var PDF_Width = HTML_Width + (top_left_margin * 2);
      var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
      var canvas_image_width = HTML_Width;
      var canvas_image_height = HTML_Height;

      var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

      html2canvas($(".user-invoice")[0]).then(function (canvas) {
          var imgData = canvas.toDataURL("image/jpeg", 1.0);
          var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
          pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
          for (var i = 1; i <= totalPDFPages; i++) { 
              pdf.addPage(PDF_Width, PDF_Height);
              pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
          }
          pdf.save("invoice.pdf");
      });
    }

    if ($('#download-invoice').length) {
      document.getElementById('download-invoice').onclick = function() {
        CreatePDFfromHTML()
      }
    }
    /* END :: Create PDf from HTML - User Invoice */
    


    /* START :: Open the user account on the mobile */
    if ($('.user-menu__info').length && $(window).width() < 769) {
      $('.user-menu__info').on('click', function() {
        $(this).toggleClass('expanded')
        $('.user-menu__links').slideToggle();
      });
    }
    /* END :: Open the user account on the mobile */


    
    /* START :: RateYou */
    if ($('#rateYo').length) {
      $("#rateYo, #rateProduct, #rateProduct-2, #feedBack").rateYo({
        rating: 4.4,
        starWidth: ($(window).width() < 769) ? "12px": "20px",
        normalFill: "#AFAFAF",
        ratedFill: "#F8E61E",
        rtl: ($('html').attr('dir') === "ltr") ? false : true,
      });
    }
    /* END :: RateYou */

    /* START :: Categories Slider */
    if ($('.categories-slider .row').length || $('.cards-content').length || $('.trending-and-arrived__cards').length) {
      $('.categories-slider .row, .cards-content, .trending-and-arrived__cards').slick({
        dots: false,
        arrows: true,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        rtl: ($('html').attr('dir') == "ltr") ? false : true,
        responsive: [
          {
            breakpoint: 1400,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: false
            }
          },
          {
            breakpoint: 769,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]
      });
    }

    // Refresh the Slick slider once the bootstrap tabs is changed
    $('.trending-and-arrived button[data-bs-toggle="tab"]').on('shown.bs.tab', function (event) {
      $('.trending-and-arrived__cards').slick('refresh');
    });
    
    /* END :: Categories Slider */

    /* START :: Ion Range Slider */
    if ($("#price-id").length) {
      $("#price-id").ionRangeSlider({
          type: "double",
          min: 0,
          max: 10000,
          from: 2000,
          to: 7000,
      });
    }
    /* END :: Ion Range Slider */

    
    /* START :: images slider */
    const imgs = document.querySelectorAll('.imgs-slide');
    const imageDisplay = document.getElementById('cardDisplay');

    function myFunction(item) {
      item.addEventListener("click", function () {
        var imageSrc = this.getAttribute('src');
        imageDisplay.setAttribute('src', imageSrc);
      })
    }

    imgs.forEach(myFunction);
    /* END :: images slider */


    /* START :: Increment and Decrement */
    const input = document.getElementById('inputCounter');
    var numInput = parseInt(input.value);
    const increaseBtn = document.getElementById('increase');
    const decreaseBtn = document.getElementById('decrease');

    increaseBtn.onclick = function () {
      if (input.hasAttribute('disapled')) {
        input.removeAttribute('disapled');
        input.setAttribute('value', 1);
      } else {
        input.setAttribute('value', ++numInput);
      }
    }

    decreaseBtn.onclick = function () {
      if (numInput == 1) {
        input.setAttribute('disapled', 'disapled');
        input.setAttribute('value', 0);
      } else {
        input.setAttribute('value', --numInput);
      }
    }
    /* END :: Increment and Decrement */

    
});