let url = 'https://script.google.com/macros/s/AKfycbzMyVjjQzwfMXfJLcSlWbUsoIk43tZlXzmuE210gOnYaew5pDg/exec',
    appData = [],
    itemCount,
    prodList = $('.productList'),
    modal = $('#productModal'),
    template = '';

// console.log($.get(url));


$.getJSON(url, function(json, status) {
    prodList.html('');

    showLoader();

    getStatus(status);

    appData = json.result;

    console.log(appData);

    for (let i = 0; i < appData.length; i++) {

        setTemplate(i);

        if (i > 5) {
            hideLoader();
            return false;
        } else {
            prodList.append(template);
        }

    }

});


$('.js_showMore').on('click', function() {

    itemCount = $('.productList__item').length;
    showLoader();

    $.getJSON(url, function(json, status) {

        getStatus(status);

        appData = json.result;

        console.log(appData);

        for (let i = itemCount; i < appData.length; i++) {

            setTemplate(i);

            if (i > itemCount + 5) {
                hideLoader();
                return false;
            } else {
                prodList.append(template);
            }

        }

        hideLoader();
        $('.js_showMore').hide();
    });

});


$('body').on('click', '.productList__action .btn', function() {
    console.log($(this).closest('.productList__item').index());
    // console.log(appData);

    let index = $(this).closest('.productList__item').index(),
        body = $('.modal-body'),
        modalContent = `<div class="productModal__img">
                            <img src="`+appData[index][4]+`" alt="alt">
                        </div>
                        <div class="productModal__content">
                            <div class="productModal__name">`+appData[index][1]+`</div>
                                <div class="productModal__price">$`+appData[index][2]+`</div>
                                <div class="productModal__description">`+appData[index][3]+`</div>
                                <div class="productModal__action">
                                  <button class="btn" type="button">Buy `+appData[index][1]+`</button>
                            </div>
                        </div>`;


    console.log(modalContent);
    body.html(modalContent);
    modal.modal('show');

    // $(this).index()
});


function setTemplate(i) {
    template = `<div class="productList__item">
          <div class="productList__content">
            <div class="productList__img"><img src="`+appData[i][4]+`" alt=""></div>
            <div class="productList__description">
              <div class="productList__name">`+appData[i][1]+`</div>
              <div class="productList__price">$`+appData[i][2]+`</div>
              <div class="productList__action">
                <button class="btn" type="button">Show info</button>
              </div>
            </div>
          </div>
        </div>`;
};

function getStatus(status) {
    if (status !== 'success') {
        prodList.html('Произошла ошибка при получении данных. Обновите страницу.');
        return false;
    }
}


function showLoader() {
    prodList
        .addClass('loaded')
        .append('<div class="loader"></div>');
};

function hideLoader() {
    setTimeout(function () {
        prodList.removeClass('loaded');
        $('.loader').remove();
    }, 1000);
};
